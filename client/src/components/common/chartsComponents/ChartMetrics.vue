<template>
  <div :class="!closed && 'info_block'">
    <div v-if="!closed">
      <strong>{{name}}</strong>
      <div
        class="info_block__item item pointer"
        v-for="metric in metrics"
        :key="metric.name"
        :title="metric.hint || ''"
      >
        <div :class="disabled[metric.name] && 'info_block__disabled'" @click="changeDisabled(metric.name)">
          {{ metric.name }}{{ metric.hint && '*' }} =
          {{ +metric.value.toFixed(2) === 0 ? metric.value.toFixed(4) : +metric.value.toFixed(1) === 0 ? metric.value.toFixed(3) : metric.value.toFixed(2) }}<span v-if="metric.isPercentage">%</span>
          <div class="item__trend pl-4" v-if="metric.toShowTrend">
            <span class="item__trend--go_up" v-if="metric.value > 0">⇗</span>
            <span class="item__trend--go_down" v-else-if="metric.value < 0">⇘</span>
          </div>
        </div>
      </div>
    </div>
    <span @click="closed = !closed" v-if="!closed" class="close">x</span>
    <span @click="closed = !closed" v-else class="open">о</span>
    <span @click="openDialog" v-if="!closed" class="question">?</span>
  </div>
</template>

<script>
export default {
  name: "ChartMetrics",
  data() {
    return {
      closed: false,
      disabled: {}
    };
  },
  props: {
    // Array of { name:String, value:Number, ?isPercentage:Boolean, ?toShowTrend:Boolean, ?hint:String }
    metrics: {
      default: () => []
    },
    name: {},
    disabledMetrics: {},
  },
  watch: {
    disabledMetrics(v) {
      this.disabled = v
    },
    closed(v) {
      this.$emit('isClosed', v)
    }
  },
  mounted() {
    this.metrics.forEach(el => {
      this.disabled[el.name] = false;
    });
  },
  methods: {
    openDialog() {
      this.$store.dispatch("fetchDialog", true)
    },
    changeDisabled(name) {
      this.disabled = Object.assign({}, this.disabled, { [name]: !this.disabled[name] })
      this.$emit("changeDisabled", this.disabled)
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
  &__disabled {
    color: #00000030;
  }
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
    line-height: 0;
    &--go_up {
      color: #22aa22d0;
    }
    &--go_down {
      color: #aa2222d0;
    }
  }
}
.pl-4 {
  padding-left: 4px;
}
.close {
  position: absolute;
  right: 6px;
  top: 6px;
  cursor: pointer;
  width: 1rem;
  text-align: center;
  padding: 4px;
  border: 1px solid #00000080;
  border-radius: 50%;
}
strong {
  font-size: 20px;
  padding-bottom: 6px;
  display: block;
}
.open {
  position: absolute;
  right: 6px;
  top: 6px;
  cursor: pointer;
  width: 1rem;
  text-align: center;
  padding: 4px;
  border: 1px solid #00000080;
  border-radius: 50%;
  background-color: #ffffff80;
  &:hover {
    background-color: #ffffffd0;
  }
}
.question {
  position: absolute;
  right: 36px;
  top: 6px;
  cursor: pointer;
  width: 1rem;
  text-align: center;
  padding: 4px;
  border: 1px solid #00000080;
  border-radius: 50%;
}
</style>