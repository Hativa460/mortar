<template>
    <div id="sortable">
      <div class="list">
        <div id="instruction">{{ title }}</div>
        <draggable class="list-group" :list="sortableData[questionNum].items" group="people" @change="onDragChange">
          <div class="list-item" v-for="(element, index) in sortableData[questionNum].items" :key="index" :style="{background: bgColor}">
            {{ element }}
          </div>
        </draggable>
      </div>
    </div>
  </template>
  
  <script>
  import draggable from 'vuedraggable';
  import json from "../../text.json";
  
  export default {
    name: "sort-table-list-tow",
    props: ["questionNum"],
    components: {
      draggable
    },
    data() {
        console.log("SortTableListTow data initialized");
        console.log("questionNum prop:", this.questionNum);
        console.log("sortableData from JSON:", json.sortable);
      return {
        sortableData: json.sortable,
        correctList: json.sortable[this.questionNum].correctList,
        bgColor: "#ff6100",
        currentScore: 0,
      };
    },
    watch: {
      // שימוש בפונקציה כדי לעקוב אחר הנתיב הדינמי
      itemsToWatch: {
        handler: function() {
          this.updateScore();
        },
        deep: true
      }
    },
    methods: {
      updateScore() {
        this.currentScore = this.sortableData[this.questionNum].items.reduce((score, item, index) => {
          return item === this.correctList[index] ? score + 5 : score;
        }, 0);
        this.$emit('points-updated', this.currentScore);
        console.log("סידור שלבים2" + this.currentScore);
      },
      onDragChange() {
        this.updateScore();
      }
    },
    computed: {
        title() {
        return json.sortable[this.questionNum].title;
      }
  },
  };
  </script>
  
  <style scoped>
  #sortable {
    margin: 0;
    height: fit-content;
    margin-bottom: 10%;
    width: 100vw;
    position: relative;
    top: 0;
    right: 0;
    display: flex;
    justify-content: center;
  }
  
  .list {
    list-style-type: none;
    padding: 1%;
    margin: auto;
    margin-top: 2%;
    margin-bottom: 0px;
    background-color: #cee2ff;
    border-radius: 1vh;
    width: 95vw;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .list-group {
    width: 100%;
  }
  
  .list-item {
    color: #0c275c;
    padding: 3%;
    margin: auto;
    margin-top: 2%;
    margin-bottom: 2%;
    border-radius: 1vh;
    cursor: grab;
    width: 90%;
    font-size: 5vw;
    font-weight: 560;
    border: #0c275c dashed 0.5vh;
    background-color: #ff6100;
    box-sizing: border-box;
  }
  
  .list-item:active {
    cursor: grabbing;
  }
  
  #instruction {
    color: #0c275c;
    font-size: 6vw;
    margin: 2%;
    text-align: center;
  }
  </style>