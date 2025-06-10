<template>
    <div id="corrections">
        <div id="title">{{ title }}</div>
        <div id="subtitle">{{ subtitle }}</div>
        <extensive-content-handler :contentNum="pageNum-2" :hativaNum="hativaNum"></extensive-content-handler>
        <div @click="nextPage" id="btn">מושלם הבנתי</div>
    </div>
</template>

<script>
import json from "../../text.json";
import ExtensiveContentHandler from "@/components/ExtensiveContentHandler";
export default {
    name: "corrections",
    props: ["pageNum", "hativaNum"],
    components: {
        ExtensiveContentHandler
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
#corrections {
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
}
#subtitle {
    font-size: 2rem;
    /* text-align: center; */
    margin-top: 3%;
    margin-right: 2%;
    width: 96vw;
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