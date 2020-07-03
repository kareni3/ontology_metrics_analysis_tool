<template>
  <div id="app">
    <div v-if="error" class="zxc1">
      <span> {{error}} </span>
    </div>
    <div class="zxc">
      <span @click="change(i)" v-for="(i,a) in dsa" :key="a" class="sfasa">| {{i}} |</span>
    </div>
    <div class="aaa">
      minimum number of versions
      <input type="number" v-model="minVersion" @keypress.enter="confirmVersionNumber" />
      <button @click="confirmVersionNumber">Confim</button>
    </div>
    <Charts
      v-if="vocabularies && classes && mmm === dsa[0]"
      :classes="classes"
      :vocabularies="vocabularies"
    />
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
      mmm: null,
      minVersion: 1,
      error: "",
    };
  },
  components: {
    Charts,
    Graphs,
    Diferences
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
      this.mmm = i;
    },
    confirmVersionNumber() {
      const v = this.minVersion
      if (v === "" || v < 1) {
        this.error = "Error of minimum number of versions value"
        return
      }
      this.error = ""
      this.vocabularies = null
      this.classes = null
      axios.get("http://127.0.0.1:3001/classes?version_number="+this.minVersion).then(response => {
        this.classes = response.data.classes;
      });
      axios.get("http://127.0.0.1:3001/vocabularies?version_number="+this.minVersion).then(response => {
        this.vocabularies = response.data.vocabularies;
      });
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
  margin-top: 12px;
}
.sfasa {
  cursor: pointer;
}
input {
  width: 40px;
}
.aaa {
  margin-top: 12px;
}
.zxc1 {
  background-color: darksalmon;
  margin-bottom: 12px;
  padding: 8px;
}
</style>
