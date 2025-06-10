<template>
    <div id="defenation">
        <div id="title">{{ title }}</div>
        <div class="subtitle">{{ subtitle1 }}</div>
        <div v-for="(step, index) in steps" :key="index" class="step animate__animated animate__slideInRight" :style="{width: step.width}">
            <div class="step-text" >{{ step["title"] }}</div>
            <div class="step-num">{{ index+1 }}</div>
        </div>
        <div class="subtitle second">{{ subtitle2 }}</div>
        <div v-for="(action, index) in actions" :key="action" class="action animate__animated animate__slideInRight">
            <div class="action-num">{{ index+1 }}</div>
            <div class="action-text">{{ action }}</div>
        </div>
        <div @click="nextPage" id="btn">הבנתי אפשר להמשיך</div>
    </div>
</template>

<script>
import json from "../../text.json";

export default {
    name: "defenition",
    props: ["pageNum"],
    computed: {
        title() {
            return json.info[this.pageNum].title;
        },
        subtitle1() {
            return json.info[this.pageNum].subTitle1;
        },
        steps() {
            return json.info[this.pageNum].steps;
        },
        subtitle2() {
            return json.info[this.pageNum].subtitle2;
        },
        actions() {
            return json.info[this.pageNum].actions;
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
#defenition {
    margin: 0%;
    overflow-x: hidden;
    height: 100%;
    width: 100vw;
    position: absolute;
    top: 0;
    right: 0;
}
#title {
    margin-top: 20%;
    margin-right: 2%;
    font-family: "yarden";
    font-size: 4rem;
}
.subtitle {
    font-size: 2.4rem;
    font-family: "yarden";
    margin-top: 5%;
    margin-right: 2%;
    width: 95vw;
    margin-bottom: 3%;
}
.second {
    margin-top: 12%;
}

.step {
    border-top-left-radius: 8vh;
    border-bottom-left-radius: 8vh;
    background-color: #cee2ff;
    height: 6vh;
    margin-top: 3%;
    padding: 3%;
    padding-left: 2vw;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;

}

.step-num {
    padding: 3%;
    border-radius: 50%;
    overflow: hidden;
    width: 3vh;
    height: 3vh;
    font-size: 2rem;
    font-family: "yarden";
    text-align: center;
    margin-left: 2%;
    background-color: #0c275c;
    z-index: 2;
}
.step-text {
    font-size: 1.5rem;
    color: #0c275c;
    margin-right: 2%;
    font-weight: 560;
    font-weight: 560;
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
    margin-bottom: 3%;
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