<template>
    <div id="final-page">
        <div v-if="score>80" id="title">מרגמות קטנות עליך</div>
        <div v-if="score<80" id="title2">מרגמות לא כל כך קטנות עליך,שנקרא שוב?</div>
        <div id="txt">ציונך במבחן :</div>
        <div id="score">{{ score }}</div>
        <img id="restart" src="../assets/media/restart.svg" alt="restart" class="animate__animated animate__rotateIn" @click="restart">
    </div>
  </template>
  
  <script>
  import confetti from 'canvas-confetti';
  
  export default {
    name: "final-page",
    props: ["score"],
    data() {
      return {};
    },
    mounted() {
      this.startConfetti();
    },
    methods: {
        restart() {
            this.$emit('restart');
        },
      startConfetti() {
        const duration = 2 * 1000; // 4 seconds
        const end = Date.now() + duration;
  
        const confettiSettings = {
          angle: 90, // Horizontal direction
          spread: 360, // Full circle spread
          origin: { x: 0.5, y: 0.5 }, // Center of the screen
          colors: ['#ff6100'], // Confetti color
          particleCount: 200, // Number of confetti pieces
          gravity: 0.5, // Slight downward movement
          ticks: 150 // Speed of confetti fall
        };
  
        const interval = setInterval(() => {
          if (Date.now() > end) {
            clearInterval(interval);
          }
          confetti(confettiSettings);
        }, 750); // Fire confetti every 100 ms
      },
    },
  };
  </script>
  
  <style scoped>
  #final-page {
    margin: 0;
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
    margin-top: 50%;
    color: #ff6100;
  }
  #title2 {
    font-family: "yarden";
    font-size: 3rem;
    margin: auto;
    text-align: center;
    margin-top: 50%;
    color: #ff6100;
  }

  #txt {
    font-family: "yarden";
    font-size: 3rem;
    margin: auto;
    text-align: center;
    margin-top: 20%;
    color: #ff6100;
  }
  #score {
    font-family: "yarden";
    font-size: 4rem;
    margin: auto;
    text-align: center;
    margin-top: 10%;
    color: #ff6100;
  }
  
  #restart {
    display: block;
    margin: auto;
    margin-top: 5%;
    max-width: 100%;
    height: 15vh;
  }
  </style>
  