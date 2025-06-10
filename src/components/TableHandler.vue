<template>
    <div id="table-handler">
        <div v-for="(header, index) in headers" :key="index" class="header">
            <div :id="index" class="headerName"  @click="showText">{{index+1}}. {{header}}
                <div class="btnMark">{{ pressedIndex.includes(index) ? "-": "+" }}</div>
            </div>
            <open-table v-if="pressedIndex.includes(index)" :subNum="index"></open-table>
        </div>
    </div>
</template>

<script>
import json from "../../text.json";
import OpenTable from "@/components/OpenTable";
export default {
    name: "table-handler",
    computed: {
        headers() {
            return json.openTable[0].headers;
        }
    },
    data() {
        return {
            pressedIndex: [],
            btnMark: "+"
        }
    },
    components: {
        OpenTable
    },
    methods: {
        showText(event) {
            if (this.pressedIndex.includes(Number(event.target.id))) {
                let newArr = [];
                for (let i =0; i< this.pressedIndex.length; i++) {
                    if (this.pressedIndex[i] !== Number(event.target.id)) {
                        newArr.push(this.pressedIndex[i]);
                    }
                }
                this.pressedIndex = newArr;
            } else {
                this.pressedIndex.push(Number(event.target.id));
            }
        }
    }
}
</script>

<style scoped>
#table-handler {
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
}
.headerName {
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
.btnMark {
    display: inline-block;
    font-size: 2rem;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    margin: 1%;
    overflow: hidden;
    flex-shrink: 0;
    background-color: #ff6100;
    color: #0c275c;
    text-align: center;
}

</style>