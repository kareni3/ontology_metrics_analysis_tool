<template>
  <div class="info_block">
    <div
      class="info_block__item item"
      v-for="metric in metrics"
      :key="metric.name"
      :title="metric.hint || ''"
    >
      {{ metric.name }}{{ metric.hint && '*' }} = {{ metric.value.toFixed(2) }}
      <span v-if="metric.isPercentage">%</span>
      <div class="item__trend" v-if="metric.toShowTrend">
        <span class="item__trend--go_up" v-if="metric.value > 0">⇗</span>
        <span class="item__trend--go_down" v-else-if="metric.value < 0">⇘</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChartMetrics",
  props: {
    // Array of { name:String, value:Number, ?isPercentage:Boolean, ?toShowTrend:Boolean, ?hint:String }
    metrics: {
      default: () => []
    }
  }
};
</script>

<style scoped type="scss" lang="scss">
.info_block {
  width: 260px;
  text-align: left;
  font-weight: 600;
  background-color: #ffffff80;
  color: #000000d0;
  border-radius: 4px;
  border: 1px solid #00000060;
  padding: 12px;
  &:hover {
    background-color: #ffffffd0;
    color: #000000f0;
    border: 1px solid #00000080;
  }
  &__item {
    margin-bottom: 8px;
  }
}
.item {
  &__trend {
    display: inline-block;
    &--go_up {
      color: #22aa22d0;
    }
    &--go_down {
      color: #aa2222d0;
    }
  }
}
</style>