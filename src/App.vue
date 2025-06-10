<template>
  <div id="app">
    <div id="logos">
      <img class="logo" src="./assets/media/logo460.svg" alt="460">
      <img class="logo" id="logo196" src="./assets/media/196.png" alt="196">
      <img class="logo" src="./assets/media/קקש.png" alt="קקש">
    </div>
    <div id="background-gdud">196</div>
    <open-page v-if="page === 1" @next-page="nextPage"></open-page>
    <main-page v-if="page === 2" @next-page="toFinalPage"></main-page>
    <final-page v-if="page === 3" @restart="restart" :score="testgrade"></final-page>
  </div>
</template>
 
<script>
import OpenPage from "@/components/OpenPage";
import MainPage from "@/components/MainPage";
import FinalPage from "@/components/FinalPage";

export default {
  name: "app",
  components: {
    OpenPage,
    MainPage,
    FinalPage
  },
  data() {
    return {
      page: 1,
      testgrade : 0,
    }
  },
  methods: {
    nextPage() {
      this.page ++;
    },
    toFinalPage(finalgrade) {
      this.page ++; 
      this.testgrade = finalgrade;
    },
    restart() {
      this.page = 1;
    }
  }
};
</script>

<style>
@font-face {
  font-family: "rubik";
  src: url(assets/fonts/Rubik-VariableFont_wght.ttf);
}
@font-face {
  font-family: "yarden";
  src: url(assets/fonts/yarden-bold-alefalefalef.otf);
}
@font-face {
    font-family: "yarden-light";
    src: url("assets/fonts/yarden-regular-alefalefalef.otf");
}
* {
  user-select: none; 
  font-family: "rubik";
  color: #cee2ff;
  /* color: #b7d4fe; */
  direction: rtl;
  overflow-x: hidden;
  -webkit-user-select: none;
}
  body{
    margin: 0%;
    width: 100vw;
    height: 100%;
    background-color: #0c275c;
    overflow-x: hidden;
  }
  #background-gdud {
    position: fixed;
    color: #a4c7fa;
    opacity: 0.15;
    font-family: "yarden";
    right: 38%;
    margin: 0%;
    bottom: 7%;
    font-weight: bold;
    font-size: 55vw;
    rotate: 270deg;
  }
  #logos {
    position: fixed;
    top: 0%;
    left: 0%;
    z-index: 2;
    background-color: #0c275c;
    padding: 2%;
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row-reverse;
    align-items: flex-end;
    justify-content: flex-start;
  }
  .logo {
    max-width: 100%;
    height: 8vh;
    margin-right: 4%;
  }
  #logo196 {
    margin-right: 0%;
  }

</style>