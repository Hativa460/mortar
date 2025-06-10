<template>
    <div id="multiple-choice-grade">
      <div class="question-container">
        <div class="question-text">{{ title }}</div>
        <div class="answers">
          <div
            v-for="(answer, index) in answers"
            :key="index"
            :id="index"
            class="answer"
            @click="selectAns(index)"
            :class="{ selected: selectedAns === index }"
            :style="{ background: bgColor(index) }"
          >
            {{ answer }}
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import json from "../../text.json";
  
  export default {
    name: "multiple-choice-grade",
    props: ["questionNum"],
    data() {
      return {
        selectedAns: -1,
        correctAnswer: json.multipleChoice[this.questionNum].correctAns,
        points: 0,
      };
    },
    computed: {
      title() {
        return json.multipleChoice[this.questionNum].title;
      },
      answers() {
        return json.multipleChoice[this.questionNum].answers;
      },
    },
    methods: {
      selectAns(index) {
        this.selectedAns = index;
        this.updatePoints(index);
      },
      updatePoints(selectedAnswer) {
        if (selectedAnswer === this.correctAnswer) {
          this.points = 18;
        } else {
          this.points = 0;
        }
        this.$emit('points-updated', this.points);
        console.log(this.points + "שאלה אמריקאית1");
      },
      bgColor(index) {
        if (this.selectedAns === index) {
          return this.selectedAns === this.correctAnswer ? 'rgb(255, 215, 170)' : 'rgb(255, 215, 170)';
        }
        return 'rgb(255, 97, 0)';
      },
    },
  };
  </script>
  
  <style scoped>
  #multiple-choice-grade {
    margin: 0;
    height: fit-content;
    margin-bottom: 10%;
    width: 100vw;
    position: relative;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
  }
  
  .question-container {
    display: flex;
    height: fit-content;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    overflow: hidden;
    margin: auto;
  }
  
  .question-text {
    padding: 2vh;
    padding-bottom: 20vh;
    border-radius: 1vh;
    background: #cee2ff;
    color: #001d3d;
    width: 90vw;
    margin-top: 7%;
    font-size: 8vw;
    font-family: "rubik", sans-serif; /* הוספנו fallback */
  }
  
  .question {
    margin-bottom: 15%;
  }
  
  .answers {
    display: flex;
    width: 84vw;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    overflow-x: hidden;
    margin: auto;
    margin-top: -38%;
    background: #001d3d;
    border-radius:0.8vh;
    padding: 1%;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
  
  .answer {
    color: #001d3d;
    font-size: 5vw;
    font-weight: 600;
    padding: 2%;
    border-radius: 0.5vh;
    margin: 1.5%;
    cursor: pointer;
    transition: box-shadow 0.3s ease;
    font-family: "rubik", sans-serif; /* הוספנו fallback */
  }
  
  .answer:hover {
    box-shadow: #f2f3f59f 0px 0px 1.5vh;
  }
  
  .selected {
    /* סגנון ברירת מחדל - הרקע ישתנה בהתאם לתשובה */
  }
  </style>