<template>
    <div id="sadur">
        <img @click="backToPage" id="arrow" src="../assets/media/back.svg" alt="back">
        <div id="title">{{ title }}</div>
        <div class="subTitle">פק"לים קבועים- תורתי</div>
        <table-handler ></table-handler>
        <div class="subTitle">פק"ל סדור</div>
        <pakal-sadur :topicNum="1" :hativaNum="hativaNum" :pageNum="pageNum"></pakal-sadur>
        <div class="subTitle">הפעלת תאורה</div>
        <light :topicNum="1" :hativaNum="hativaNum" :pageNum="pageNum"></light>
        <div class="subTitle">הפעלת עשן</div>
        <smoke :topicNum="1" :hativaNum="hativaNum" :pageNum="pageNum"></smoke>
        <div @click="backToPage" id="back-btn">כן הבנתי</div>
    </div>
</template>

<script>
import json from "../../text.json";
import TableHandler from '@/components/TableHandler';
import PakalSadur from "@/components/PakalSadur";
import Light from "@/components/Light";
import Smoke from "@/components/Smoke";
export default {
    name: "sadur",
    props: ["pageNum", "topicNum", "hativaNum"],
    computed: {
        title() {
            const topicKey = `topic${this.topicNum}`;
            return json.info[this.pageNum][topicKey].title;
        }
    },
    components: {
        TableHandler,
        PakalSadur,
        Smoke,
        Light
    },
    methods: {
        backToPage() {
            this.$emit('close-page');
        }
    }
}
</script>

<style scoped>
#sadur {
    margin: 0%;
    overflow-x: hidden;
    height: 100%;
    width: 100vw;
    position: absolute;
    top: 0;
    right: 0;
}
#arrow {
    position: fixed;
    top: 0%;
    right: 1%;
    z-index: 3;
    max-width: 100%;
    height: 10vh;
    background-color: #0c275c;
}
#title {
    margin: auto;
    text-align: center;
    margin-top: 25%;
    font-family: "yarden";
    font-size: 3.3rem;
    margin-bottom: 7%;
}
#back-btn {
    background-image: url(../assets/media/back-btn.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    padding-top: 10%;
    width: 40vw;
    height: 5vh;
    color: #0c275c;
    text-align: center;
    margin: auto;
    display: block;
    margin-top: 10%;
    font-family: "yarden";
    font-size: 2rem;
}
.subTitle {
    margin: auto;
    text-align: center;
    margin-top: 10%;
    font-family: "yarden";
    font-size: 2.5rem;
    margin-bottom: 3%;
    /* color: #fffaf2; */
}
</style>