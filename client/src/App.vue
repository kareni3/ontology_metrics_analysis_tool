<template>
  <div id="app">
    <div class="zxc">
      <span @click="change(i)" v-for="(i,a) in dsa" :key="a" class="sfasa">| {{i}} |</span>
    </div>
    <Charts v-if="vocabularies && classes && mmm === dsa[0]" :classes="classes" :vocabularies="vocabularies" />
    <Graphs v-if="vocabularies && classes && mmm === dsa[1]" :vocabularies="vocabularies" />
    <Diferences v-if="vocabularies && classes && mmm === dsa[2]" :vocabularies="vocabularies" />
  </div>
</template>

<script>
import Charts from "./components/Charts.vue";
import Graphs from "./components/Graphs.vue";
import Diferences from "./components/Diferences.vue";
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      classes: null,
      vocabularies: null,
      dsa: ["class metrics", "vocabulary metrics", "vocabularies differences"],
      mmm: null
    };
  },
  components: {
    Charts,
    Graphs,
    Diferences,
  },
  beforeMount() {
    this.mmm = this.dsa[0];
  },
  mounted() {
    axios.get("http://127.0.0.1:3001/classes").then(response => {
      this.classes = response.data.classes;
    });
    axios.get("http://127.0.0.1:3001/vocabularies").then(response => {
      this.vocabularies = response.data.vocabularies;
    });
  },
  methods: {
    change(i) {
      this.mmm = i
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
.sfasa {
  cursor: pointer;
}
</style>
