<template>
    <div id="open-table">
        <div class="table">
            <table>
                <tr v-for="(category, index) in categories" :key="index" class="row">
                    <td class="cell category">{{ category }}</td>
                    <td class="cell">{{ text[index] }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import json from "../../text.json";
export default {
    name: "open-table-grade",
    props: ["subNum"],
    computed: {
        categories() {
            return json.openTableGraded[0].categories;
        },
        text() {
            return json.openTableGraded[1][`txt${this.subNum}`];
        }
    }
}
</script>

<style scoped>
.row {
    background-color: #fffaf2a0; 
}
.cell {
    color: #0c275c;
    padding: 2%;
    font-size: 1.4rem;
    width: 50vw;
    background-color: #fffaf21c; 
    white-space: break-spaces;
}
.category {
    font-weight: 560;
    width: 40vw;
}
.table {
    display: block;
    margin: auto;
    border-radius: 1rem;
    padding: 0%;
    /* background-color: #0c275c; */
    width: 90%;
    margin-top: 0%;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

}
</style>