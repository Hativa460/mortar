<template>
    <div id="open-page">
        <div id="title">הפעלת אש- טיווח</div>
        <div id="info">היום נלמד ונתרגל הפעלת אש מרגמות לפי סד"פ סדור ולשם מספר מטרות שונות</div>
        <button @click="nextPage" id="start-btn">יאללה מתחילים</button>
    </div>
</template>

<script>
export default {
    name: "open-page",
    props: [],
    data() {
        return {

        }
    },
    methods: {
        nextPage() {
            this.$emit('next-page');
        }
    }
}
</script>

<style scoped>

#open-page {
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
    font-size: 4.5rem;
    margin: auto;
    text-align: center;
    margin-top: 40%;
}
#info {
    font-family: "yarden-light";
    font-size: 2.3rem;
    text-align: center;
    width: 95vw;
    margin: auto;
    margin-top: 5%;
    margin-bottom: 5%;
}
#start-btn {
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
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5vw 15vw;
    animation: scaling 1.1s linear infinite alternate;
    -webkit-animation: scaling 1.1s linear infinite alternate;
}
@keyframes scaling {
    from {
        scale: 1;
    }
    to {
        scale: 1.05;
    }
}
@-webkit-keyframes scaling {
    from {
        scale: 1;
    }
    to {
        scale: 1.05;
    }
}
</style>