<template>
  <div>
    <div class="checkboxes__container">
      <CheckboxList
        class="checkboxes__list mb-12"
        ref="CheckboxVocabulariesList"
        @updateEnabledMetricNames="onUpdateEnabledVocabularyNames"
      />
      <v-select
        class="selector mr-12 mb-12"
        placeholder="Choose X-Axis"
        v-model="selectedMetricX"
        :options="$store.state.vocabularyMetricNames"
      ></v-select>
      <v-select
        class="selector ml-12 mb-12"
        placeholder="Choose Y-Axis"
        v-model="selectedMetricY"
        :options="$store.state.vocabularyMetricNames"
      ></v-select>
      <div class="mb-12 mr-12 metricMinMax__conatiner">
        <span class="mr-12">Min</span>
        <input class="mr-12 metricMinMax" v-model="metricX.min" @keypress.enter="confirmMinMax" />
        <span class="mr-12">Max</span>
        <input class="mr-12 metricMinMax" v-model="metricX.max" @keypress.enter="confirmMinMax" />
      </div>
      <div class="ml-12 mb-12 metricMinMax__conatiner">
        <span class="mr-12">Min</span>
        <input class="mr-12 metricMinMax" v-model="metricY.min" @keypress.enter="confirmMinMax" />
        <span class="mr-12">Max</span>
        <input class="mr-12 metricMinMax" v-model="metricY.max" @keypress.enter="confirmMinMax" />
        <button class="metricBtn" @click="confirmMinMax">Confirm</button>
      </div>
      <input class="checkbox" type="checkbox" v-model="isOnlyLastVersion" /> Only Last Version
    </div>
    <div>
      Pearson correlation coefficient:
      <strong v-if="r">{{r.toFixed(3)}}</strong>
      <span class="pointer btn" @click="openDialog">Open List of all coefficients</span>
    </div>
    <div>
      <ScatterPoints v-if="Object.values(vocabularyList).length" :data="vocabularyList" />
    </div>
    <div v-show="dialog" class="dialog">
      <div>
        <span @click="closeDialog" class="close">x</span>
        <v-select
          class="selector mr-12 mb-12"
          v-if="R.length !== 0"
          placeholder="Choose Metric"
          v-model="selectedMetricForPearson"
          :options="$store.state.vocabularyMetricNames"
        ></v-select>
        <div class="item" v-for="(r) in computedR" :key="r.m1+r.m2">
          <span class="left">{{r.m1}} / {{r.m2}}:</span>
          <strong
            class="right"
            :style="'color:rgb('+(180-Math.ceil(Math.abs(r.r)*255))+','+(Math.ceil(Math.abs(r.r)*255*0.6))+',0)'"
          >{{r.r.toFixed(3)}}</strong>
        </div>
        <div class="stand_by" v-if="R.length === 0">Please, stand by... I am thinking</div>
        <div class="pointer show_more" v-else @click="maxInd+=50">Show More</div>
      </div>
    </div>
  </div>
</template>

<script>
import ScatterPoints from "@/components/chartsVUE/ScatterPoints";
import CheckboxList from "@/components/common/chartsComponents/CheckboxList";
import { VOCABULARY_SPECIAL_COLUMNS } from "@/CONSTANTS.js";

export default {
  name: "MetricsDependency",
  components: {
    ScatterPoints,
    CheckboxList
  },
  data() {
    return {
      vocabularyList: {},
      enabledVocabularyNames: [],
      selectedMetricX: "",
      selectedMetricY: "",
      selectedMetricForPearson: "",
      dialog: false,
      maxInd: 50,
      metricX: {
        min: 0,
        max: 100000
      },
      R: [],
      metricY: {
        min: 0,
        max: 100000
      },
      confirmedMetricX: {
        min: 0,
        max: 100000
      },
      confirmedMetricY: {
        min: 0,
        max: 100000
      },
      isOnlyLastVersion: false
    };
  },
  watch: {
    selectedMetricForPearson() {
      this.R = [];
      setTimeout(() => {
        this.calcR();
      }, 200);
    },
    dialog(v) {
      if (v && this.R.length === 0) {
        this.enabledVocabularyNamesUpdated = false;
        setTimeout(() => {
          this.calcR();
        }, 200);
      }
    },
    enabledVocabularyNames() {
      if (this.selectedMetricY && this.selectedMetricX) {
        this.prepareData();
      }
      this.R = [];
    },
    selectedMetricX(v) {
      if (this.selectedMetricY) {
        this.prepareData();
      }
      localStorage.setItem("MetricsDependency_selectedMetricX", v);
    },
    selectedMetricY(v) {
      if (this.selectedMetricX) {
        this.prepareData();
      }
      localStorage.setItem("MetricsDependency_selectedMetricY", v);
    },
    isOnlyLastVersion() {
      if (this.selectedMetricY && this.selectedMetricX) {
        this.prepareData();
      }
    }
  },
  computed: {
    computedR() {
      return this.R.filter((el, ind) => ind < this.maxInd);
    },
    r() {
      if (!this.selectedMetricX || !this.selectedMetricY) return null;
      const avg = [0, 0];
      let n = 0;
      Object.values(this.vocabularyList).forEach(el => {
        avg[0] += +el[0].x;
        avg[1] += +el[0].y;
        n++;
      });
      avg[0] /= n;
      avg[1] /= n;
      let numerator = 0;
      let denominator = 0;
      let denominatorX = 0;
      let denominatorY = 0;
      Object.values(this.vocabularyList).forEach(el => {
        numerator += (+el[0].x - avg[0]) * (+el[0].y - avg[1]);
        denominatorX += (+el[0].x - avg[0]) ** 2;
        denominatorY += (+el[0].y - avg[1]) ** 2;
      });
      denominator = Math.sqrt(denominatorX * denominatorY);
      return numerator / denominator;
    }
  },
  mounted() {
    this.$store.dispatch("fetchGraphCount", 5);
    this.setCheckboxNames();
    this.setIsEnabledList();
    if (this.selectedMetricY && this.selectedMetricX) {
      this.prepareData();
    }
  },
  methods: {
    closeDialog() {
      this.dialog = false;
    },
    openDialog() {
      this.dialog = true;
    },
    confirmMinMax() {
      this.confirmedMetricX = this.metricX;
      this.confirmedMetricY = this.metricY;
      this.prepareData();
    },
    calcR() {
      this.R = [];
      const vList = new Object();
      this.$store.state.vocabularies.forEach(vocabulary => {
        if (!this.enabledVocabularyNames.includes(vocabulary.name)) return;
        Object.entries(vocabulary).forEach(v1 => {
          Object.entries(vocabulary).forEach(v2 => {
            if (v1[0] === v2[0]) return;
            if (VOCABULARY_SPECIAL_COLUMNS.includes(v1[0])) return;
            if (VOCABULARY_SPECIAL_COLUMNS.includes(v2[0])) return;
            if (this.selectedMetricForPearson && v1[0] !== this.selectedMetricForPearson) return;
            if (isNaN(+v1[1])) return;
            if (isNaN(+v2[1])) return;
            const name = this.isOnlyLastVersion
              ? `${vocabulary.name}`
              : `${vocabulary.name} v${vocabulary.version_name}`;
            if (!vList[v1[0] + "&&" + v2[0]]) vList[v1[0] + "&&" + v2[0]] = {};
            vList[v1[0] + "&&" + v2[0]][name] = [];
            vList[v1[0] + "&&" + v2[0]][name].push({
              x: v1[1],
              y: v2[1]
            });
          });
        });
      });
      Object.entries(vList).forEach(list => {
        const avg = [0, 0];
        let n = 0;
        Object.values(list[1]).forEach(el => {
          avg[0] += +el[0].x;
          avg[1] += +el[0].y;
          n++;
        });
        avg[0] /= n;
        avg[1] /= n;
        let numerator = 0;
        let denominator = 0;
        let denominatorX = 0;
        let denominatorY = 0;
        Object.values(list[1]).forEach(el => {
          numerator += (+el[0].x - avg[0]) * (+el[0].y - avg[1]);
          denominatorX += (+el[0].x - avg[0]) ** 2;
          denominatorY += (+el[0].y - avg[1]) ** 2;
        });
        denominator = Math.sqrt(denominatorX * denominatorY);
        if (isNaN(numerator / denominator)) return;
        this.R.push({
          r: numerator / denominator,
          m1: list[0].slice(0, list[0].indexOf("&&")),
          m2: list[0].slice(list[0].indexOf("&&") + 2)
        });
      });
      this.R.sort((a, b) => Math.abs(b.r) - Math.abs(a.r));
    },
    prepareData() {
      this.vocabularyList = new Object();
      this.$store.state.vocabularies.forEach(vocabulary => {
        if (!this.enabledVocabularyNames.includes(vocabulary.name)) return;
        if (
          +vocabulary[this.selectedMetricX] > +this.confirmedMetricX.max ||
          +vocabulary[this.selectedMetricX] < +this.confirmedMetricX.min ||
          +vocabulary[this.selectedMetricY] > +this.confirmedMetricY.max ||
          +vocabulary[this.selectedMetricY] < +this.confirmedMetricY.min
        ) {
          return;
        }
        const name = this.isOnlyLastVersion
          ? `${vocabulary.name}`
          : `${vocabulary.name} v${vocabulary.version_name}`;
        this.vocabularyList[name] = [];
        this.vocabularyList[name].push({
          x: vocabulary[this.selectedMetricX],
          y: vocabulary[this.selectedMetricY]
        });
      });
    },
    onUpdateEnabledVocabularyNames(enabledVocabularyNames) {
      this.enabledVocabularyNames = enabledVocabularyNames;
      localStorage.setItem(
        "vocabularyNames_isEnabledList",
        JSON.stringify({ data: enabledVocabularyNames })
      );
    },
    setIsEnabledList() {
      if (localStorage.getItem("vocabularyNames_isEnabledList") !== null) {
        let arr = JSON.parse(
          localStorage.getItem("vocabularyNames_isEnabledList")
        ).data;
        this.$store.state.vocabularyNames.forEach(el => {
          if (arr.includes(el)) {
            this.$refs.CheckboxVocabulariesList.isEnabledList.push(true);
          } else {
            this.$refs.CheckboxVocabulariesList.isEnabledList.push(false);
          }
        });
      } else {
        this.$store.state.vocabularyNames.forEach(() => {
          this.$refs.CheckboxVocabulariesList.isEnabledList.push(true);
        });
      }
      if (localStorage.getItem("MetricsDependency_selectedMetricX") !== null) {
        this.selectedMetricX = localStorage.getItem(
          "MetricsDependency_selectedMetricX"
        );
      }
      if (localStorage.getItem("MetricsDependency_selectedMetricY") !== null) {
        this.selectedMetricY = localStorage.getItem(
          "MetricsDependency_selectedMetricY"
        );
      }
    },
    setCheckboxNames() {
      this.$refs.CheckboxVocabulariesList.checkboxNames = this.$store.state.vocabularyNames;
    }
  }
};
</script>

<style scoped lang="scss">
.metricMinMax {
  width: 90px;
  &__conatiner {
    width: calc(50% - 12px);
    display: inline-block;
    position: relative;
  }
}
.metricBtn {
  right: 0;
  padding: 6px 24px;
  position: absolute;
}
.btn {
  border: 1px solid #00000040;
  border-radius: 0.5rem;
  padding: 2px 4px;
  background-color: rgba(139, 188, 228, 0.4);
  margin-left: 12px;
}
.dialog {
  & > div {
    padding: 48px;
    text-align: left;
  }
  .item {
    max-width: 900px;
    margin: auto;
    padding: 6px 0;
    height: auto;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #00000020;
  }
  .show_more {
    font-size: 1.3rem;
    padding: 12px;
    justify-content: center;
    text-align: center;
  }
  .stand_by {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
  }
}
</style>