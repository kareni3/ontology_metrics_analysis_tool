export default {
  props: {
    options: {},
    chartData: {},
    watchChartData: {
      default: true,
    },
  },
  watch: {
    options() {
      this.renderChart(this.chartData, this.options)
    },
    chartData() {
      if (this.watchChartData)
        this.renderChart(this.chartData, this.options)
    }
  },
  mounted() {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options)
  }
}