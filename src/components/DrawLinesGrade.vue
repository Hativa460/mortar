<template>
  <div id="draw-lines">
    <div id="bg-container" :style="{background: bgColor}">
      <div id="instruction">{{ title }}</div>
      <div id="covered-container" class="covered-container">
        <div class="target-div question-container">
          <div class="container" id="list-container" @click="selectItem" v-if="isDataLoaded">
            <div class="column" id="list1">
              <div class="item" v-for="(item, index) in list1" :key="index">
                <div class="list-item">{{ item }}</div>
                <span class="dot" :id="'ans' + (index + 1) + 'a'"></span>
              </div>
            </div>
            <div class="column" id="list2">
              <div class="item" v-for="(item, index) in list2" :key="index">
                <span id="second-dot" :id="'ans' + (index + 5) + 'b'"></span>
                <div class="list-item">{{ item }}</div>
              </div>
            </div>
          </div>
          <canvas id="canvas" class="overlay-canvas" ref="canvas"></canvas>
        </div>
        </div>
    </div>
  </div>
</template>

<script>
import json from "../../text.json";
export default {
  name: "draw-lines-grade",
  props: ["questionNum"],
  data() {
    return {
      startItem: undefined,
      selectedItems: [],
      bgColor: "#001d3d",
      points: 0,
      isDataLoaded: false, // משתנה חדש לעקוב אחר זמינות נתונים
      canvas: null, // מופע הקנבס
      ctx: null // מופע הקונטקסט
    };
  },
  computed: {
      title() {
        return json.drawLines[this.questionNum].title;
      },
      list1() {
        return json.drawLines[this.questionNum].list1;
      },
      list2() {
        return json.drawLines[this.questionNum].list2;
      },
      correctLines() {
        return json.drawLines[this.questionNum].correctLines;
      }
    },
    mounted() {
      // Ensure canvas element is accessed after the DOM is ready
      this.canvas = document.getElementById('canvas');
      this.ctx = this.canvas.getContext('2d'); // Now you can safely get the context
      this.resizeCanvas(); // Call resizeCanvas once the canvas is initialized
      this.drawAllLines(); // Draw any existing lines on load
    },
  //  beforeDestroy() {
  //   // הסרת האזנה לשינוי גודל לפני שהקומפוננטה נהרסת
  //   window.removeEventListener('resize', this.resizeCanvas);
  //  },
  methods: {
    selectItem(event) {
        event.preventDefault();
        if (event.target.tagName === 'SPAN') {
          if (this.startItem === undefined) {
            this.startItem = event.target.id;
            this.deleteLine(event.target.id);
            event.target.classList.add('selected');
            this.drawAllLines();
          } else {
            if (event.target.id.charAt(4) === this.startItem.charAt(4)) {
              if (event.target.id.charAt(3) === this.startItem.charAt(3)) {
                document.getElementById(this.startItem).classList.remove('selected');
                this.startItem = undefined;
                this.drawAllLines();
              } else {
                document.getElementById(this.startItem).classList.remove('selected');
                this.startItem = event.target.id;
                this.deleteLine(event.target.id);
                event.target.classList.add('selected');
                this.drawAllLines();
              }
            } else {
              let selectedTuple = [this.startItem, event.target.id];
              this.deleteLine(event.target.id);
              this.selectedItems.push(selectedTuple);
              document.getElementById(selectedTuple[1]).classList.add('selected');
              document.getElementById(selectedTuple[0]).classList.remove('selected'); // Unselect the start item
              this.startItem = undefined;
              this.drawAllLines();
              this.calculatePoints(); // חשב נקודות לאחר מתיחת קו
              console.log("מתיחת קו" + this.points)
              this.$emit('points-updated', this.points);// שלח נקודות
            }
          }
        } else {
          if (this.startItem !== undefined) {
            document.getElementById(this.startItem).classList.remove('selected');
            this.startItem = undefined;
            this.drawAllLines();
          }
        }
      },
      resizeCanvas() {
        const container = document.getElementById('covered-container');
        this.canvas.width = container.offsetWidth;
        this.canvas.height = container.offsetHeight;
        this.drawAllLines(); // Redraw lines after resize
      },
      drawLine(x1, y1, x2, y2) {
        const rect = this.canvas.getBoundingClientRect();
        this.ctx.beginPath();
        this.ctx.moveTo(x1 - rect.left, y1 - rect.top);
        this.ctx.lineTo(x2 - rect.left, y2 - rect.top);
        this.ctx.lineWidth = 5;
        this.ctx.strokeStyle = '#001d3d';
        this.ctx.stroke();
      },
      drawAllLines() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clear the canvas before drawing
  
        for (let i = 0; i < this.selectedItems.length; i++) {
          const item1 = document.getElementById(this.selectedItems[i][0]);
          const item2 = document.getElementById(this.selectedItems[i][1]);
          if (!item1 || !item2) continue; // Skip drawing if elements are not found
          const rect1 = item1.getBoundingClientRect();
          const rect2 = item2.getBoundingClientRect();
          const x1 = rect1.left + rect1.width / 2;
          const y1 = rect1.top + rect1.height / 2;
          const x2 = rect2.left + rect2.width / 2;
          const y2 = rect2.top + rect2.height / 2;
  
          this.drawLine(x1, y1, x2, y2);
        }
      },
      deleteLine(item) {
        let tempList = [];
        for (let i = 0; i < this.selectedItems.length; i++) {
          if (this.selectedItems[i][0] !== item && this.selectedItems[i][1] !== item) {
            tempList.push(this.selectedItems[i]);
          } else {
            const itemToRemove1 = document.getElementById(this.selectedItems[i][0]);
            if (itemToRemove1) itemToRemove1.classList.remove('selected');
            const itemToRemove2 = document.getElementById(this.selectedItems[i][1]);
            if (itemToRemove2) itemToRemove2.classList.remove('selected');
          }
        }
        this.selectedItems = tempList;
      },
      calculatePoints() {
        this.points = 0;
        for (let i = 0; i < this.correctLines.length; i++) {
          for (let j = 0; j < this.selectedItems.length; j++) {
            if (this.compareLines(this.selectedItems[j], this.correctLines[i])) {
              this.points += 5;
              break; // prevent counting the same correct line multiple times
            }
          }
        }
      },
      compareLines(userAns, correctAns) {
        if (userAns[0] === correctAns[0] && userAns[1] === correctAns [1]) {
          return true;
        } else if (userAns[1] === correctAns[0] && userAns[0] === correctAns [1]) {
          return true;
        }
        return false;
      }
  }
};
</script>


<style scoped>
@font-face {
 font-family: "yarden";
 /* הנתיב הזה נראה כמו נתיב מקומי במחשב שלך.
    וודאי שהנתיב היחסי לקובץ הפונט תקין בפרויקט החדש שלך (למשל, ../../assets/fonts/...) */
 src: url("C:\Users\idan2\Downloads\mortar-main\mortar-main\src\assets\fonts\yarden-bold-alefalefalef.otf");
}

/* הוספת פונט Rubik אם משתמשים בו במקום אחר */
/* @font-face {
  font-family: "rubik";
  src: url("C:\Users\idan2\Downloads\mortar-main\mortar-main\src\assets\fonts\Rubik-Italic-VariableFont_wght.ttf");
} */


#draw-lines {
 margin: 0;
 margin-top: 10%;
 height: fit-content;
 width: 100vw;
 position: relative;
 top: 0;
 right: 0;
   /* וודאי שאף כלל גלובלי לא מאפס display או position */
   display: block;
   z-index: 1; /* וודאי שהוא מעל רקע או אלמנטים אחרים */
}
#bg-container {
 list-style-type: none;
 padding: 1%;
 margin: auto;
 margin-top: 0%;
 background-color: #fce9a9;
 padding-bottom: 3%;
 border-radius: 1vh;
 width: 95vw;
   /* הוספת transition לשינוי צבע רקע אם תשתמשי בזה בהמשך */
   transition: background-color 0.5s ease;
   /* וודאי שאף כלל גלובלי לא מאפס display או position */
   display: block;
   position: relative;
}
#instruction {
 color: #001d3d;
 font-size: 8vw;
 margin: 2%;
 font-weight: 560;
 font-family: "yarden", sans-serif; /* השתמש בפונט yarden ואז sans-serif כ-fallback */
   direction: rtl; /* וודאי כיוון טקסט נכון */
   /* וודאי שאף כלל גלובלי לא מאפס display */
   display: block;
}
.container {
 display: flex;
 justify-content: space-between;
 width: 100%;
 height: fit-content;
 align-self: center;
   /* וודאי שאף כלל גלובלי לא מאפס מידות או display */
   min-height: 1px; /* לוודא שלא קורס לגובה 0 */
   min-width: 1px; /* לוודא שלא קורס לרוחב 0 */
}

.selected {
 background-color: #001d3d;
}


.column {
 /* width: 20vw; */ /* ייתכן שצריך להגדיר רוחב כאן אם הם קורסים */
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: space-between;
 /* margin-right: 2vw;
  margin-left: 2vw; */
   /* וודאי שאף כלל גלובלי לא מאפס מידות או display */
   min-height: 1px; /* לוודא שלא קורס לגובה 0 */
   min-width: 1px; /* לוודא שלא קורס לרוחב 0 */
}

.item {
 display: flex;
 flex-direction: row;
 align-items: center;
   /* וודאי שאף כלל גלובלי לא מאפס מידות או display */
   min-height: 1px; /* לוודא שלא קורס לגובה 0 */
   min-width: 1px; /* לוודא שלא קורס לרוחב 0 */
}

.dot {
 border-radius: 50%;
 display: inline-block;
 border: 0.8vw #001d3d solid;
 width: 4.5vw;
 height: 2.5vh;
 /* padding: 4vh; */
 margin-top: 4vh;
 margin-right: 0.5vw;
   cursor: pointer; /* הוספת סמן עכבר */
   /* וודאי שאף כלל גלובלי לא מאפס display, width, height או border */
   box-sizing: content-box; /* לוודא שהגודל כולל רק תוכן ולא גבולות/ריפוד אם הם מוגדרים */
   flex-shrink: 0; /* למנוע מהם להתכווץ באם ההורה הוא flex */
}

#second-dot {
 border-radius: 50%;
 display: inline-block;
 border: 0.8vw #001d3d solid;
 height: 2.5vh;
 margin-top: 4vh;
 margin-left: 0.5vw;
   cursor: pointer; /* הוספת סמן עכבר */
   /* וודאי שאף כלל גלובלי לא מאפס display, width, height או border */
   box-sizing: content-box; /* לוודא שהגודל כולל רק תוכן ולא גבולות/ריפוד אם הם מוגדרים */
   flex-shrink: 0; /* למנוע מהם להתכווץ באם ההורה הוא flex */
}


.list-item {
 background-color: #001d3d;
 border-radius: 2vw;
  margin-top: 12%;
 text-align: center;
 width: 30vw; /* מוגדר רוחב */
 list-style-type: none;
 color: #ffc300; /* מוגדר צבע טקסט */
 min-height: 10vh; /* מוגדר גובה מינימלי */
 padding-top: 3%;
 white-space: break-spaces;
 /* font-weight: bolder; */
 display: flex; /* מוגדר display flex */
 align-items: center;
 justify-content: center;
 box-shadow: rgba(0, 0, 0, 0.35) 0 0.5vh 0.5vh;
    /* *** השינוי החשוב ביותר עבור overflow-x: hidden; מהכלל הגלובלי *** */
    overflow: visible; /* חשוב! מבטל את overflow-x: hidden; גלובלי */
    /* וודאי שאף כלל גלובלי אחר לא מאפס width/height/min-height/padding */
    box-sizing: border-box; /* ייתכן שעוזר בהתמודדות עם padding ורוחב */
    flex-shrink: 0; /* למנוע מהם להתכווץ בתוך flex container */
    font-family: "yarden", sans-serif; /* וודאי שימוש בפונט הרצוי */
    direction: rtl; /* וודאי כיוון טקסט נכון */
    user-select: text; /* אם רוצים לאפשר בחירת טקסט בניגוד לגלובלי */
 }

.covered-container {
 position: relative; /* Necessary for absolute positioning of canvas */
   /* וודאי שאף כלל גלובלי לא מאפס מידות או display */
   min-height: 1px;
   min-width: 1px;
   /* ייתכן שגם כאן צריך overflow: visible; אם ההורה הוא שמוסתר */
}

/* ודאי שה-canvas מקבל גודל.
 הגודל אמור להיות מוגדר ב JS באמצעות resizeCanvas,
 אך וודאי שאין כלל CSS שמאפס אותו */
.overlay-canvas {
 position: absolute;
 left: 0;
 pointer-events: none; /* Allow clicking through the canvas */
   /* וודאי שאף כלל גלובלי לא מאפס width, height, top, left */
   display: block; /* לוודא שהוא מופיע כבלוק */
   z-index: 2; /* וודאי שהוא מעל האלמנטים שעליו הוא מצייר */
}

/* #checkBtn { ... } סגנונות לכפתור בדיקה אם תחזירי אותו */
</style>