<template>
    <div id="pick-hativa">
        <div id="title">רגע! כמעט שכחנו מה החטיבה שלך?</div>
        <div id="container">
            <img @click="pickHativa" name="401" :class = "chosenHativa === '401' ? `chosen`: ``" class="hativa animate__animated animate__rubberBand" src="../assets/media/401.png" alt="401">
            <img @click="pickHativa" name="7" :class = "chosenHativa === '7' ? `chosen`: ``" class="hativa animate__animated animate__rubberBand" src="../assets/media/7.svg" alt="7">
            <img @click="pickHativa" name="188" :class = "chosenHativa === '188' ? `chosen`: ``" class="hativa animate__animated animate__rubberBand" src="../assets/media/188.png" alt="188">
        </div>
        <div id="btn" @click="nextPage">אוקי עכשיו אפשר להתחיל</div>
    </div>
</template>

<script>
export default {
    name: "pick-hativa",
    data() {
        return {
            chosenHativa: '0'
        }
    },
    methods: {
        pickHativa(e) {
           this.chosenHativa= e.target.name;
        },
        nextPage() {
            if (this.chosenHativa === '0') {
                alert("כל הכבוד על ההתלהבות להתקדם אבל קודם תבחר חטיבה");
            } else {
                this.$emit("next-page", this.chosenHativa);
            }
        }
    }
}
</script>

<style scoped>
#pick-hativa {
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
    font-size: 3.5rem;
    width: 98vw;
    margin: auto;
    text-align: center;
    margin-top: 40%;
}
#container {
    display: flex;
    flex-direction: row;
    margin: auto;
    flex-wrap: nowrap;
    align-items: center;
    margin-top: 5%;
    
    justify-content: space-evenly;
    /* width: 100%; */
    height: min-content;
    min-height: 20vh;
    padding-top: 4vh;
    padding-bottom: 4vh;
}
.hativa {
    max-width: 100%;
    height: 18vh;
    padding: 0px;
}

.chosen {
    /* scale: 1.15; */
    scale: 1.05;
    filter: drop-shadow(0px 0px 1.8vh #d3e3fa);    
}
#btn {
    background-color: #ff6100;
    color: #fffaf2;
    font-family: "yarden";
    font-size: 2rem;
    border-radius: 1rem;
    position: absolute;
    margin-top: 7%;
    left: 50%;
    transform: translateX(-50%);
    padding: 2.5%;
    text-align: center;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5vw 15vw;
}
</style>