<template>
    <div id="test">
        <div id="title">{{ title }}</div>
        <sortable-list :questionNum="0" key="0"></sortable-list>
        <sortable-list :questionNum="1" key="1"></sortable-list>
        <match-table :questionNum="0" key="2"></match-table>
        <div @click="nextPage" id="btn">הלאה</div>
    </div>
</template>

<script>
import json from "../../text.json";
import MatchTable from "./MatchTable.vue";
import SortableList from "./SortableList.vue";

export default {
    name: "test",
    props:["pageNum"],
    computed: {
        title() {
            return json.info[this.pageNum].title;
        }
    },
    components: {
        SortableList,
        MatchTable
    },
    methods: {
        nextPage() {
            this.$emit('next-page');
        }
    }
}
</script>

<style scoped>

#test {
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