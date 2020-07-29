<template>
  <div class="main_settings">
    <div class="hide_btn" @click="isHidden=!isHidden">{{ isHidden ? "show settings ∨" : "hide ∧"}}</div>
    <div class="main_settings__content" v-show="!isHidden">
      <div>
        <div class="mb-12">
          <span class="title-1">Settings</span>
        </div>
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
        <div class="main_settings__checkboxes mb-12">
          <input type="checkbox" v-model="checkboxLegend" /> Legend
          <input type="checkbox" v-model="checkboxChartMetrics" /> Average Metrics
        </div>
        <hr class="mb-12" />
        <div class="main_settings__checkboxes mb-12">
          <span class="mr-12">Sigma coefficient |</span>
          <input class="mr-12" type="number" v-model="sigmaMult" />
        </div>
        <hr class="mb-12" />
        <div class="mb-12">
          <span class="mr-12">Versions Number |</span>
          <span class="mr-12">Min</span>
          <input
            class="mr-12"
            type="number"
            v-model="minVersion"
            @keypress.enter="confirmVersionNumber"
          />
          <span class="mr-12">Max</span>
          <input
            class="mr-12"
            type="number"
            v-model="maxVersion"
            @keypress.enter="confirmVersionNumber"
          />
        </div>
        <div class="mb-12">
          <span class="mr-12 pl-15">Incoming Links |</span>
          <span class="mr-12">Min</span>
          <input
            class="mr-12"
            type="number"
            v-model="incomingLinks.min"
            @keypress.enter="confirmVersionNumber"
          />
          <span class="mr-12">Max</span>
          <input
            class="mr-12"
            type="number"
            v-model="incomingLinks.max"
            @keypress.enter="confirmVersionNumber"
          />
        </div>
        <div class="mb-12">
          <span class="mr-12 pl-15">Outgoing Links |</span>
          <span class="mr-12">Min</span>
          <input
            class="mr-12"
            type="number"
            v-model="outgoingLinks.min"
            @keypress.enter="confirmVersionNumber"
          />
          <span class="mr-12">Max</span>
          <input
            class="mr-12"
            type="number"
            v-model="outgoingLinks.max"
            @keypress.enter="confirmVersionNumber"
          />
        </div>
        <div class="mb-12">
          <span
            class="mr-12 pl-57"
            title="All vocabularies born before Min and after Max year are not displayed"
          >Years of Life* |</span>
          <span class="mr-12">Min</span>
          <input
            class="mr-12 years"
            v-model="yearsOfLife.min"
            @keypress.enter="confirmVersionNumber"
          />
          <span class="mr-12">Max</span>
          <input
            class="mr-12 years"
            v-model="yearsOfLife.max"
            @keypress.enter="confirmVersionNumber"
          />
        </div>
        <div class="mb-12 pr-13">
          <span
            class="mr-12"
            title="All vocabularies born before Min and after Max year are not displayed"
          >Time between versions |</span>
          <span class="mr-12">Min</span>
          <input
            class="mr-12 years"
            v-model="betweenVersionsTime"
            @keypress.enter="confirmVersionNumber"
          />
          <span class="mr-12">Max</span>
          <input disabled class="mr-12 years" />
        </div>
        <div class="mb-12">
          <button @click="confirmVersionNumber">Confirm</button>
        </div>
        <hr class="mb-12" />
        <div @click="copyToClipboard" class="btn_copy" :class="copied && 'btn_copy--copied'">
          <span>{{ copied ? "Copied" : "Copy All to Clipboard" }}</span>
        </div>
        <div @click="pasteFromClipboard" class="btn_paste">
          <span>Paste from Clipboard</span>
        </div>
        <div @click="returnToDefault" class="btn_return">
          <span>Return to Default Settings</span>
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
    VueSlider,
  },
  data() {
    return {
      minVersion: 1,
      maxVersion: 1000,
      sigmaMult: 2,
      betweenVersionsTime: "0000-00-00",
      sliderBackground: 0,
      sliderLine: 0,
      sliderLineWidth: 30,
      checkboxLegend: true,
      checkboxChartMetrics: true,
      isHidden: true,
      copied: false,
      incomingLinks: {
        min: 0,
        max: 1000,
      },
      outgoingLinks: {
        min: 0,
        max: 1000,
      },
      yearsOfLife: {
        min: "1970-01-01",
        max: "2030-01-01",
      },
    };
  },
  props: ["currentPageID"],
  watch: {
    sigmaMult(v) {
      this.$store.dispatch("fetchSigmaMult", v);
      if (v !== undefined) localStorage.setItem("sigmaMult", v);
    },
    sliderLine(v) {
      clearTimeout(this.sliderLineTimer);
      this.timer = setTimeout(() => {
        localStorage.setItem(this.currentPageID + "sliderLine", v);
        const n = Math.ceil((v * 255) / 100).toString(16);
        const n1 = Math.ceil((this.sliderBackground * 255) / 100).toString(16);
        this.$store.dispatch("fetchTransparency", {
          line: (n.length === 1 ? "0" : "") + n,
          background: (n1.length === 1 ? "0" : "") + n1,
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
          background: (n.length === 1 ? "0" : "") + n,
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
    },
  },
  mounted() {
    this.minVersion = this.$store.state.minVersion;
    this.maxVersion = this.$store.state.maxVersion;
    this.sigmaMult = this.$store.state.sigmaMult;
    this.betweenVersionsTime = this.$store.state.betweenVersionsTime;
    this.incomingLinks = this.$store.state.incomingLinks;
    this.outgoingLinks = this.$store.state.outgoingLinks;
    this.yearsOfLife = this.$store.state.yearsOfLife;
    this.calc();
  },
  methods: {
    returnToDefault() {
      localStorage.clear();
      document.location.reload(true);
    },
    copyToClipboard() {
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 1500);

      const localStor = {};
      Object.entries(localStorage).forEach((item) => {
        localStor[item[0]] = item[1];
      });

      this.$clipboard(JSON.stringify(localStor, null, 2));
    },
    pasteFromClipboard() {
      navigator.clipboard.readText().then((data) => {
        Object.entries(JSON.parse(data)).forEach((item) => {
          localStorage.setItem(item[0], item[1]);
        });
        document.location.reload(true);
      });
    },
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
        typeof JSON.parse(
          localStorage.getItem(this.currentPageID + "sliderLine")
        ) === "number"
          ? JSON.parse(localStorage.getItem(this.currentPageID + "sliderLine"))
          : Math.ceil(
              (parseInt(this.$store.state.transparency.line, 16) * 100) / 255
            );
      this.sliderBackground =
        typeof JSON.parse(
          localStorage.getItem(this.currentPageID + "sliderBackground")
        ) === "number"
          ? JSON.parse(
              localStorage.getItem(this.currentPageID + "sliderBackground")
            )
          : Math.ceil(
              (parseInt(this.$store.state.transparency.background, 16) * 100) /
                255
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
      if (this.incomingLinks.min > this.incomingLinks.max) {
        this.$emit("callError", "Max >= Min. Think about it");
        return;
      }
      if (this.outgoingLinks.min > this.outgoingLinks.max) {
        this.$emit("callError", "Max >= Min. Think about it");
        return;
      }
      if (this.yearsOfLife.min > this.yearsOfLife.max) {
        this.$emit("callError", "Max >= Min. Think about it");
        return;
      }
      if (this.betweenVersionsTime.length !== 10) {
        this.$emit("callError", "Mistake in Time between versions");
        return;
      }
      if (
        this.yearsOfLife.min.length !== 10 ||
        this.yearsOfLife.max.length !== 10
      ) {
        this.$emit("callError", "Mistake in Years of Life");
        return;
      }
      this.$emit("callError", "");
      this.$emit(
        "fetchClasses",
        this.minVersion,
        this.maxVersion,
        this.incomingLinks,
        this.outgoingLinks,
        this.yearsOfLife,
        this.betweenVersionsTime
      );
      this.$emit(
        "fetchVocabularies",
        this.minVersion,
        this.maxVersion,
        this.incomingLinks,
        this.outgoingLinks,
        this.yearsOfLife,
        this.betweenVersionsTime
      );
    },
  },
};
</script>

<style scoped type="scss" lang="scss">
input {
  width: 55px;
}
.years {
  width: 70px;
}
button {
  padding: 8px 32px;
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
.btn_copy {
  background-color: rgba(92, 214, 255, 0.5);
  display: inline-block;
  padding: 12px;
  margin-top: 8px;
  margin-bottom: 12px;
  margin-right: 12px;
  cursor: pointer;
  &--copied {
    background-color: rgba(128, 255, 156, 0.5);
  }
}
.btn_paste {
  background-color: rgba(255, 179, 92, 0.5);
  display: inline-block;
  padding: 12px;
  margin-top: 8px;
  margin-bottom: 12px;
  margin-left: 12px;
  margin-right: 12px;
  cursor: pointer;
}
.btn_return {
  background-color: rgba(255, 92, 92, 0.5);
  display: inline-block;
  padding: 12px;
  margin-top: 8px;
  margin-bottom: 12px;
  margin-left: 12px;
  cursor: pointer;
}
hr {
  border: none;
  background-color: #00000040;
  height: 1px;
}
.pl-15 {
  padding-left: 16px;
}
.pl-57 {
  padding-left: 57px;
}
.pr-13 {
  padding-right: 13px;
}
</style>