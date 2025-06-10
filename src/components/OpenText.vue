<template>
    <div id="open-text">
        <div class="intro-text">{{text}}</div>   
    </div>
</template>

<script>
   import json from "../../text.json";
export default {
    name: "open-text",
    props: ["mainNum", "subNum"],
    computed: {
        text() {
            return json.chapters[this.mainNum][`txt${this.subNum}`][0];
        }
    }
}

</script>

<style scoped>
    .container-text {
        /* background-color: #83c5bf; */
        padding-right: 0.40rem;
        padding-left: 0.40rem;
        padding-top: 1.7rem;
        z-index: -1;
        margin-top: -1.5rem;
        width: 92%;
        height: auto;
        border-radius: 3vw;
        right: 48%;
        transform: translateX(50%);
    }


    .intro-text {
        line-height: 1.2;
        font-size: 1.5rem;
        font-weight: 540;
        text-align: right;
        color: #0c275c;
        margin-right: 3%;
        white-space: pre-line;
    }
</style>