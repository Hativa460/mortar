<template>
    <div id="ranging">
        <div id="title">{{ title }}</div>
        <div id="subtitle">{{ subtitle }}</div>
        <limited-content-handler :contentNum="0" :hativaNum="hativaNum"></limited-content-handler>
        <div @click="nextPage" id="btn">יאללה בוא נמשיך</div>
    </div>
</template>

<script>
import json from "../../text.json";
import LimitedContentHandler from "./LimitedContentHandler";
export default {
    name: "ranging",
    props: ["pageNum", "hativaNum"],
    components: {
        LimitedContentHandler
    },
    computed: {
        title() {
            return json.info[this.pageNum].title;
        },
        subtitle() {
            return json.info[this.pageNum].subtitle;
        }
    },
    methods: {
        nextPage() {
            this.$emit("next-page");
        }
    }
}
</script>

<style scoped>
#ranging {
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
    text-align: center;
    margin-top: 30%;
}
#subtitle {
    font-size: 2rem;
    text-align: center;
    margin-top: 3%;
}
#btn {
    background-color: #ff6100;
    color: #fffaf2;
    font-family: "yarden";
    font-size: 1.8rem;
    border-radius: 1rem;
    width: fit-content;
    margin: auto;
    margin-top: 3%;
    margin-bottom: 2%;
    display: block;
    padding: 2.5%;
    text-align: center;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5vw 15vw;
}
</style>