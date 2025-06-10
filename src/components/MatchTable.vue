<template>
    <div id="match">
        <div class="table-container">
            <div id="instruction">{{ title }}</div>
            <div id="table-wrapper">
                <table class="inner-table" :style="{ background: bgColor }">
                    <tr v-for="(square, index) in column" :key="index" :class="index === column.length-1 ? '' : 'row'" :style="getRowStyle(index)">
                        <td class="select-square">
                            <select v-model="selectedAnswers[index]" name="" class="custom-select" @change="setOptionSelected(index)">
                                <option v-for="(option, index) in options" :key="index">{{ option }}</option>
                            </select>
                        </td>
                        <td class="text-square">{{ square }}</td>
                    </tr>
                </table>
            </div>
            
            <div id="checkBtn" @click="checkAns">{{ btnText }}</div>
        </div>
    </div>
</template>

<script>
import json from "../../text.json";
export default {
    name: "match-table",
    props: ["questionNum"],
    data() {
        return {
            btnText: "בדוק אותי",
            makeOrange: true,
            bgColor: "#ff6100", // Ensure the initial background is orange
            selectedAnswers: ["", "", ""], // Initialize with empty strings or default values
            isChecked: false, // To track if the button has been clicked
            isOptionSelected: false // Track if any option is selected after checking
        };
    },
    computed: {
        title() {
            return json.matching[this.questionNum].title;
        },
        column() {
            return json.matching[this.questionNum].column;
        },
        options() {
            return json.matching[this.questionNum].options;
        },
        correctAnswers() {
            return json.matching[this.questionNum].correctAnswers;
        }
    },
    methods: {
        checkAns () {
            if (this.btnText === "בדוק אותי") {
                this.makeOrange = false;
                let allCorrect = true;
                for (let i = 0; i < this.selectedAnswers.length; i++) {
                    if (this.selectedAnswers[i] !== this.correctAnswers[i]) {
                        allCorrect = false;
                        break;
                    }
                }
                if (allCorrect) {
                    this.btnText = "אין עליך!";
                    this.bgColor = "rgb(179, 241, 160)"; // Green background if correct
                } else {
                    this.btnText = "תנסה שוב...";
                    this.bgColor = "rgb(247, 83, 83)"; // Red background if incorrect
                }
            } else {
                this.btnText = "בדוק אותי";
                this.makeOrange = true;
            }
        },

        setOptionSelected(index) {
            this.btnText = "בדוק אותי";
            this.makeOrange = true;
        },

        getRowStyle(index) {
            if (this.makeOrange) {
                return { backgroundColor: "#ff6100" };
            } else {
                const isCorrect = this.selectedAnswers[index] === this.correctAnswers[index];
                return {
                    backgroundColor: isCorrect ? "rgb(179, 241, 160)" : "rgb(247, 83, 83)"
                };
            }
        }
    }
};
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
.table-container {
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
#table-wrapper {
    border-radius: 2vh;
    overflow: hidden;
    margin-bottom: 2%;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    width: 95%;
    margin: auto;
    display: block;
}
.inner-table {
    background-color: #ff6100;
    width: 100%;
    border-collapse: collapse;
    /* border: 1vw solid #ff6100; */
}
.row {
    border-bottom:#0c275c solid 0.5vh;
    width: fit-content;
    height: fit-content;
}

.text-square {
    height: fit-content;
    white-space: break-spaces;
    color: #0c275c;
    font-size: 5vw;
    font-weight: 550;
    padding: 3.5%;
}
option {
    background-color: #0c275c;
}
.custom-select {
    background-color: #0c275c;
    position: relative;
    font-family: yarden;
    padding: 2%;
    font-size: 5vw;
    width: fit-content;
    margin: auto;
    display: block;
    border-radius: 0.5vh;
}
.select-square {
    width: 40%;
    border-left: #0c275c solid 0.5vh;
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
