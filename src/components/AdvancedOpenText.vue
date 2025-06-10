<template>
    <div id="advanced-open-text">
        <div class="highlighted-text">{{highlightedText}}</div> 
        <div class="text">{{ text }}</div>
    </div>
</template>

<script>
import json from "../../text.json";
export default {
    name: "advanced-open-text",
    props: ["mainNum", "subNum", "hativaNum"],
    computed: {
        highlightedText() {
            const txtKey = `highlighted${this.mainNum}`;
            return json.advanced[1][txtKey][this.subNum];
        }, 
        text() {
            const hativaKey = `txt${this.hativaNum}`;
            return json.advanced[this.mainNum+2][hativaKey][this.subNum][0];
        }
    }
}
</script>

<style scoped>
.text {
    line-height: 1.2;
    font-size: 1.4rem;
    font-weight: 540;
    text-align: right;
    color: #0c275c;
    margin-right: 3%;
    margin-top: 2%;
    white-space: pre-line;
    width: 95%;
}
.highlighted-text {
    line-height: 1.2;
    font-size: 1.65rem;
    font-weight: 600;
    text-align: right;
    color: #0c275c;
    margin-right: 3%;
    white-space: pre-line;
    width: 95%;
}
</style>