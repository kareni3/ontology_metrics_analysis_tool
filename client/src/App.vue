<template>
  <div id="app" v-if="isReady">
    <div class="error_message" v-if="error">
      <span>{{error}}</span>
    </div>
    <div class="nav mb-12">
      <span
        class="nav__page"
        v-for="name in pageNames"
        :key="name"
        @click="changePage(name)"
      >| {{ name }} |</span>
    </div>
    <Charts v-if="currentPageName === pageNames[0]" />
    <Graphs v-else-if="currentPageName === pageNames[1]" />
    <Diferences v-else-if="currentPageName === pageNames[2]" />
    <RadarMetrics v-else-if="currentPageName === pageNames[3]" />
    <LinksMetrics v-else-if="currentPageName === pageNames[4]" />
    <VocabularyLife v-else-if="currentPageName === pageNames[5]" />
    <MainSettings
      class="mb-12 main_settings"
      :currentPageID="pageNames.indexOf(currentPageName)"
      @callError="error = arguments[0]"
      @fetchClasses="fetchClasses"
      @fetchVocabularies="fetchVocabularies"
    />
  </div>
</template>

<script>
import Charts from "./components/pages/classes/Classes";
import Graphs from "./components/pages/vocabularyMetrics/VocabularyMetricsContainer";
import Diferences from "./components/pages/vocabularies/VocabulariesContainer";
import RadarMetrics from "./components/pages/radarMetrics/RadarMetricsContainer";
import MainSettings from "./components/common/chartsComponents/MainSettings";
import LinksMetrics from "./components/pages/linksMetrics/LinksMetricsContainer";
import VocabularyLife from "./components/pages/vocabularyLife/VocabularyLifeContainer";

export default {
  name: "App",
  components: {
    Charts,
    Graphs,
    Diferences,
    MainSettings,
    RadarMetrics,
    LinksMetrics,
    VocabularyLife
  },
  data() {
    return {
      pageNames: [
        "class metrics",
        "vocabulary metrics",
        "vocabularies differences",
        "metrics on radar chart",
        "links metrics",
        "vocabulary life"
      ],
      currentPageName: null,
      error: "",
      isReady: false
    };
  },
  watch: {
    currentPageName(v) {
      localStorage.setItem("currentPageName", v);
    },
    "$store.state.minVersion"(v) {
      if (v !== undefined) localStorage.setItem("minVersion", v);
    },
    "$store.state.maxVersion"(v) {
      if (v !== undefined) localStorage.setItem("maxVersion", v);
    }
  },
  async beforeMount() {
    this.setLocalsorage();
    this.currentPageName =
      localStorage.getItem("currentPageName") || this.pageNames[0];
    const minVersion =
      JSON.parse(localStorage.getItem("minVersion")) || undefined;
    const maxVersion =
      JSON.parse(localStorage.getItem("maxVersion")) || undefined;
    await this.fetchClasses(minVersion, maxVersion);
    await this.fetchVocabularies(minVersion, maxVersion);
    this.isReady = true;
  },
  mounted() {
    window.onscroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        this.$store.dispatch(
          "fetchGraphCount",
          this.$store.state.graphCount + 5
        );
      }
    };
  },
  methods: {
    setLocalsorage() {
      if (localStorage.getItem(0 + "sliderLineWidth") === null) {
        localStorage.setItem(0 + "sliderLineWidth", 5);
        localStorage.setItem(0 + "sliderBackground", 25);
        localStorage.setItem(0 + "sliderLine", 70);

        localStorage.setItem(1 + "sliderLineWidth", 15);
        localStorage.setItem(1 + "sliderBackground", 25);
        localStorage.setItem(1 + "sliderLine", 70);

        localStorage.setItem(2 + "sliderLineWidth", 5);
        localStorage.setItem(2 + "sliderBackground", 25);
        localStorage.setItem(2 + "sliderLine", 70);

        localStorage.setItem(3 + "sliderLineWidth", 0);
        localStorage.setItem(3 + "sliderBackground", 12);
        localStorage.setItem(3 + "sliderLine", 0);
      }
    },
    changePage(page) {
      this.currentPageName = page;
    },
    async fetchClasses(minVersion, maxVersion) {
      await this.$store.dispatch("fetchClasses", {minVersion, maxVersion});
    },
    async fetchVocabularies(minVersion, maxVersion) {
      let currentPageName = this.currentPageName;
      this.currentPageName = "";
      await this.$store.dispatch("fetchVocabularies", {minVersion, maxVersion});
      this.$nextTick(() => {
        this.currentPageName = currentPageName;
      });
    }
  }
};
</script>

<style lang="scss">
@import "assets/scss/global.scss";
</style>
<style scoped lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 32px;
}
.nav {
  &__page {
    cursor: pointer;
  }
}
.error_message {
  background-color: darksalmon;
  padding: 8px;
}
.main_settings {
  width: 60%;
  margin: auto;
  position: fixed;
  top: 0;
  transform: translateX(-50%);
  left: 50%;
  &__container {
    width: 100%;
    position: fixed;
    top: 0;
  }
}
</style>
