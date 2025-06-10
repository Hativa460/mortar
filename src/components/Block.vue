<template>
    <div id="block">
        <img @click="backToPage" id="arrow" src="../assets/media/back.svg" alt="back">
        <div id="title">{{ title }}</div>
        <div v-for="(action, index) in actions" :key="action" class="action animate__animated animate__slideInRight">
            <div class="action-num">{{ index+1 }}</div>
            <div class="action-text">{{ action }}</div>
        </div>
        <div @click="backToPage" id="back-btn">כן הבנתי</div>
    </div>
</template>

<script>
import json from "../../text.json";
export default {
    name: "block",
    props: ["pageNum", "hativaNum", "topicNum"],
    computed: {
        actions() {
            const actionKey = `actions${this.hativaNum}`;
            const topicKey = `topic${this.topicNum}`;
            return json.info[this.pageNum][topicKey][actionKey];
        },
        title() {
            const topicKey = `topic${this.topicNum}`;
            return json.info[this.pageNum][topicKey].title;
        }
    },
    methods: {
        backToPage() {
            this.$emit('close-page');
        }
    }
}
</script>

<style>
#block {
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
    font-size: 3.9rem;
    margin-bottom: 7%;
}
.action {
    display: flex;
    width: 98vw;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    height: fit-content;
    flex-shrink: 0;
    margin-bottom: 6%;
}
.action-num {
    padding: 3%;
    flex-shrink: 0;
    border-radius: 50%;
    overflow: hidden;
    width: 3vh;
    height: 3vh;
    font-size: 2rem;
    font-family: "yarden";
    text-align: center;
    margin-left: 2%;
    margin-right: 2%;
    background-color: #cee2ff;
    color: #0c275c;
    z-index: 2;
}
.action-text {
    font-size: 1.5rem;
    font-weight: 560;
    white-space: break-spaces;
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
</style>