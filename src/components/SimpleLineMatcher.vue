<template>
    <div class="line-matcher-container">
      <div class="lm-title">{{ title }}</div>
  
      <div class="lm-content-area" ref="contentArea">
        <div class="lm-lists-wrapper" v-if="isDataLoaded" @click.stop="selectItem">
          <div class="lm-column">
            <div class="lm-item1" v-for="(item, index) in list1" :key="'list1-' + index">
              <div class="lm-text">{{ item }}</div>
              <span class="lm-dot" :id="'ans' + (index + 1) + 'a'"></span>
            </div>
          </div>
  
          <div class="lm-column">
            <div class="lm-item2" v-for="(item, index) in list2" :key="'list2-' + index">
                <span class="lm-dot" :id="'ans' + (index + 4) + 'b'"></span>
              <div class="lm-text">{{ item }}</div>
               </div>
          </div>
        </div>
  
        <canvas class="lm-canvas" ref="canvas"></canvas>
      </div>
  
      </div>
  </template>
  
  <script>
  import json from "../../text.json";
  
  export default {
    name: 'SimpleLineMatcher',
    props: ['questionNum'],
    data() {
      return {
        startItem: undefined,
        selectedItems: [],
        points: 0,
        isDataLoaded: false,
        canvas: null,
        ctx: null,
      };
    },
    computed: {
      title() {
        const data = json.drawLines && json.drawLines[this.questionNum];
        return data ? data.title : 'Loading...';
      },
      list1() {
        const data = json.drawLines && json.drawLines[this.questionNum];
        return data ? data.list1 : [];
      },
      list2() {
        const data = json.drawLines && json.drawLines[this.questionNum];
        return data ? data.list2 : [];
      },
      correctLines() {
        const data = json.drawLines && json.drawLines[this.questionNum];
        return data ? data.correctLines : [];
      },
    },
    mounted() {
      const data = json.drawLines;
      const questionData = data && data[this.questionNum];
  
      if (data && Array.isArray(data) && questionData && Array.isArray(questionData.list1) && Array.isArray(questionData.list2)) {
        console.log('SimpleLineMatcher data loaded successfully for questionNum:', this.questionNum);
        console.log('Correct lines from JSON (on mount):', this.correctLines);
        this.isDataLoaded = true;
  
        this.$nextTick(() => {
          const contentArea = this.$refs.contentArea;
          this.canvas = this.$refs.canvas;
  
          if (contentArea && this.canvas) {
             this.canvas.width = contentArea.offsetWidth;
             this.canvas.height = contentArea.offsetHeight;
             this.ctx = this.canvas.getContext('2d');
  
             this.drawAllLines();
             window.addEventListener('resize', this.resizeCanvas);
             console.log("Canvas and Context initialized");
  
          } else {
              console.error("SimpleLineMatcher: Content area or Canvas element not found after data loaded!");
          }
        });
  
      } else {
        console.error("SimpleLineMatcher: Data is missing, malformed, or questionNum is out of bounds for:", this.questionNum, "Full json.drawLines:", json.drawLines);
      }
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.resizeCanvas);
    },
   methods: {
      selectItem(event) {
        if (!this.isDataLoaded) return;
        const target = event.target.closest('.lm-dot');
        if (!target) {
           if (this.startItem !== undefined) {
                const startEl = document.getElementById(this.startItem);
                 if(startEl) startEl.classList.remove('selected');
                this.startItem = undefined;
                this.drawAllLines();
           }
           return;
        }
        event.preventDefault();
        if (this.startItem === undefined) {
          this.startItem = target.id;
          target.classList.add('selected');
        } else {
          const startSide = this.startItem.slice(-1);
          const endSide = target.id.slice(-1);
          if (endSide === startSide) {
            const prevStartEl = document.getElementById(this.startItem);
            if (prevStartEl) prevStartEl.classList.remove('selected');
            if (target.id === this.startItem) {
              this.startItem = undefined;
            } else {
              this.startItem = target.id;
              target.classList.add('selected');
            }
          } else {
            const selectedTuple = [this.startItem, target.id];
            this.deleteLine(this.startItem);
            this.deleteLine(target.id);
             const existingIndex = this.selectedItems.findIndex(item => (item[0] === selectedTuple[0] && item[1] === selectedTuple[1]) || (item[0] === selectedTuple[1] && item[1] === selectedTuple[0]));
             if (existingIndex === -1) {
               this.selectedItems.push(selectedTuple);
               console.log('User added line:', selectedTuple, 'Current selectedItems:', this.selectedItems);
             } else {
                console.log('Attempted to add duplicate line:', selectedTuple);
             }
            const startEl = document.getElementById(selectedTuple[0]);
            const endEl = document.getElementById(selectedTuple[1]);
            if(startEl) startEl.classList.remove('selected');
            if(endEl) endEl.classList.remove('selected');
            this.startItem = undefined;
            this.calculatePoints();
            this.$emit('points-updated', this.points);
          }
          this.drawAllLines();
        }
      },
      resizeCanvas() {
        const contentArea = this.$refs.contentArea;
         if (contentArea && this.canvas) {
          this.canvas.width = contentArea.offsetWidth;
          this.canvas.height = contentArea.offsetHeight;
          this.drawAllLines();
        }
      },
      drawLine(x1, y1, x2, y2, color = '#001d3d') {
         if (!this.ctx || !this.canvas) { console.warn("drawLine: Canvas or Context not available"); return; }
          if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) { console.error("drawLine: Invalid coordinates", {x1, y1, x2, y2}); return; }
        const rect = this.canvas.getBoundingClientRect();
        this.ctx.beginPath();
        this.ctx.moveTo(x1 - rect.left, y1 - rect.top);
        this.ctx.lineTo(x2 - rect.left, y2 - rect.top);
        this.ctx.lineWidth = 3;
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
      },
      drawAllLines() {
         if (!this.ctx || !this.canvas) { console.warn("drawAllLines: Canvas or Context not available"); return; }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        document.querySelectorAll('.lm-dot').forEach(el => { if(this.startItem !== el.id) { el.classList.remove('selected'); } });
        for (let i = 0; i < this.selectedItems.length; i++) {
          const item1 = document.getElementById(this.selectedItems[i][0]);
          const item2 = document.getElementById(this.selectedItems[i][1]);
          if (!item1 || !item2) { console.warn("drawAllLines: Could not find element for drawing line:", this.selectedItems[i][0], this.selectedItems[i][1]); continue; }
          const rect1 = item1.getBoundingClientRect();
          const rect2 = item2.getBoundingClientRect();
          const x1 = rect1.left + rect1.width / 2;
          const y1 = rect1.top + rect1.height / 2;
          const x2 = rect2.left + rect2.width / 2;
          const y2 = rect2.top + rect2.height / 2;
          this.drawLine(x1, y1, x2, y2, '#001d3d');
          if(this.startItem !== item1.id) item1.classList.add('selected');
          if(this.startItem !== item2.id) item2.classList.add('selected');
        }
        if(this.startItem) { const startElement = document.getElementById(this.startItem); if(startElement) startElement.classList.add('selected'); }
      },
      deleteLine(itemToDeleteFrom) {
      let tempList = this.selectedItems.filter(line =>
     line[0] !== itemToDeleteFrom && line[1] !== itemToDeleteFrom
    );
    const pointsAffected = new Set();
    this.selectedItems.forEach(line => {
     if (line[0] === itemToDeleteFrom) pointsAffected.add(line[1]);
     else if (line[1] === itemToDeleteFrom) pointsAffected.add(line[0]);
    });
    pointsAffected.add(itemToDeleteFrom);
    this.selectedItems = tempList;
    pointsAffected.forEach(itemId => {
     const element = document.getElementById(itemId);
     if (element) {
    const isStillConnected = this.selectedItems.some(line => line.includes(itemId));
    if (this.startItem !== itemId && !isStillConnected) {
     element.classList.remove('selected');
    }
    }
    });
    this.calculatePoints();
    this.$emit('points-updated', this.points);
     },
  calculatePoints() {
    this.points = 0;
    const maxPointsPerLine = 5;
    const correctPairsFound = new Set();
    
    if (!Array.isArray(this.correctLines)) { console.error("correctLines is not an array!"); return; }
  
      console.log('--- Calculating Points ---');
      console.log('Correct Lines (from JSON):', JSON.stringify(this.correctLines)); // הצג את התוכן המלא של המערך
      console.log('User Selected Lines:', JSON.stringify(this.selectedItems)); // הצג את תוכן המערך של המשתמש
      console.log('-------------------------');
  
  
     for (let j = 0; j < this.selectedItems.length; j++) {
    const userLine = this.selectedItems[j];
    if (!Array.isArray(userLine) || userLine.length !== 2) { console.warn("Invalid user line format:", userLine); continue; }
    for (let i = 0; i < this.correctLines.length; i++) {
    const correctLine = this.correctLines[i];
     if (!Array.isArray(correctLine) || correctLine.length !== 2) { console.warn("Invalid correct line format:", correctLine); continue; }
    const correctLineKey = [...correctLine].sort().join('-');
        
    if (this.compareLines(userLine, correctLine) && !correctPairsFound.has(correctLineKey)) {
    this.points += maxPointsPerLine;
    correctPairsFound.add(correctLineKey);
    console.log('>>> MATCH FOUND! Correct line:', correctLine, 'User line:', userLine, 'Current points:', this.points);
  
    break;
    }
    }
    }
     console.log('Final calculated points:', this.points);
    },
    compareLines(userAns, correctAns) {
     if (!Array.isArray(userAns) || userAns.length !== 2 || !Array.isArray(correctAns) || correctAns.length !== 2) {
    console.warn("compareLines: Invalid input arrays", userAns, correctAns);
    return false;
     }
    const sortedUserAns = [...userAns].sort();
    const sortedCorrectAns = [...correctAns].sort();
  
      // *** Log: הצג את הזוגות הממוינים ואת תוצאת ההשוואה ***
      console.log(`Comparing sorted user pair [${sortedUserAns}] with correct pair [${sortedCorrectAns}]: ${sortedUserAns[0] === sortedCorrectAns[0] && sortedUserAns[1] === sortedCorrectAns[1]}`);
  
  
    return sortedUserAns[0] === sortedCorrectAns[0] && sortedUserAns[1] === sortedCorrectAns[1];
    }
    },
    };
    </script>
  
  <style scoped>
  /* @font-face { ... } */
  
  .line-matcher-container {
    margin: 20px auto;
    padding: 15px;
    background-color: #cee2ff; /* צבע רקע תכלת */
    border-radius: 8px;
    max-width: 95vw;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 250px;
    pointer-events: auto;
    box-sizing: border-box;
  }
  
  .lm-title {
    font-size: 1.5em;
    color: #001d3d;
    margin-bottom: 15px;
    text-align: center;
    font-family: rubik, sans-serif; /* הוספנו sans-serif כ fallback */
  }
  
  .lm-content-area {
      position: relative;
      width: 100%;
      overflow: hidden;
      display: flex;
      justify-content: space-between; /* פיזור הטורים ברוחב */
      gap: 20px; /* רווח בין העמודות */
      align-items: flex-start; /* יישור הטורים למעלה */
      pointer-events: auto;
      padding: 0 10px; /* ריפוד פנימי לאזור התוכן */
  }
  
  .lm-lists-wrapper {
      display: flex;
      width: 100%;
      justify-content: center; /* לוודא שהעמודות ממורכזות במידה ורוחב הטורים קבוע */
      position: relative;
      z-index: 1;
      pointer-events: auto;
  }
  
  
  .lm-column {
    display: flex;
    flex-direction: column;
    align-items: stretch; /* לוודא ש items תופסים את כל רוחב העמודה */
    width: 45%; /* רוחב קבוע יחסי לטור */
    flex-grow: 1; /* לאפשר לטור לגדול אם יש מקום */
  }
  
  .lm-item1 {
    display: flex;
    align-items: center; /* ליישר נקודה וטקסט במרכז אנכי */
    gap: 10px; /* רווח בין הנקודה לטקסט */
    background-color: rgb(255, 97, 0); /* רקע כתום */
    border-radius: 5px;
    padding: 15px;
    box-shadow: 0 0.5vh 1vh rgba(0, 0, 0, 0.08);
    pointer-events: auto;
    width: 80%; /* לוודא שתופס את רוחב העמודה */
    box-sizing: border-box;
    flex-shrink: 0;
    margin-bottom: 80px; /* רווח אנכי בין פריטים */
    position: relative;
    top:12%;
  }

  .lm-item2 {
    display: flex;
    align-items: center; /* ליישר נקודה וטקסט במרכז אנכי */
    gap: 10px; /* רווח בין הנקודה לטקסט */
    background-color: rgb(255, 97, 0); /* רקע כתום */
    border-radius: 5px;
    padding: 8px;
    box-shadow: 0 0.5vh 1vh rgba(0, 0, 0, 0.08);
    pointer-events: auto;
    width: 90%; /* לוודא שתופס את רוחב העמודה */
    box-sizing: border-box;
    flex-shrink: 0;
    margin-bottom: 15px; /* רווח אנכי בין פריטים */
  }
  
  .lm-column:last-child .lm-item {
      margin-bottom: 25px; /* הגדלנו את המרווח התחתון בטור הימני */
  }
  
  
  .lm-text {
    font-size: 1.5em;
    color: #333;
    text-align: center;
    font-family: rubik, sans-serif;
    flex-grow: 1;
    overflow-wrap: break-word;
    flex-shrink: 1;
  }
  
  .lm-dot {
    direction: rtl; /* אמור לעזור ליישור טקסט בתוך ה item אם הכיוון חשוב */
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 3px solid #001d3d; /* גבול שחור */
    background-color: #fff;
    cursor: pointer;
    flex-shrink: 0;
    pointer-events: auto;
    margin: 0 5px; /* רווח קטן מצד אחד */
  }
  
  .lm-dot.selected {
    background-color: #001d3d;
  }
  
  
  .lm-canvas {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 2;
  }
  </style>