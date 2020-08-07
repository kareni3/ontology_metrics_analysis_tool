<template>
  <div>
    <div
      class="block__scoped"
      v-for="metrics in Object.entries(classMetricsOnOneGraph)"
      :key="metrics[0]"
    >
      <ChartClassForAllVocs
        :metrics="metrics[1].firstVersionList"
        :name="metrics[0]"
        label="First versions of vocabularies"
      />
      <ChartClassForAllVocs
        :metrics="metrics[1].lastVersionList"
        :name="metrics[0]"
        label="Last versions of vocabularies"
      />
      <div v-if="avgChange">avgChange {{avgChange[metrics[0]]}}</div>
      <div v-if="avgChange">avgChangeZeros {{avgChangeZeros[metrics[0]]}}</div>
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
  computed: {
    avgChange() {
      if (Object.values(this.classMetricsOnOneGraph).length === 0) return null;
      const res = {};
      Object.entries(this.classMetricsOnOneGraph).forEach((metric) => {
        res[metric[0]] = 0;
        Object.entries(metric[1].firstVersionList.metricsList).forEach(
          (voc) => {
            let countFirstV = 0;
            let countLastV = 0;
            voc[1].forEach((el) => {
              countFirstV += el;
            });
            metric[1].lastVersionList.metricsList[voc[0]].forEach((el) => {
              countLastV += el;
            });
            const first = voc[1].length ? countFirstV / voc[1].length : 0;
            const last = metric[1].lastVersionList.metricsList[voc[0]].length
              ? countLastV /
                metric[1].lastVersionList.metricsList[voc[0]].length
              : 0;
            res[metric[0]] += first ? (last - first) / first : 0;
          }
        );
        res[metric[0]] /= Object.entries(
          metric[1].firstVersionList.metricsList
        ).length;
      });
      return res;
    },
    avgChangeZeros() {
      if (Object.values(this.classMetricsOnOneGraph).length === 0) return null;
      const res = {};
      Object.entries(this.classMetricsOnOneGraph).forEach((metric) => {
        res[metric[0]] = 0;
        Object.entries(metric[1].firstVersionList.fullness).forEach((voc) => {
          const first =
            voc[1].filledNumber / (voc[1].filledNumber + voc[1].emptyNumber);
          const last =
            metric[1].lastVersionList.fullness[voc[0]].filledNumber /
            (metric[1].lastVersionList.fullness[voc[0]].filledNumber +
              metric[1].lastVersionList.fullness[voc[0]].emptyNumber);
          res[metric[0]] += first ? (last - first) / first : 0;
        });
        res[metric[0]] /= Object.entries(
          metric[1].firstVersionList.metricsList
        ).length;
      });
      return res;
    },
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
          !this.classMetricsOnOneGraph[metric].lastVersionList._versionList[
            vocabulary.name
          ] ||
          vocabulary.version_name >
            this.classMetricsOnOneGraph[metric].lastVersionList._versionList[
              vocabulary.name
            ]
        ) {
          this.classMetricsOnOneGraph[metric].lastVersionList._versionList[
            vocabulary.name
          ] = vocabulary.version_name;
          this.classMetricsOnOneGraph[metric].lastVersionList.metricsList[
            vocabulary.name
          ] = [];
          this.classMetricsOnOneGraph[metric].lastVersionList.fullness[
            vocabulary.name
          ] = {
            filledNumber: 0,
            emptyNumber: 0,
          };
        }
        if (
          !this.classMetricsOnOneGraph[metric].firstVersionList._versionList[
            vocabulary.name
          ] ||
          vocabulary.version_name <
            this.classMetricsOnOneGraph[metric].firstVersionList._versionList[
              vocabulary.name
            ]
        ) {
          this.classMetricsOnOneGraph[metric].firstVersionList._versionList[
            vocabulary.name
          ] = vocabulary.version_name;
          this.classMetricsOnOneGraph[metric].firstVersionList.metricsList[
            vocabulary.name
          ] = [];
          this.classMetricsOnOneGraph[metric].firstVersionList.fullness[
            vocabulary.name
          ] = {
            filledNumber: 0,
            emptyNumber: 0,
          };
        }
        if (
          vocabulary.version_name ===
          this.classMetricsOnOneGraph[metric].firstVersionList._versionList[
            vocabulary.name
          ]
        ) {
          if (+cclass[metric]) {
            this.classMetricsOnOneGraph[metric].firstVersionList.metricsList[
              vocabulary.name
            ].push(+cclass[metric]);
            this.classMetricsOnOneGraph[metric].firstVersionList.fullness[
              vocabulary.name
            ].filledNumber++;
          } else {
            this.classMetricsOnOneGraph[metric].firstVersionList.fullness[
              vocabulary.name
            ].emptyNumber++;
          }
        }
        if (
          vocabulary.version_name ===
          this.classMetricsOnOneGraph[metric].lastVersionList._versionList[
            vocabulary.name
          ]
        ) {
          if (+cclass[metric]) {
            this.classMetricsOnOneGraph[metric].lastVersionList.metricsList[
              vocabulary.name
            ].push(+cclass[metric]);
            this.classMetricsOnOneGraph[metric].lastVersionList.fullness[
              vocabulary.name
            ].filledNumber++;
          } else {
            this.classMetricsOnOneGraph[metric].lastVersionList.fullness[
              vocabulary.name
            ].emptyNumber++;
          }
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
