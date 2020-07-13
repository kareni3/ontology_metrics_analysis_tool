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
      <div v-for="(data, ind) in preparedData" :key="data[0]">
        <span class="mr-12 pointer title-1 unselect" @click="prevDate">Prev</span>
        <span class="mr-12 title-2">from 2000-01-01 to {{ currentDate }}</span>
        <span class="pointer title-1 unselect" @click="nextDate">Next</span>
        <div>
          <span class="pointer title-1 unselect" @click="playAnimation">PLAY</span>
        </div>
        <ScatterPoints
          v-if="ind < $store.state.graphCount"
          :isLife="true"
          :data="data[1]"
          :name="data[0]"
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
  name: "VocabularyThroughTime",
  components: {
    ScatterPoints,
    CheckboxList
  },
  data() {
    return {
      vocabularyList: {},
      enabledVocabularyMetricNames: [],
      enabledVocabularyNames: [],
      currentDate: ""
    };
  },
  computed: {
    preparedData() {
      if (!this.currentDate) return [];
      return Object.entries(this.vocabularyList[this.currentDate]);
    }
  },
  watch: {
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
    this.currentDate = Object.keys(this.vocabularyList)[
      Object.keys(this.vocabularyList).length - 1
    ];
  },
  methods: {
    playAnimation() {
      clearInterval(this.interval);
      let i = 0;
      this.$nextTick(() => {
        this.interval = setInterval(() => {
          this.currentDate = Object.keys(this.vocabularyList)[i];
          i++;
          if ( i === Object.keys(this.vocabularyList).length ) {
            clearInterval(this.interval);
            return;
          }
        }, 1000 / 3);
      });
    },
    nextDate() {
      if (
        Object.keys(this.vocabularyList).indexOf(this.currentDate) + 1 ===
        Object.keys(this.vocabularyList).length
      )
        return;
      this.currentDate = Object.keys(this.vocabularyList)[
        Object.keys(this.vocabularyList).indexOf(this.currentDate) + 1
      ];
    },
    prevDate() {
      if (Object.keys(this.vocabularyList).indexOf(this.currentDate) - 1 === -1)
        return;
      this.currentDate = Object.keys(this.vocabularyList)[
        Object.keys(this.vocabularyList).indexOf(this.currentDate) - 1
      ];
    },
    prepareData() {
      this.vocabularyList = new Object();
      const vocabularyBirthdaysList = {};
      for (let i = 1; i <= 20; i++) {
        for (let j = 1; j <= 4; j++) {
          let yy = i;
          let mm = j * 3;
          if (yy < 10) yy = "0" + yy;
          if (mm < 10) mm = "0" + mm;
          this.vocabularyList[`20${yy}-${mm}-01`] = {};
        }
      }
      Object.keys(this.$store.state.vocabularies[0]).forEach(metric => {
        if (!VOCABULARY_SPECIAL_COLUMNS.includes(metric)) {
          if (!this.enabledVocabularyMetricNames.includes(metric)) return;
          Object.keys(this.vocabularyList).forEach(year => {
            this.vocabularyList[year][metric] = {};
          });
        }
      });
      this.$store.state.vocabularies.forEach(vocabulary => {
        if (!this.enabledVocabularyNames.includes(vocabulary.name)) return;
        Object.entries(vocabulary).forEach(metric => {
          if (!this.enabledVocabularyMetricNames.includes(metric[0])) return;
          const date = new Date(vocabulary.version_name).getTime();
          if (!vocabularyBirthdaysList[vocabulary.name]) {
            vocabularyBirthdaysList[vocabulary.name] = date;
          }
          if (!VOCABULARY_SPECIAL_COLUMNS.includes(metric[0])) {
            Object.keys(this.vocabularyList).forEach(year => {
              if (vocabulary.version_name < year) {
                this.vocabularyList[year][metric[0]][vocabulary.name] = [
                  {
                    x: date - vocabularyBirthdaysList[vocabulary.name],
                    y: +metric[1]
                  }
                ];
                return true;
              } else if (
                !this.vocabularyList[year][metric[0]][vocabulary.name]
              ) {
                this.vocabularyList[year][metric[0]][vocabulary.name] = [
                  {
                    x: 0,
                    y: 0
                  }
                ];
                return true;
              }
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

