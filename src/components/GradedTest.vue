<template>
    <div id="gradetest">
        <div id="title">מבחן וסיימנו..</div>
        <multiple-choice-grade :questionNum="0" @points-updated="multipleChoice"></multiple-choice-grade>
        <match-table-grade :questionNum="1" @points-updated="matchTable"></match-table-grade>
        <sort-table-grade :questionNum="2" @points-updated="sortableList"></sort-table-grade>
        <simple-line-matcher :questionNum="0" @points-updated="drawline"></simple-line-matcher>
        <sort-table-list-tow :questionNum="3" @points-updated="sortableList2"></sort-table-list-tow>
        <div @click="nextPage" id="btn">הגש</div>
    </div>
</template>

<script>
import json from "../../text.json";
import SortTableGrade from "./SortTableGrade.vue";
import MatchTableGrade from "./MatchTableGrade.vue";
import MultipleChoiceGrade from "./MultipleChoiceGrade.vue";
import SimpleLineMatcher from "./SimpleLineMatcher.vue";
import SortTableListTow from "./SortTableListTow.vue";
export default {
    name: "graded-test",
    props:["pageNum"],
    data() {
        return {
            matchTablePoints: 0,
            drawlinePoints: 0,
            sortableListPoints: 0,
            sortableListPoints2: 0,
            multipleChoicePoints: 0,
            finalGrade: 0,
        }
    },
    computed: {
        title() {
            return json.info[this.pageNum].title;
        }
    },
    components: {
        SortTableGrade,
        SimpleLineMatcher,
        MultipleChoiceGrade,
        MatchTableGrade,
        SortTableListTow
    },
    methods: {
        nextPage() {
            this.finalGrade = this.matchTablePoints + this.drawlinePoints + this.sortableListPoints + this.multipleChoicePoints + this.sortableListPoints2;
            console.log(this.finalGrade);
            this.$emit('finish-main',this.finalGrade);
        },
        matchTable(points) {
            this.matchTablePoints = points;
        },
        drawline(points) {
            this.drawlinePoints = points;
        },
        sortableList(points) {
            this.sortableListPoints = points;
        },
        multipleChoice(points){
            this.multipleChoicePoints = points;
        },
        sortableList2(points) {
            this.sortableListPoints2 = points;
        }
    }
}
</script>

<style scoped>

#gradetest {
    margin: 0%;
    overflow-x: hidden;
    height: 100%;
    width: 100vw;
    position: absolute;
    top: 0;
    right: 0;
}
#title {
    font-family: "yarden";
    font-size: 3.5rem;
    /* text-align: center; */
    margin-top: 28%;
    margin-right: 2%;
}
#btn {
    background-color: #ff6100;
    color: #fffaf2;
    font-family: "yarden";
    font-size: 1.8rem;
    border-radius: 1rem;
    width: fit-content;
    margin: auto;
    margin-top: 10%;
    margin-bottom: 2%;
    display: block;
    padding: 2.5%;
    text-align: center;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5vw 15vw;
}

</style>