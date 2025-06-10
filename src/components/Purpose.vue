<template>
    <div id="purpose">
        <div v-if="showMain">
            <div id="title">{{title}}</div>
            <div class="card-container animate__animated animate__slideInRight" v-for="(subj,index) in subjects" :key="index" :id="'topic'+(index)" @click="showTopic">
                <div class="card ">{{ subj }}</div>
                <img src="../assets/media/arrow.png" alt="arrow" class="arrow">
            </div>
            <div @click="nextPage" id="btn">קראתי הכל</div>
        </div>
        <div v-else>
            <menohak  v-if="topicNum === 0":topicNum="topicNum" :pageNum="pageNum" @close-page="showMenu"></menohak>
            <sadur v-if="topicNum === 1":topicNum="topicNum" :pageNum="pageNum" :hativaNum="hativaNum" @close-page="showMenu"></sadur>
            <menihuk  v-if="topicNum === 2":topicNum="topicNum" :pageNum="pageNum" @close-page="showMenu"></menihuk>
            <block v-if="topicNum === 3" :topicNum="topicNum" :hativaNum="hativaNum" :pageNum="pageNum" @close-page="showMenu"></block>
        </div>
    </div>
</template>

<script>
import json from "../../text.json";
import Block from "@/components/Block";
import Menohak from "@/components/Menohak";
import Sadur from "@/components/Sadur";
import Menihuk from "@/components/Menihuk";
export default {
    name: "purpose",
    props: ["pageNum", "hativaNum"],
    components: {
        Block,
        Sadur,
        Menohak,
        Menihuk
    },
    data() {
        return {
            showMain: true,
            topicNum: -1
        }
    },
    computed: {
        title() {
            return json.info[this.pageNum].title;
        },
        subjects() {
            return json.info[this.pageNum].subjects;
        }
    },
    methods: {
        nextPage() {
            this.$emit("next-page");
        },
        showTopic(event) {
            let nTopic = Number(event.currentTarget.id.charAt(5));
            this.topicNum = nTopic;
            this.showMain= false;
        },
        showMenu() {
            this.showMain= true;
            this.topicNum = -1;
        }
    }
}
</script>

<style scoped>
#purpose {
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
    font-size: 4rem;
    /* text-align: center; */
    margin-top: 30%;
    margin-right: 2%;
    margin-bottom: 10%;
}

.card-container {
    display: flex;
    width: 90vw;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    height: fit-content;
    /* margin-bottom: 3%; */
    margin-top: 5%;
    border-top-left-radius: 3rem;
    border-bottom-left-radius: 3rem;
    background-color: #cee2ff;
    padding: 1%;
}

.card {
    font-size: 2.1rem;
    color: #0c275c;

}

.arrow {
    width: 4.5rem;
    max-height: 100%;
    flex-shrink: 0;
    margin: 1%;
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