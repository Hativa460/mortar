<template>
    <div id="pakal-sadur">
        <div v-for="(action, index) in actions" :key="action" class="action animate__animated animate__slideInRight">
            <div class="action-num">{{ index+1 }}</div>
            <div class="action-text">{{ action }}</div>
        </div>
    </div>
</template>

<script>
import json from "../../text.json";
export default {
    name: "smoke",
    props: ["hativaNum", "pageNum", "topicNum"],
    computed: {
        actions() {
            const actionKey = `light${this.hativaNum}`;
            const topicKey = `topic${this.topicNum}`;
            return json.info[this.pageNum][topicKey][actionKey];
        }
    }
}
</script>

<style scoped>
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
</style>