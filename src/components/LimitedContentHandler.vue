<template>
    <div id="content-handler">
        <div class="subtitle">
            <div @click="showText" class="subtitleName">1. {{ subtitels[0] }}
                <div id="btnMark">{{ btnMark }}</div>
            </div>
            
            <open-text v-if="textVis" :mainNum="contentNum+1" :subNum="hativaNum"></open-text>
        </div>
        <div v-for="(subtitle, index) in subtitels" :key="index" class="subtitle" v-if="index >0">
            <div :id="index" class="subtitleName">{{index+1}}. {{subtitle}}</div>
        </div>
    </div>
</template>

<script>
import OpenText from '@/components/OpenText';
import json from "../../text.json";


export default {
    name: "limited-content-handler",
    components: {
        OpenText
    },
    props:["contentNum", "hativaNum"],
    data() {
        return {
            btnMark: "+",
            textVis: false,
        }
    },
    methods: {
        showText(event) {
            if (this.textVis === false) {
                this.textVis = true;
                this.btnMark = "-";
            } else {
                this.textVis = false;
                this.btnMark = "+";
            }
        }
    },
    computed: {
        subtitels() {
            const subtitleKey = `subtitles${this.contentNum}`;
            // Ensure the key exists and return an empty array if not
            return json.chapters[0][subtitleKey] || [];
        }
    }
}


</script>

<style scoped>
    #content-handler {
        margin: auto;
        margin-top: 5%;
        height: auto;
        padding-top: 5%;
        padding-bottom: 10%;
        /* height: fit-content; */
        margin-bottom: 10%;
        width: 90vw;
        position: relative;
        background-color: #ff6100;
        border-radius: 1.5vh;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5vw 15vw;
        /* position: relative;
        top: 0;
        right: 0; */
    }
    .subtitleName {
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        background-color: #fffaf2;
        margin: auto;
        padding: 3%;
        width: 90%;
        color: #0c275c;
        font-size: 1.7rem;
        font-weight: bolder;
        border-radius: 1vh;
        margin-top: 5%;
        margin-bottom: 2.5%;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: space-between;
    }

    #btnMark {
        display: inline-block;
        font-size: 2rem;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        margin: 1%;
        overflow: hidden;
        background-color: #ff6100;
        color: #0c275c;
        text-align: center;
    }
</style>