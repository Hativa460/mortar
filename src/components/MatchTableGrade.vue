<template>
    <div id="match">
      <div id="table">
        <div id="instruction">{{ title }}</div>
        <table class="inner-table" :style="{background: bgColor}">
          <tr v-for="(square, index) in column"  :key="index" :class="index === column.length-1 ? '' : 'row'">
            <td class="drop-square">
              <draggable
                class="list-group"
                :list="dropOptions[index]"
                :group="{name:'people', put:true, pull: true}"
                @end="updateDropOptionsEnd(index)"
                @add="onDrop(index)"
              >
                <div v-for="option in dropOptions[index]" class="drag-option" v-if="option!== '[]'"> {{ option }} </div>
              </draggable>
            </td>
            <td class="text-square">
              <OpenTableGrade :subNum="index " />
            </td>
          </tr>
        </table>
        <div class="drag-options" id="drag-options">
          <draggable :list="dragOptions" :group="{ name: 'people', pull: true, put: true}" >
            <div v-for="(option, index) in dragOptions" class="drag-option" :key="index">{{ option }}</div>
          </draggable>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import json from "../../text.json";
  import draggable from 'vuedraggable';
  import OpenTableGrade from './OpenTableGrade.vue'; // ייבוא הקומפוננטה OpenTable
  
  export default {
    name: "match-table-grade",
    props: ["questionNum"],
    components: {
      draggable,
      OpenTableGrade // רישום הקומפוננטה
    },
    data() {
      return {
        enabled: true,
        dragOptions: json.matching[this.questionNum].dragOptions,
        dropOptions: json.matching[this.questionNum].dropOptions,
        btnText: "בדוק אותי",
        bgColor: "#ff6100",
        points: 0,
        correctAnswers: json.matching[this.questionNum].correctAnswers
      }
    },
    methods: {
      updateDropOptionsEnd(index) {
        this.$set(this.dropOptions, index, this.dropOptions[index]);
      },
      onDrop(index) {
        this.calculatePoints();
        this.$emit('points-updated', this.points);
        console.log(this.points + "בשאלה ראשונה");
      },
      calculatePoints() {
        this.points = 0;
        for (let i = 0; i < this.correctAnswers.length; i++) {
          if (JSON.stringify(this.dropOptions[i]) === JSON.stringify(this.correctAnswers[i])) {
            this.points += 4;
          }
        }
      }
    },
    computed: {
      title() {
        return json.matching[this.questionNum].title;
      },
      column() {
        return json.matching[this.questionNum].column;
      },
    }
  }
  
  </script>
  
  <style scoped>
  #match {
    margin: 0;
    height: fit-content;
    width: 100vw;
    position: relative;
    top: 0;
    right: 0;
  }
  #table {
    list-style-type: none;
    padding: 1%;
    margin: auto;
    margin-top: 2%;
    margin-bottom: 0px;
    background-color: #cee2ff;
    border-radius: 1vh;
    width: 95vw;
  }
  #instruction {
    color: #0c275c;
    font-size: 6vw;
    margin: 2%;
}
  .inner-table {
    border-radius: 2vh;
    margin: auto;
    width: 95%;
    margin-bottom: 2%;
    border-collapse: collapse;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
  .row {
    border-bottom:#001d3d solid 0.5vh;
  }
  .drop-square {
    width: 40%;
    border-left: #001d3d solid 0.5vh;
  }
  .list-group {
    display: flex;
    flex-wrap: wrap;
  }
  .text-square {
    height: fit-content;
    white-space: break-spaces;
    color: #001d3d;
    font-size: 5vw;
    padding: 1%; /* הקטן את הריווח כדי להתאים לטבלה המוטבעת */
  }
  .drag-option:active {
    z-index: 1000;
  }
  .drag-options {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 5%;
    justify-content: space-evenly;
    border: #001d3d 0.4vh dashed;
    border-radius: 5%;
    padding-top: 1%;
    margin-bottom: 2vh;
    min-height: 6vh;
  }
  
  .drag-option {
    border-radius:1vh;
    background-color: #001d3d;
    color: #cee2ff;
    padding: 3%;
    font-size: 2.1vh;
    font-weight: bolder;
    margin: 1%;
  }
  </style>