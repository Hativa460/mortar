<template>
    <div id="main-page">
        <div id="hamburger-menu" @click="toggleNav" v-if="openNav===false && currPage>=0">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
        </div>
        <nav-bar v-if="openNav === true && currPage>=0" @close-menu="toggleNav" @switchPage="switchPage" :currPage="currPage"></nav-bar>
        <!-- <pick-hativa v-if="currPage === -1" @next-page="pickHativa"></pick-hativa> -->
        <defenition v-if="currPage === 0 && !openNav" :pageNum="currPage" @next-page="nextPage"></defenition>
        <ranging v-if="currPage === 1 && !openNav" :pageNum="currPage" :hativaNum="chosenHativa" @next-page="nextPage"></ranging>
        <corrections v-if="currPage === 2 && !openNav" :key="currPage" :pageNum="currPage" :hativaNum="chosenHativa" @next-page="nextPage"></corrections>
        <corrections v-if="currPage === 3 && !openNav" :key="currPage" :pageNum="currPage" :hativaNum="chosenHativa" @next-page="nextPage"></corrections>
        <purpose v-if="currPage === 4 && !openNav" :pageNum="currPage" :hativaNum="chosenHativa" @next-page="nextPage"></purpose>
        <test  v-if="currPage === 5 && !openNav" :pageNum="currPage"@next-page="nextPage"></test>
        <graded-test v-if="currPage === 6 && !openNav" :pageNum="currPage"  @finish-main="finishMain"> </graded-test>
        <!-- <test  v-if="currPage === 5 && !openNav" :pageNum="currPage" @finish-main="finishMain"></test> -->
    </div>
</template>

<script>
import NavBar from '@/components/NavBar';
import PickHativa from '@/components/PickHativa';
import Defenition from '@/components/Defenition';
import Ranging from '@/components/Ranging';
import Corrections from '@/components/Corrections';
import Purpose from '@/components/Purpose';
import Test from '@/components/Test.vue';
import GradedTest from "@/components/GradedTest.vue";
export default {
    name: "main-page",
    props: [],
    data() {
        return {
            openNav : false,
            currPage : 0,
            chosenHativa: "7",
            grade: 0
        }
    },
    methods: {
        toggleNav() {
            this.openNav = !this.openNav;
        },
        nextPage() {
            this.currPage ++;
        },
        pickHativa(chosenHativa) {
            this.currPage ++;
            this.chosenHativa = chosenHativa;
        },
        switchPage(index) {
            this.currPage = index;
            this.openNav = !this.openNav;
        },
        finishMain(finalGrade) {
            this.grade = finalGrade;
            this.$emit('next-page', this.grade);
        }
        },
    components: { 
        NavBar,
        PickHativa,
        Defenition,
        Ranging,
        Corrections,
        Purpose,
        Test,
        GradedTest
    }
}
</script>

<style scoped>
#hamburger-menu {
    position: fixed;
    top: 2%;
    right: 2%;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    z-index: 3;
  }
  .bar {
    background: #ff6100;
    border-radius: 0.5vw;
    height: 1vh;
    width: 10vw;
    margin: 5%;
  }
</style>