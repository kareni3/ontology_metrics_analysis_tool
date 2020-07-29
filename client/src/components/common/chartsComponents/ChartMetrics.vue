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
        <div
          :class="disabled[metric.name] && 'info_block__disabled'"
           @click="changeDisabled(metric.name)"
        >
          <span>
            {{ metric.name }}{{ metric.hint && '*' }} =
            {{ +metric.value.toFixed(2) === 0 ? metric.value.toFixed(4) : +metric.value.toFixed(1) === 0 ? metric.value.toFixed(3) : metric.value.toFixed(2) }}
          </span
          ><span v-if="metric.isPercentage">%</span>
          <div class="item__trend pl-4" v-if="metric.toShowTrend">
            <span class="item__trend--go_up" v-if="metric.value > 0">⇗</span>
            <span class="item__trend--go_down" v-else-if="metric.value < 0">⇘</span>
          </div>
          <div
            v-if="typeof metric.standardDeviation === 'number'"
            class="standart_deviation pointer"
            :class="disabled[metric.name] && 'standart_deviation__disabled'"
            @click.stop="openOutOfSigmaDialog(metric.name)"
          >
            σ = {{ +metric.standardDeviation.toFixed(2) === 0 ? metric.standardDeviation.toFixed(4) : +metric.standardDeviation.toFixed(1) === 0 ? metric.standardDeviation.toFixed(3) : metric.standardDeviation.toFixed(2) }}
            <div @mouseleave="closeOutOfSigmaDialog(metric.name)" v-if="sigmaDialog[metric.name]" class="out_of_sigma">
              <strong>Out of {{sigmaMult || 2}}σ:</strong>
              <div v-for="el in metric.outOf2Sigma" :key="el.symbol">
                {{el.name}}: {{+el.index.toFixed(2) === 0 ? el.index.toFixed(4) : +el.index.toFixed(1) === 0 ? el.index.toFixed(3) : el.index.toFixed(2)}}
              </div>
              <div v-if="metric.outOf2Sigma.length === 0">None</div>
            </div>
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
      disabled: {},
      sigmaDialog: []
    };
  },
  props: {
    // Array of { name:String, value:Number, ?isPercentage:Boolean, ?toShowTrend:Boolean, ?hint:String }
    metrics: {
      default: () => []
    },
    name: {},
    disabledMetrics: {},
    sigmaMult: {},
  },
  watch: {
    disabledMetrics(v) {
      this.disabled = v;
    },
    closed(v) {
      this.$emit("isClosed", v);
    }
  },
  mounted() {
    this.metrics.forEach(el => {
      this.disabled[el.name] = false;
    });
    this.metrics.forEach(el => {
      this.sigmaDialog[el.name] = false;
    });
  },
  methods: {
    openOutOfSigmaDialog(name) {
      this.sigmaDialog = Object.assign({}, this.sigmaDialog, {
        [name]: true
      });
    },
    closeOutOfSigmaDialog(name) {
      this.sigmaDialog = Object.assign({}, this.sigmaDialog, {
        [name]: false
      });
    },
    openDialog() {
      this.$store.dispatch("fetchDialog", true);
    },
    changeDisabled(name) {
      this.disabled = Object.assign({}, this.disabled, {
        [name]: !this.disabled[name]
      });
      this.$emit("changeDisabled", this.disabled);
    }
  }
};
</script>

<style scoped type="scss" lang="scss">
.info_block {
  width: 260px;
  text-align: left;
  font-weight: 600;
  font-size: 0.9rem;
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
.standart_deviation {
  display: inline-block;
  font-size: 0.7rem;
  border: 1px solid #00000050;
  border-radius: 0.35rem;
  padding: 1px;
  margin-left: 8px;
  color: #000000a0;
  position: relative;
  &__disabled {
    color: #00000030;
    border: 1px solid #00000020;
  }
}
.out_of_sigma {
  position: absolute;
  background-color: #fffffff0;
  color:black;
  border-radius: 0.35rem;
  padding: 12px;
  top: 0;
  z-index: 12;
  max-height: 200px;
  overflow: auto;
  strong {
     white-space: nowrap;
     margin-bottom: 8px;
     font-size: 0.9rem;
  }
  div {
     white-space: nowrap;
     margin-bottom: 6px;
     font-size: 0.8rem;
  }
}
</style>