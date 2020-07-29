<template>
  <div>
    <div class="checkboxes__container">
      <CheckboxList
        class="checkboxes__list mb-12"
        ref="CheckboxMetricsList"
        @updateEnabledMetricNames="onUpdateEnabledVocabularyMetricNames"
      />
      <CheckboxList
        class="checkboxes__list mb-12"
        ref="CheckboxVocabulariesList"
        @updateEnabledMetricNames="onUpdateEnabledVocabularyNames"
      />
    </div>
    <div>
      <input class="mb-12" type="checkbox" v-model="onlyFirstVersions" /> Only first version
    </div>
    <div>
      <div v-for="(data, ind) in preparedData" :key="data[0]">
        <ScatterPoints
          v-if="ind < $store.state.graphCount"
          :data="data[1]"
          :name="data[0]"
          :scaleLabels="{x: 'date', y: data[0]}"
          :isDate="true"
          :a="A[ind]"
          :r="R[ind]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ScatterPoints from "@/components/chartsVUE/ScatterPoints";
import CheckboxList from "@/components/common/chartsComponents/CheckboxList";
import { VOCABULARY_SPECIAL_COLUMNS } from "@/CONSTANTS.js";

export default {
  name: "VocabularyLife",
  components: {
    ScatterPoints,
    CheckboxList
  },
  data() {
    return {
      vocabularyList: {},
      enabledVocabularyMetricNames: [],
      enabledVocabularyNames: [],
      onlyFirstVersions: false,
    };
  },
  computed: {
    preparedData() {
      return Object.entries(this.vocabularyList);
    },
    A() {
      return this.preparedData.map(el => {
        return this.getApprox(el[1].data)
      })
    },
    R() {
      return this.preparedData.map(el => {
        return this.getR(el[1].data)
      })
    },
  },
  watch: {
    onlyFirstVersions() {
      this.prepareData();
    },
    enabledVocabularyMetricNames() {
      this.prepareData();
    },
    enabledVocabularyNames() {
      this.prepareData();
    }
  },
  mounted() {
    this.$store.dispatch("fetchGraphCount", 5);
    this.prepareData();
    this.setCheckboxNames();
    this.setIsEnabledList();
  },
  methods: {
    getR(points) {
      const avg = [0, 0];
      let n = 0;
      Object.values(points).forEach(el => {
        avg[0] += +el.x;
        avg[1] += +el.y;
        n++;
      });
      avg[0] /= n;
      avg[1] /= n;
      let numerator = 0;
      let denominator = 0;
      let denominatorX = 0;
      let denominatorY = 0;
      Object.values(points).forEach(el => {
        numerator += (+el.x - avg[0]) * (+el.y - avg[1]);
        denominatorX += (+el.x - avg[0]) ** 2;
        denominatorY += (+el.y - avg[1]) ** 2;
      });
      denominator = Math.sqrt(denominatorX * denominatorY);
      return numerator / denominator;
    },
    getApprox(points) {
      let sumx = 0;
      let sumy = 0;
      let sumx2 = 0;
      let sumxy = 0;
      let n = points.length
      for (let i = 0; i < n; i++) {
        sumx += (points[i].x/31536000000);
        sumy += points[i].y;
        sumx2 += (points[i].x/31536000000) * (points[i].x/31536000000);
        sumxy += (points[i].x/31536000000) * points[i].y;
      }
      const a = (n*sumxy - (sumx*sumy)) / (n*sumx2 - sumx*sumx);
      return a
    },
    prepareData() {
      this.vocabularyList = new Object();
      const versions = {};
      Object.keys(this.$store.state.vocabularies[0]).forEach(metric => {
        if (!VOCABULARY_SPECIAL_COLUMNS.includes(metric)) {
          if (!this.enabledVocabularyMetricNames.includes(metric)) return;
          this.vocabularyList[metric] = {};
          this.vocabularyList[metric].data = [];
        }
      });
      this.$store.state.vocabularies.forEach(vocabulary => {
        if (
          this.onlyFirstVersions &&
          (!versions[vocabulary.name] ||
            vocabulary.version_name < versions[vocabulary.name])
        ) {
          versions[vocabulary.name] = vocabulary.version_name;
        }
      });
      this.$store.state.vocabularies.forEach(vocabulary => {
        if (!this.enabledVocabularyNames.includes(vocabulary.name)) return;
        if (
          this.onlyFirstVersions &&
          versions[vocabulary.name] !== vocabulary.version_name
        )
          return;
        Object.entries(vocabulary).forEach(metric => {
          if (!this.enabledVocabularyMetricNames.includes(metric[0])) return;
          const date = new Date(vocabulary.version_name).getTime();
          if (!VOCABULARY_SPECIAL_COLUMNS.includes(metric[0])) {
            this.vocabularyList[metric[0]].data.push({
              x: date,
              y: +metric[1]
            });
          }
        });
      });
    },
    onUpdateEnabledVocabularyMetricNames(enabledVocabularyMetricNames) {
      this.enabledVocabularyMetricNames = enabledVocabularyMetricNames;
      localStorage.setItem(
        "vocabularyMetrics_isEnabledList",
        JSON.stringify({ data: enabledVocabularyMetricNames })
      );
    },
    onUpdateEnabledVocabularyNames(enabledVocabularyNames) {
      this.enabledVocabularyNames = enabledVocabularyNames;
      localStorage.setItem(
        "vocabularyNames_isEnabledList",
        JSON.stringify({ data: enabledVocabularyNames })
      );
    },
    setIsEnabledList() {
      if (localStorage.getItem("vocabularyMetrics_isEnabledList") !== null) {
        let arr = JSON.parse(
          localStorage.getItem("vocabularyMetrics_isEnabledList")
        ).data;
        this.$store.state.vocabularyMetricNames.forEach(el => {
          if (arr.includes(el)) {
            this.$refs.CheckboxMetricsList.isEnabledList.push(true);
          } else {
            this.$refs.CheckboxMetricsList.isEnabledList.push(false);
          }
        });
        arr = JSON.parse(localStorage.getItem("vocabularyNames_isEnabledList"))
          .data;
        this.$store.state.vocabularyNames.forEach(el => {
          if (arr.includes(el)) {
            this.$refs.CheckboxVocabulariesList.isEnabledList.push(true);
          } else {
            this.$refs.CheckboxVocabulariesList.isEnabledList.push(false);
          }
        });
      } else {
        this.$store.state.vocabularyMetricNames.forEach(() => {
          this.$refs.CheckboxMetricsList.isEnabledList.push(true);
        });
        this.$store.state.vocabularyNames.forEach(() => {
          this.$refs.CheckboxVocabulariesList.isEnabledList.push(true);
        });
      }
    },
    setCheckboxNames() {
      this.$refs.CheckboxMetricsList.checkboxNames = this.$store.state.vocabularyMetricNames;
      this.$refs.CheckboxVocabulariesList.checkboxNames = this.$store.state.vocabularyNames;
    }
  }
};
</script>

