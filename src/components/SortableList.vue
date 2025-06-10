<template>
    <div id="sortable">
      <div class="list">
        <div id="instruction">{{ title }}</div>
        <draggable class="list-group" :list="sortableData[questionNum].items" group="people" @end="onDragEnd">
          <div class="list-item" v-for="(element, index) in sortableData[questionNum].items" :key="index" :style="{background: getItemBgColor(index)}">
            {{ element }}
          </div>
        </draggable>
        <div id="checkBtn" @click="checkAns">{{ btnText }}</div>
      </div>
    </div>
  </template>
  
  <script>
  import draggable from 'vuedraggable';
  import json from "../../text.json";
  
  export default {
    name: "sortable-list",
    props: ["questionNum"],
    components: {
      draggable
    },
    data() {
      return {
        sortableData: json.sortable,
        correctAns: undefined,
        btnText: "בדוק אותי",
        bgColor: "#ff6100",
        itemColors: []
      };
    },
    computed: {
      title() {
        return json.sortable[this.questionNum].title;
      }
    },
    methods: {
      checkAns() {
        const userList = this.sortableData[this.questionNum].items;
        const correctList = this.sortableData[this.questionNum].correctList;
  
        if (this.btnText !== "בדוק אותי") {
          // Reset the list to its original state
          this.$set(this.sortableData, this.questionNum, { 
            ...this.sortableData[this.questionNum],
            items: [...json.sortable[this.questionNum].items]  // reset the items array
          });
          this.correctAns = false;
          this.bgColor = "#ff6100";
          this.itemColors = [];
          this.btnText = 'בדוק אותי';
        } else {
          // Check each item in the list
          this.itemColors = userList.map((item, index) => {
            return item === correctList[index] ? "rgb(179, 241, 160)" : "rgb(247, 83, 83)";
          });
  
          if (JSON.stringify(userList) === JSON.stringify(correctList)) {
            this.correctAns = true;
            this.btnText = "אין עליך!";
          } else {
            this.correctAns = false;
            this.btnText = "תנסה שוב...";
          }
        }
      },
      getItemBgColor(index) {
        return this.itemColors[index] || this.bgColor;
      },
      onDragEnd() {
        // Reset the item colors to orange when the drag ends
        this.itemColors = Array(this.sortableData[this.questionNum].items.length).fill("#ff6100");
        this.btnText = "בדוק אותי";
      }
    }
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
  }
  
  .list-item {
    color: #0c275c;
    padding: 3%;
    margin: auto;
    margin-top: 4%;
    margin-bottom: 4%;
    border-radius: 1vh;
    cursor: grab;
    width: 90%;
    font-size: 5vw;
    font-weight: 560;
    border: #0c275c dashed 0.5vh;
    background-color: #ff6100;
  }
  
  .list-item:active {
    cursor: grabbing;
  }
  
  #instruction {
    color: #0c275c;
    font-size: 6vw;
    margin: 2%;
  }
  
  #checkBtn {
    margin: 2%;
    background-color: #ff6100;
    font-family: "yarden";
    color: #0c275c;
    font-size: 6vw;
    border-radius: 1.5vh;
    font-weight: 580;
    width: 40vw;
    text-align: center;
    padding: 2%;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  } 
  </style>
  