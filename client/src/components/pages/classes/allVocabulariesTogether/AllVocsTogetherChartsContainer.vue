<template>
  <div>
    <div class="block__scoped" v-for="metrics in Object.entries(classMetricsOnOneGraph)" :key="metrics[0]">
      <ChartClassForAllVocs :metrics="metrics[1].firstVersionList" :name="metrics[0]" label="First versions of vocabularies" />
      <ChartClassForAllVocs :metrics="metrics[1].lastVersionList" :name="metrics[0]" label="Last versions of vocabularies" />
    </div>
  </div>
</template>

<script>
import ChartClassForAllVocs from "./AllVocsTogetherSingleChart";
import { CLASS_SPECIAL_COLUMNS } from "@/CONSTANTS.js";

export default {
  name: "AllVocabulariesTogetherComponent",
  components: {
    ChartClassForAllVocs,
  },
  data() {
    return {
      classMetricsOnOneGraph: {},
    };
  },
  props: {
    vocabularyList: {},
  },
  mounted() {
    this.classMetricsOnOneGraph = {};
    Object.keys(this.$store.state.classes[0]).forEach((metricName) => {
      if (CLASS_SPECIAL_COLUMNS.includes(metricName)) return;
      this.classMetricsOnOneGraph[metricName] = {
        lastVersionList: {
          // for calculation
          _versionList: {},
          // names, last versions: average not null
          metricsList: {},
          // {
          //   filledNumber: 0,
          //   emptyNumber: 0
          // }
          fullness: {},
        },
        firstVersionList: {
          // for calculation
          _versionList: {},
          // names, last versions: average not null
          metricsList: {},
          // {
          //   filledNumber: 0,
          //   emptyNumber: 0
          // }
          fullness: {},
        },
      };
    });

    this.$store.state.classes.forEach((cclass) => {
      let vocabulary = this.$store.state.vocabularies.find(
        (voc) =>
          voc.name === cclass.vocabulary_name &&
          voc.version === cclass.vocabulary_version_number
      );
      if (!vocabulary) return;
      Object.keys(
        this.vocabularyList[vocabulary.name].versions[vocabulary.version_name]
          .metrics
      ).forEach((metric) => {
        if (
          !this.classMetricsOnOneGraph[metric].lastVersionList._versionList[vocabulary.name] ||
          vocabulary.version_name >
            this.classMetricsOnOneGraph[metric].lastVersionList._versionList[vocabulary.name]
        ) {
          this.classMetricsOnOneGraph[metric].lastVersionList._versionList[vocabulary.name] =
            vocabulary.version_name;
          this.classMetricsOnOneGraph[metric].lastVersionList.metricsList[vocabulary.name] = [];
          this.classMetricsOnOneGraph[metric].lastVersionList.fullness[vocabulary.name] = {
            filledNumber: 0,
            emptyNumber: 0,
          };
        }
        if (
          !this.classMetricsOnOneGraph[metric].firstVersionList._versionList[vocabulary.name] ||
          vocabulary.version_name <
            this.classMetricsOnOneGraph[metric].firstVersionList._versionList[vocabulary.name]
        ) {
          this.classMetricsOnOneGraph[metric].firstVersionList._versionList[vocabulary.name] =
            vocabulary.version_name;
          this.classMetricsOnOneGraph[metric].firstVersionList.metricsList[vocabulary.name] = [];
          this.classMetricsOnOneGraph[metric].firstVersionList.fullness[vocabulary.name] = {
            filledNumber: 0,
            emptyNumber: 0,
          };
        }

        if (+cclass[metric]) {
          this.classMetricsOnOneGraph[metric].lastVersionList.metricsList[vocabulary.name].push(
            +cclass[metric]
          );
          this.classMetricsOnOneGraph[metric].lastVersionList.fullness[vocabulary.name]
            .filledNumber++;
          this.classMetricsOnOneGraph[metric].firstVersionList.metricsList[vocabulary.name].push(
            +cclass[metric]
          );
          this.classMetricsOnOneGraph[metric].firstVersionList.fullness[vocabulary.name]
            .filledNumber++;
        } else {
          this.classMetricsOnOneGraph[metric].lastVersionList.fullness[vocabulary.name]
            .emptyNumber++;
          this.classMetricsOnOneGraph[metric].firstVersionList.fullness[vocabulary.name]
            .emptyNumber++;
        }
      });
    });
  },
};
</script>

<style scoped lang="scss">
.block__scoped {
  margin-bottom: 140px;
}
</style>
