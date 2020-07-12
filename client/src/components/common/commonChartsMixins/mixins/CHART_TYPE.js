import { CHART_TYPE } from "./node_modules/@/CONSTANTS"

export default {
  computed: {
    BAR() {
      return CHART_TYPE.BAR
    },
    LINE() {
      return CHART_TYPE.LINE
    },
    RADAR() {
      return CHART_TYPE.RADAR
    },
    SCATTER() {
      return CHART_TYPE.SCATTER
    },
  }
}