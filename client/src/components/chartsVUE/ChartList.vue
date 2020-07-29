<template>
  <div>
    <div class="title-2">{{name}}</div>
    <div v-if="dataList">
      <div v-for="(data,index) in preparedDataList" :key="name+index">
        <NameChart v-if="index < $store.state.graphCount" :scaleLabels="{x: xLabel, y: data[0]}" :maxMetricValue="maxMetricValue" :data="data[1]" :name="data[0]" />
      </div>
    </div>
  </div>
</template>

<script>
import NameChart from "@/components/chartsVUE/NameChart.vue";

export default {
  name: 'ChartList',
  components: {
    NameChart
  },
  data() {
    return {
    };
  },
  props: ['name','dataList', 'maxMetricValue', 'xLabel'],
  computed: {
    preparedDataList() {
      return this.dataList
        ? Object.entries(this.dataList)
        : [];
    }
  },
  mounted () {
    this.$store.dispatch("fetchGraphCount", 5)
  }
}
</script>
