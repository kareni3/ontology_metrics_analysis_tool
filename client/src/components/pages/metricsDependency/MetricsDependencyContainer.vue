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
      <ScatterPoints v-if="Object.values(vocabularyList).length" :data="vocabularyList" />
    </div>
  </div>
</template>

<script>
import ScatterPoints from "@/components/chartsVUE/ScatterPoints";
import CheckboxList from "@/components/common/chartsComponents/CheckboxList";

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
      metricX: {
        min: 0,
        max: 100000
      },
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
    enabledVocabularyNames() {
      if (this.selectedMetricY && this.selectedMetricX) {
        this.prepareData();
      }
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
  mounted() {
    this.$store.dispatch("fetchGraphCount", 5);
    this.setCheckboxNames();
    this.setIsEnabledList();
    if (this.selectedMetricY && this.selectedMetricX) {
      this.prepareData();
    }
  },
  methods: {
    confirmMinMax() {
      this.confirmedMetricX = this.metricX;
      this.confirmedMetricY = this.metricY;
      this.prepareData();
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
</style>