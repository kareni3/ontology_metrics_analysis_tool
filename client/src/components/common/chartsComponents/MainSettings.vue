<template>
  <div class="main_settings">
    <div class="hide_btn" @click="isHidden=!isHidden">{{ isHidden ? "show settings ∨" : "hide ∧"}}</div>
    <div class="main_settings__content" v-show="!isHidden">
      <div class="mb-12">
        <span class="mr-12">Min number of versions</span>
        <input
          class="mr-12"
          type="number"
          v-model="minVersion"
          @keypress.enter="confirmVersionNumber"
        />
        <span class="mr-12">Max number of versions</span>
        <input
          class="mr-12"
          type="number"
          v-model="maxVersion"
          @keypress.enter="confirmVersionNumber"
        />
      </div>
      <div class="mb-12">
        <button @click="confirmVersionNumber">Confirm Number of Versions</button>
      </div>
      <div>
        <div class="vslider__container mb-12">
          <span>Background transparency</span>
          <vue-slider class="vslider" v-model="sliderBackground" />
        </div>
        <div class="vslider__container mb-12">
          <span>Line transparency</span>
          <vue-slider class="vslider" v-model="sliderLine" />
        </div>
        <div class="vslider__container mb-12">
          <span>Line width</span>
          <vue-slider class="vslider" v-model="sliderLineWidth" />
        </div>
        <div class="main_settings__checkboxes">
          <input type="checkbox" v-model="checkboxLegend" /> Legend
          <input type="checkbox" v-model="checkboxChartMetrics" /> Average Metrics
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";

export default {
  name: "MainSettings",
  components: {
    VueSlider
  },
  data() {
    return {
      minVersion: 1,
      maxVersion: 1000,
      sliderBackground: 0,
      sliderLine: 0,
      sliderLineWidth: 30,
      checkboxLegend: true,
      checkboxChartMetrics: true,
      isHidden: true
    };
  },
  props: ["currentPageID"],
  watch: {
    sliderLine(v) {
      clearTimeout(this.sliderLineTimer);
      this.timer = setTimeout(() => {
        localStorage.setItem(this.currentPageID + "sliderLine", v);
        const n = Math.ceil((v * 255) / 100).toString(16);
        const n1 = Math.ceil((this.sliderBackground * 255) / 100).toString(16);
        this.$store.dispatch("fetchTransparency", {
          line: (n.length === 1 ? "0" : "") + n,
          background: (n1.length === 1 ? "0" : "") + n1
        });
      }, 500);
    },
    sliderBackground(v) {
      clearTimeout(this.sliderBackgroundTimer);
      this.timer = setTimeout(() => {
        if (v !== null)
          localStorage.setItem(this.currentPageID + "sliderBackground", v);
        const n = Math.ceil((v * 255) / 100).toString(16);
        const n1 = Math.ceil((this.sliderLine * 255) / 100).toString(16);
        this.$store.dispatch("fetchTransparency", {
          line: (n1.length === 1 ? "0" : "") + n1,
          background: (n.length === 1 ? "0" : "") + n
        });
      }, 500);
    },
    sliderLineWidth(v) {
      clearTimeout(this.sliderLineWidthTimer);
      this.timer = setTimeout(() => {
        if (v !== null)
          localStorage.setItem(this.currentPageID + "sliderLineWidth", v);
        const n = Math.ceil(v / 10);
        this.$store.dispatch("fetchLineWidth", n);
      }, 500);
    },
    checkboxLegend(v) {
      if (v !== null)
        localStorage.setItem(this.currentPageID + "checkboxLegend", v);
      this.$store.dispatch("fetchLegend", v);
    },
    checkboxChartMetrics(v) {
      if (v !== null)
        localStorage.setItem(this.currentPageID + "checkboxChartMetrics", v);
      this.$store.dispatch("fetchAverageMetrics", v);
    },
    currentPageID() {
      this.calc();
    }
  },
  mounted() {
    this.minVersion = this.$store.state.minVersion;
    this.maxVersion = this.$store.state.maxVersion;
    this.calc();
  },
  methods: {
    calc() {
      if (localStorage.getItem(this.currentPageID + "sliderLineWidth") !== null)
        this.sliderLineWidth = JSON.parse(
          localStorage.getItem(this.currentPageID + "sliderLineWidth")
        );
      if (localStorage.getItem(this.currentPageID + "checkboxLegend") !== null)
        this.checkboxLegend = JSON.parse(
          localStorage.getItem(this.currentPageID + "checkboxLegend")
        );
      if (
        localStorage.getItem(this.currentPageID + "checkboxChartMetrics") !==
        null
      )
        this.checkboxChartMetrics = JSON.parse(
          localStorage.getItem(this.currentPageID + "checkboxChartMetrics")
        );
      this.sliderLine =
        JSON.parse(localStorage.getItem(this.currentPageID + "sliderLine")) ||
        Math.ceil(
          (parseInt(this.$store.state.transparency.line, 16) * 100) / 255
        );
      this.sliderBackground =
        JSON.parse(
          localStorage.getItem(this.currentPageID + "sliderBackground")
        ) ||
        Math.ceil(
          (parseInt(this.$store.state.transparency.background, 16) * 100) / 255
        );
    },
    confirmVersionNumber() {
      if (this.minVersion === "" || this.minVersion < 1) {
        this.$emit("callError", "Error of minimum number of versions value");
        return;
      }
      if (this.minVersion > this.maxVersion) {
        this.$emit("callError", "Max >= Min. Think about it");
        return;
      }
      this.$emit("callError", "");
      this.$emit("fetchClasses", this.minVersion, this.maxVersion);
      this.$emit("fetchVocabularies", this.minVersion, this.maxVersion);
    }
  }
};
</script>

<style scoped type="scss" lang="scss">
input {
  width: 40px;
}
.main_settings {
  &__content {
    background-color: white;
    border: 1px solid dodgerblue;
    border-radius: 4px;
    padding: 12px;
    max-height: 250px;
    overflow: auto;
  }
}
</style>