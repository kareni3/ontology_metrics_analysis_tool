<template>
  <div class="chart">
    <div class="title-3">
      <button class="btn__nav" @click="prevVoc">&lt;</button>
      <span class="nav__title">{{vocabularyName}}</span>
      <button class="btn__nav" @click="nextVoc">&gt;</button>
    </div>
    <span
      class="pointer"
      v-for="(version,index) in Object.keys(versions)"
      :key="index"
      @click="changeVersionID(index)"
    >| {{version}} |</span>
    <ChartList
      :maxMetricValue="maxMetricValue"
      :name="Object.keys(versions)[versionID]"
      :xLabel="'Classes'"
      :dataList="preparedDataList"
    />
  </div>
</template>

<script>
import ChartList from "@/components/chartsVUE/ChartList.vue";

export default {
  name: "VersionsContainer",
  data() {
    return {
      versionID: 0
    };
  },
  components: {
    ChartList
  },
  props: ["vocabularyName", "versions", "maxMetricValue", "enabledDataList"],
  computed: {
    preparedDataList() {
      const preparedDataList = {};
      Object.entries(
        this.versions[Object.keys(this.versions)[this.versionID]].metrics
      ).forEach(data => {
        if (this.enabledDataList.includes(data[0])) {
          preparedDataList[data[0]] = data[1];
        }
      });
      return preparedDataList;
    }
  },
  methods: {
    prevVoc() {
      this.$emit("prevVoc");
    },
    nextVoc() {
      this.$emit("nextVoc");
    },
    changeVersionID(index) {
      this.versionID = index;
    }
  }
};
</script>
