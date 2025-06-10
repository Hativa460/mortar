<template>
    <div id="nav-bar">
        <div class="close" @click="closeMenu"></div>
        <div id="topics-container">
            <div v-for="(topic, index) in topics" :key="index" class="topic" :class="index === currPage ? 'currPage' : ''" @click="switchPage(index)">{{ topic }}</div>
        </div>
    </div>
</template>

<script>
import json from "../../text.json";

export default {
    name: "nav-bar",
    props: ["currPage"],
    data() {
        return {
            topics: json.navTopics,
            isClosed: false
        }
    },
    methods: {
        closeMenu() {
            this.$emit('close-menu');
        },
        switchPage(index) {
            this.$emit('switchPage', index);
        }
    }
}
</script>

<style scoped>
@keyframes moving {
   from {
    margin-right: -70vw;
   } 
   to {
    margin-right: 0px;
   } 
}
@-webkit-keyframes moving {
    from {
    margin-right: -70vw;
   } 
   to {
    margin-right: 0px;
   } 
}

@keyframes closeMenu {
    from {
        margin-right: 0px;
    }
    to {
        margin-right: -70vw;
    }
}
@-webkit-keyframes closeMenu {
    from {
        margin-right: 0px;
    }
    to {
        margin-right: -70vw;
    }
}

.closeMenu {
    background-color: black;
    /* animation: closeMenu 500ms ease-in-out;
    -webkit-animation: closeMenu 500ms ease-in-out; */
}

#nav-bar {
    position: absolute;
    right: 0px;
    top: 0px;
    margin: 0px;
    height: 100%;
    width: 75vw;
    z-index: 5;
    background-color: #ff6100;
    color: #0c275c;
    
    animation: moving 500ms ease-in-out;
    -webkit-animation: moving 500ms ease-in-out ;
}

.topic {
    margin-top: 20%;
    margin-right: 2%;
    font-size: 2.5rem;
    color: #0c275c;
    font-family: "yarden-light";
    font-weight: 500;
}

#topics-container {
    width: 72vw;
    margin-top: 20%;
}

.close {
  position: absolute;
  top: 2%;
  right: 2%;
  width: 10vw;
  height: 10vh;
  overflow: hidden;
  padding: 2%;

}

.close:before, .close:after {
  position: absolute;
  right: 5%;
  top: 20%;
  content: ' ';
  height: 1vh;
  width: 10vw;
  background-color: #0c275c;
  border-radius: 0.5vw;
}
.close:before {
  transform: rotate(45deg);
}
.close:after {
  transform: rotate(-45deg);
}
.currPage {
    font-family: "yarden";
    /* font-size: 7.2vw; */
}

</style>