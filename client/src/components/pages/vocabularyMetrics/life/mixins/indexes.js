
export default {
  data() {
    return {
      standardDeviationMean: 0,
      standardDeviationWeightedMean: 0,
      standardDeviationMedian: 0,
      standardDeviationMaxValue: 0,
      standardDeviationMinValue: 0,
      standardDeviationAbsoluteChange: 0,
      standardDeviationAbsoluteWeightedChange: 0,
      standardDeviationAbsoluteChangePerVersion: 0,
      standardDeviationAbsoluteWeightedChangePerVersion: 0,
      standardDeviationRelativeChange: 0,
      standardDeviationRelativeWeightedChange: 0,
      standardDeviationRelativeChangePerVersion: 0,
      standardDeviationRelativeWeightedChangePerVersion: 0,
    }
  },
  computed: {
    chartMetrics() {
      return [
        {
          name: "Mean",
          value: this.avgMean,
          standardDeviation: this.standardDeviationMean,
          outOf2Sigma: this.outOf2SigmaAvgMean
        },
        {
          name: "Weighted Mean",
          value: this.avgWeightedMean,
          standardDeviation: this.standardDeviationWeightedMean,
          outOf2Sigma: this.outOf2SigmaAvgWeightedMean
        },
        {
          name: "Median",
          value: this.avgMedian,
          standardDeviation: this.standardDeviationMedian,
          outOf2Sigma: this.outOf2SigmaAvgMedian
        },
        {
          name: "Max Value",
          value: this.avgMaxValue,
          standardDeviation: this.standardDeviationMaxValue,
          outOf2Sigma: this.outOf2SigmaAvgMaxValue
        },
        {
          name: "Min Value",
          value: this.avgMinValue,
          standardDeviation: this.standardDeviationMinValue,
          outOf2Sigma: this.outOf2SigmaAvgMinValue
        },
        {
          name: "Absolute Change",
          value: this.avgAbsoluteChange,
          toShowTrend: true,
          standardDeviation: this.standardDeviationAbsoluteChange,
          outOf2Sigma: this.outOf2SigmaAvgAbsoluteChange
        },
        {
          name: "Absolute Weighted Change",
          value: this.avgAbsoluteWeightedChange,
          toShowTrend: true,
          standardDeviation: this.standardDeviationAbsoluteWeightedChange,
          outOf2Sigma: this.outOf2SigmaAvgAbsoluteWeightedChange
        },
        {
          name: "Absolute Change per Version",
          value: this.avgAbsoluteChangePerVersion,
          toShowTrend: true,
          standardDeviation: this.standardDeviationAbsoluteChangePerVersion,
          outOf2Sigma: this.outOf2SigmaAvgAbsoluteChangePerVersion
        },
        {
          name: "Abs-te W-ted Change per Version",
          value: this.avgAbsoluteWeightedChangePerVersion,
          toShowTrend: true,
          standardDeviation: this.standardDeviationAbsoluteWeightedChangePerVersion,
          outOf2Sigma: this.outOf2SigmaAvgAbsoluteWeightedChangePerVersion
        },
        {
          name: "Relative Change",
          value: this.avgRelativeChange,
          isPercentage: true,
          toShowTrend: true,
          standardDeviation: this.standardDeviationRelativeChange,
          outOf2Sigma: this.outOf2SigmaAvgRelativeChange
        },
        {
          name: "Relative Weighted Change",
          value: this.avgRelativeWeightedChange,
          isPercentage: true,
          toShowTrend: true,
          standardDeviation: this.standardDeviationRelativeWeightedChange,
          outOf2Sigma: this.outOf2SigmaAvgRelativeWeightedChange
        },
        {
          name: "Relative Change Per Version",
          value: this.avgRelativeChangePerVersion,
          isPercentage: true,
          toShowTrend: true,
          standardDeviation: this.standardDeviationRelativeChangePerVersion,
          outOf2Sigma: this.outOf2SigmaAvgRelativeChangePerVersion
        },
        {
          name: "Rel. W-ted Change Per Version",
          value: this.avgRelativeWeightedChangePerVersion,
          isPercentage: true,
          toShowTrend: true,
          standardDeviation: this.standardDeviationRelativeWeightedChangePerVersion,
          outOf2Sigma: this.outOf2SigmaAvgRelativeWeightedChangePerVersion
        }
      ];
    },
    chartMetricsMedians() {
      return [
        {
          name: "Mean",
          value: this.medMean,
          standardDeviation: this.standardDeviationMean,
          outOf2Sigma: this.outOf2SigmaMedMean
        },
        {
          name: "Weighted Mean",
          value: this.medWeightedMean,
          standardDeviation: this.standardDeviationWeightedMean,
          outOf2Sigma: this.outOf2SigmaMedWeightedMean
        },
        {
          name: "Median",
          value: this.medMedian,
          standardDeviation: this.standardDeviationMedian,
          outOf2Sigma: this.outOf2SigmaMedMedian
        },
        {
          name: "Max Value",
          value: this.medMaxValue,
          standardDeviation: this.standardDeviationMaxValue,
          outOf2Sigma: this.outOf2SigmaMedMaxValue
        },
        {
          name: "Min Value",
          value: this.medMinValue,
          standardDeviation: this.standardDeviationMinValue,
          outOf2Sigma: this.outOf2SigmaMedMinValue
        },
        {
          name: "Absolute Change",
          value: this.medAbsoluteChange,
          toShowTrend: true,
          standardDeviation: this.standardDeviationAbsoluteChange,
          outOf2Sigma: this.outOf2SigmaMedAbsoluteChange
        },
        {
          name: "Absolute Weighted Change",
          value: this.medAbsoluteWeightedChange,
          toShowTrend: true,
          standardDeviation: this.standardDeviationAbsoluteWeightedChange,
          outOf2Sigma: this.outOf2SigmaMedAbsoluteWeightedChange
        },
        {
          name: "Absolute Change per Version",
          value: this.medAbsoluteChangePerVersion,
          toShowTrend: true,
          standardDeviation: this.standardDeviationAbsoluteChangePerVersion,
          outOf2Sigma: this.outOf2SigmaMedAbsoluteChangePerVersion
        },
        {
          name: "Abs-te W-ted Change per Version",
          value: this.medAbsoluteWeightedChangePerVersion,
          toShowTrend: true,
          standardDeviation: this.standardDeviationAbsoluteWeightedChangePerVersion,
          outOf2Sigma: this.outOf2SigmaMedAbsoluteWeightedChangePerVersion
        },
        {
          name: "Relative Change",
          value: this.medRelativeChange,
          isPercentage: true,
          toShowTrend: true,
          standardDeviation: this.standardDeviationRelativeChange,
          outOf2Sigma: this.outOf2SigmaMedRelativeChange
        },
        {
          name: "Relative Weighted Change",
          value: this.medRelativeWeightedChange,
          isPercentage: true,
          toShowTrend: true,
          standardDeviation: this.standardDeviationRelativeWeightedChange,
          outOf2Sigma: this.outOf2SigmaMedRelativeWeightedChange
        },
        {
          name: "Relative Change Per Version",
          value: this.medRelativeChangePerVersion,
          isPercentage: true,
          toShowTrend: true,
          standardDeviation: this.standardDeviationRelativeChangePerVersion,
          outOf2Sigma: this.outOf2SigmaMedRelativeChangePerVersion
        },
        {
          name: "Rel. W-ted Change Per Version",
          value: this.medRelativeWeightedChangePerVersion,
          isPercentage: true,
          toShowTrend: true,
          standardDeviation: this.standardDeviationRelativeWeightedChangePerVersion,
          outOf2Sigma: this.outOf2SigmaMedRelativeWeightedChangePerVersion
        }
      ];
    },
    avgMean() {
      let sumSquaredY = 0
      let sumY = 0
      let counter = 0
      const res = Object.values(this.data).reduce((acc, cur) => {
        const add = (cur.borders.max + cur.borders.min) / 2
        sumSquaredY += add ** 2
        sumY += add
        counter++;
        acc += add;
        return acc;
      }, 0) / counter
      this.standardDeviationMean = Math.sqrt(sumSquaredY / counter - (sumY / counter) ^ 2)
      return res
    },
    outOf2SigmaAvgMean() {
      const res = Object.entries(this.data).reduce((acc, cur) => {
        const add = (cur[1].borders.max + cur[1].borders.min) / 2
        if (add < this.avgMean - this.standardDeviationMean * 2 || add > this.avgMean + this.standardDeviationMean * 2) {
          acc.push({
            name: cur[0],
            index: add,
            symbol: Symbol(),
          });
        }
        return acc;
      }, [])
      return res
    },
    medMean() {
      const arr = Object.values(this.data).reduce((acc, cur) => {
        acc.push((cur.borders.max + cur.borders.min) / 2);
        return acc;
      }, []);
      const arrSort = arr.sort();
      const len = arrSort.length;
      const mid = Math.ceil(len / 2);
      return len % 2 == 0 && len > 1
        ? (+arrSort[mid] + +arrSort[mid - 1]) / 2
        : +arrSort[mid - 1];
    },
    outOf2SigmaMedMean() {
      const res = Object.entries(this.data).reduce((acc, cur) => {
        const add = (cur[1].borders.max + cur[1].borders.min) / 2
        if (add < this.medMean - this.standardDeviationMean * 2 || add > this.medMean + this.standardDeviationMean * 2) {
          acc.push({
            name: cur[0],
            index: add,
            symbol: Symbol(),
          });
        }
        return acc;
      }, [])
      return res
    },
    avgWeightedMean() {
      let sumSquaredY = 0
      let sumY = 0
      let counter = 0
      const res = Object.values(this.data).reduce((acc, cur) => {
        const val = cur.arr.reduce(
          (c_acc, c_cur) => {
            c_acc[0] += +c_cur.y * +c_cur.weight;
            c_acc[1] += +c_cur.weight;
            return c_acc;
          },
          [0, 0]
        );
        if (val[1]) {
          const add = val[0] / val[1]
          sumSquaredY += add ** 2
          sumY += add
          counter++;
          acc += add;
        }
        return acc;
      }, 0) / counter
      this.standardDeviationWeightedMean = Math.sqrt(sumSquaredY / counter - (sumY / counter) ^ 2)
      return res
    },
    outOf2SigmaAvgWeightedMean() {
      const res = Object.entries(this.data).reduce((acc, cur) => {
        const val = cur[1].arr.reduce(
          (c_acc, c_cur) => {
            c_acc[0] += +c_cur.y * +c_cur.weight;
            c_acc[1] += +c_cur.weight;
            return c_acc;
          },
          [0, 0]
        );
        if (val[1]) {
          const add = val[0] / val[1]
          if (add < this.avgWeightedMean - this.standardDeviationWeightedMean * 2 || add > this.avgWeightedMean + this.standardDeviationWeightedMean * 2) {
            acc.push({
              name: cur[0],
              index: add,
              symbol: Symbol(),
            });
          }
        }
        return acc;
      }, [])
      return res
    },
    medWeightedMean() {
      const arr = Object.values(this.data).reduce((acc, cur) => {
        const val = cur.arr.reduce(
          (c_acc, c_cur) => {
            c_acc[0] += +c_cur.y * +c_cur.weight;
            c_acc[1] += +c_cur.weight;
            return c_acc;
          },
          [0, 0]
        );
        if (val[1]) {
          acc.push(val[0] / val[1]);
        }
        return acc;
      }, []);
      const arrSort = arr.sort();
      const len = arrSort.length;
      const mid = Math.ceil(len / 2);
      return len % 2 == 0 && len > 1
        ? (+arrSort[mid] + +arrSort[mid - 1]) / 2
        : +arrSort[mid - 1];
    },
    outOf2SigmaMedWeightedMean() {
      const res = Object.entries(this.data).reduce((acc, cur) => {
        const val = cur[1].arr.reduce(
          (c_acc, c_cur) => {
            c_acc[0] += +c_cur.y * +c_cur.weight;
            c_acc[1] += +c_cur.weight;
            return c_acc;
          },
          [0, 0]
        );
        if (val[1]) {
          const add = val[0] / val[1]
          if (add < this.medWeightedMean - this.standardDeviationWeightedMean * 2 || add > this.medWeightedMean + this.standardDeviationWeightedMean * 2) {
            acc.push({
              name: cur[0],
              index: add,
              symbol: Symbol(),
            });
          }
        }
        return acc;
      }, [])
      return res
    },
    avgMedian() {
      let sumSquaredY = 0
      let sumY = 0
      let counter = 0
      const res = Object.values(this.data).reduce((acc, cur) => {
        const arr = cur.arr.map(c_cur => c_cur.y);
        const arrSort = arr.sort();
        const len = arrSort.length;
        const mid = Math.ceil(len / 2);
        const add = len % 2 == 0 && len > 1
          ? (+arrSort[mid] + +arrSort[mid - 1]) / 2
          : +arrSort[mid - 1];
        sumSquaredY += add ** 2
        sumY += add
        counter++;
        acc += add;
        return acc;
      }, 0) / counter
      this.standardDeviationMedian = Math.sqrt(sumSquaredY / counter - (sumY / counter) ^ 2)
      return res
    },
    outOf2SigmaAvgMedian() {
      const res = Object.entries(this.data).reduce((acc, cur) => {
        const arr = cur[1].arr.map(c_cur => c_cur.y);
        const arrSort = arr.sort();
        const len = arrSort.length;
        const mid = Math.ceil(len / 2);
        const add = len % 2 == 0 && len > 1
          ? (+arrSort[mid] + +arrSort[mid - 1]) / 2
          : +arrSort[mid - 1];
        if (add < this.avgMedian - this.standardDeviationMedian * 2 || add > this.avgMedian + this.standardDeviationMedian * 2) {
          acc.push({
            name: cur[0],
            index: add,
            symbol: Symbol(),
          });
        }
        return acc;
      }, [])
      return res
    },
    medMedian() {
      const arr = Object.values(this.data).reduce((acc, cur) => {
        const arr = cur.arr.map(c_cur => c_cur.y);
        const arrSort = arr.sort();
        const len = arrSort.length;
        const mid = Math.ceil(len / 2);
        acc.push(
          len % 2 == 0 && len > 1
            ? (+arrSort[mid] + +arrSort[mid - 1]) / 2
            : +arrSort[mid - 1]
        );
        return acc;
      }, []);
      const arrSort = arr.sort();
      const len = arrSort.length;
      const mid = Math.ceil(len / 2);
      return len % 2 == 0 && len > 1
        ? (+arrSort[mid] + +arrSort[mid - 1]) / 2
        : +arrSort[mid - 1];
    },
    outOf2SigmaMedMedian() {
      const res = Object.entries(this.data).reduce((acc, cur) => {
        const arr = cur[1].arr.map(c_cur => c_cur.y);
        const arrSort = arr.sort();
        const len = arrSort.length;
        const mid = Math.ceil(len / 2);
        const add = len % 2 == 0 && len > 1
          ? (+arrSort[mid] + +arrSort[mid - 1]) / 2
          : +arrSort[mid - 1];
        if (add < this.medMedian - this.standardDeviationMedian * 2 || add > this.medMedian + this.standardDeviationMedian * 2) {
          acc.push({
            name: cur[0],
            index: add,
            symbol: Symbol(),
          });
        }
        return acc;
      }, [])
      return res
    },
    avgMaxValue() {
      let sumSquaredY = 0
      let sumY = 0
      let counter = 0
      const res = Object.values(this.data).reduce((acc, cur) => {
        const add = cur.borders.max
        sumSquaredY += add ** 2
        sumY += add
        counter++;
        acc += add;
        return acc;
      }, 0) / counter
      this.standardDeviationMaxValue = Math.sqrt(sumSquaredY / counter - (sumY / counter) ^ 2)
      return res
    },
    outOf2SigmaAvgMaxValue() {
      const res = Object.entries(this.data).reduce((acc, cur) => {
        const add = cur[1].borders.max
        if (add < this.avgMaxValue - this.standardDeviationMaxValue * 2 || add > this.avgMaxValue + this.standardDeviationMaxValue * 2) {
          acc.push({
            name: cur[0],
            index: add,
            symbol: Symbol(),
          });
        }
        return acc;
      }, [])
      return res
    },
    medMaxValue() {
      const arr = Object.values(this.data).reduce((acc, cur) => {
        acc.push(cur.borders.max);
        return acc;
      }, []);
      const arrSort = arr.sort();
      const len = arrSort.length;
      const mid = Math.ceil(len / 2);
      return len % 2 == 0 && len > 1
        ? (+arrSort[mid] + +arrSort[mid - 1]) / 2
        : +arrSort[mid - 1];
    },
    outOf2SigmaMedMaxValue() {
      const res = Object.entries(this.data).reduce((acc, cur) => {
        const add = cur[1].borders.max
        if (add < this.medMaxValue - this.standardDeviationMaxValue * 2 || add > this.medMaxValue + this.standardDeviationMaxValue * 2) {
          acc.push({
            name: cur[0],
            index: add,
            symbol: Symbol(),
          });
        }
        return acc;
      }, [])
      return res
    },
    avgMinValue() {
      let sumSquaredY = 0
      let sumY = 0
      let counter = 0
      const res = Object.values(this.data).reduce((acc, cur) => {
        const add = cur.borders.min
        sumSquaredY += add ** 2
        sumY += add
        counter++;
        acc += add;
        return acc;
      }, 0) / counter
      this.standardDeviationMinValue = Math.sqrt(sumSquaredY / counter - (sumY / counter) ^ 2)
      return res
    },
    outOf2SigmaAvgMinValue() {
      const res = Object.entries(this.data).reduce((acc, cur) => {
        const add = cur[1].borders.min
        if (add < this.avgMinValue - this.standardDeviationMinValue * 2 || add > this.avgMinValue + this.standardDeviationMinValue * 2) {
          acc.push({
            name: cur[0],
            index: add,
            symbol: Symbol(),
          });
        }
        return acc;
      }, [])
      return res
    },
    medMinValue() {
      const arr = Object.values(this.data).reduce((acc, cur) => {
        acc.push(cur.borders.min);
        return acc;
      }, []);
      const arrSort = arr.sort();
      const len = arrSort.length;
      const mid = Math.ceil(len / 2);
      return len % 2 == 0 && len > 1
        ? (+arrSort[mid] + +arrSort[mid - 1]) / 2
        : +arrSort[mid - 1];
    },
    outOf2SigmaMedMinValue() {
      const res = Object.entries(this.data).reduce((acc, cur) => {
        const add = cur[1].borders.min
        if (add < this.medMinValue - this.standardDeviationMinValue * 2 || add > this.medMinValue + this.standardDeviationMinValue * 2) {
          acc.push({
            name: cur[0],
            index: add,
            symbol: Symbol(),
          });
        }
        return acc;
      }, [])
      return res
    },
    avgAbsoluteChange() {
      let sumSquaredY = 0
      let sumY = 0
      let counter = 0
      const res = Object.values(this.data).reduce((acc, cur) => {
        if (cur.arr.length > 1) counter++;
        const add = +cur.arr[cur.arr.length - 1].y - +cur.arr[0].y
        sumSquaredY += add ** 2
        sumY += add
        acc += add;
        return acc;
      }, 0) / counter
      this.standardDeviationAbsoluteChange = Math.sqrt(sumSquaredY / counter - (sumY / counter) ^ 2)
      return res
    },
    outOf2SigmaAvgAbsoluteChange() {
      const res = Object.entries(this.data).reduce((acc, cur) => {
        const add = +cur[1].arr[cur[1].arr.length - 1].y - +cur[1].arr[0].y
        if (add < this.avgAbsoluteChange - this.standardDeviationAbsoluteChange * 2 || add > this.avgAbsoluteChange + this.standardDeviationAbsoluteChange * 2) {
          acc.push({
            name: cur[0],
            index: add,
            symbol: Symbol(),
          });
        }
        return acc;
      }, [])
      return res
    },
    medAbsoluteChange() {
      const arr = Object.values(this.data).reduce((acc, cur) => {
        acc.push(+cur.arr[cur.arr.length - 1].y - +cur.arr[0].y);
        return acc;
      }, []);
      const arrSort = arr.sort();
      const len = arrSort.length;
      const mid = Math.ceil(len / 2);
      return len % 2 == 0 && len > 1
        ? (+arrSort[mid] + +arrSort[mid - 1]) / 2
        : +arrSort[mid - 1];
    },
    outOf2SigmaMedAbsoluteChange() {
      const res = Object.entries(this.data).reduce((acc, cur) => {
        const add = +cur[1].arr[cur[1].arr.length - 1].y - +cur[1].arr[0].y
        if (add < this.medAbsoluteChange - this.standardDeviationAbsoluteChange * 2 || add > this.medAbsoluteChange + this.standardDeviationAbsoluteChange * 2) {
          acc.push({
            name: cur[0],
            index: add,
            symbol: Symbol(),
          });
        }
        return acc;
      }, [])
      return res
    },
    avgAbsoluteWeightedChange() {
      let sumSquaredY = 0
      let sumY = 0
      let counter = 0
      const res = Object.values(this.data).reduce((acc, cur) => {
        if (cur.arr.length > 1) counter++;
        const val = cur.arr.reduce(
          (c_acc, c_cur, i) => {
            if (i === 0) return c_acc;
            c_acc[0] += (+c_cur.y - +cur.arr[i - 1].y) * +c_cur.weight;
            c_acc[1] += +c_cur.weight;
            return c_acc;
          },
          [0, 0]
        );
        if (val[1]) {
          const add = val[0] / val[1]
          sumSquaredY += add ** 2
          sumY += add
          acc += add;
        }
        return acc;
      }, 0) / counter
      this.standardDeviationAbsoluteWeightedChange = Math.sqrt(sumSquaredY / counter - (sumY / counter) ^ 2)
      return res
    },
    outOf2SigmaAvgAbsoluteWeightedChange() {
      const res = Object.entries(this.data).reduce((acc, cur) => {
        const val = cur[1].arr.reduce(
          (c_acc, c_cur, i) => {
            if (i === 0) return c_acc;
            c_acc[0] += (+c_cur.y - +cur[1].arr[i - 1].y) * +c_cur.weight;
            c_acc[1] += +c_cur.weight;
            return c_acc;
          },
          [0, 0]
        );
        if (val[1]) {
          const add = val[0] / val[1]
          if (add < this.avgAbsoluteWeightedChange - this.standardDeviationAbsoluteWeightedChange * 2 || add > this.avgAbsoluteWeightedChange + this.standardDeviationAbsoluteWeightedChange * 2) {
            acc.push({
              name: cur[0],
              index: add,
              symbol: Symbol(),
            });
          }
        }
        return acc;
      }, [])
      return res
    },
    medAbsoluteWeightedChange() {
      const arr = Object.values(this.data).reduce((acc, cur) => {
        const val = cur.arr.reduce(
          (c_acc, c_cur, i) => {
            if (i === 0) return c_acc;
            c_acc[0] += (+c_cur.y - +cur.arr[i - 1].y) * +c_cur.weight;
            c_acc[1] += +c_cur.weight;
            return c_acc;
          },
          [0, 0]
        );
        if (val[1]) {
          acc.push(val[0] / val[1]);
        }
        return acc;
      }, []);
      const arrSort = arr.sort();
      const len = arrSort.length;
      const mid = Math.ceil(len / 2);
      return len % 2 == 0 && len > 1
        ? (+arrSort[mid] + +arrSort[mid - 1]) / 2
        : +arrSort[mid - 1];
    },
    outOf2SigmaMedAbsoluteWeightedChange() {
      const res = Object.entries(this.data).reduce((acc, cur) => {
        const val = cur[1].arr.reduce(
          (c_acc, c_cur, i) => {
            if (i === 0) return c_acc;
            c_acc[0] += (+c_cur.y - +cur[1].arr[i - 1].y) * +c_cur.weight;
            c_acc[1] += +c_cur.weight;
            return c_acc;
          },
          [0, 0]
        );
        if (val[1]) {
          const add = val[0] / val[1]
          if (add < this.medAbsoluteWeightedChange - this.standardDeviationAbsoluteWeightedChange * 2 || add > this.medAbsoluteWeightedChange + this.standardDeviationAbsoluteWeightedChange * 2) {
            acc.push({
              name: cur[0],
              index: add,
              symbol: Symbol(),
            });
          }
        }
        return acc;
      }, [])
      return res
    },
    avgAbsoluteChangePerVersion() {
      let sumSquaredY = 0
      let sumY = 0
      let counter = 0
      const res = Object.values(this.data).reduce((acc, cur) => {
        if (cur.arr.length > 1) counter++;
        const add = (+cur.arr[cur.arr.length - 1].y - +cur.arr[0].y) /
          (cur.arr.length - 1)
        sumSquaredY += add ** 2
        sumY += add
        acc += add;
        return acc;
      }, 0) / counter
      this.standardDeviationAbsoluteChangePerVersion = Math.sqrt(sumSquaredY / counter - (sumY / counter) ^ 2)
      return res
    },
    outOf2SigmaAvgAbsoluteChangePerVersion() {
      const res = Object.entries(this.data).reduce((acc, cur) => {
        const add = (+cur[1].arr[cur[1].arr.length - 1].y - +cur[1].arr[0].y) /
          (cur[1].arr.length - 1)
        if (add < this.avgAbsoluteChangePerVersion - this.standardDeviationAbsoluteChangePerVersion * 2 || add > this.avgAbsoluteChangePerVersion + this.standardDeviationAbsoluteChangePerVersion * 2) {
          acc.push({
            name: cur[0],
            index: add,
            symbol: Symbol(),
          });
        }
        return acc;
      }, [])
      return res
    },
    medAbsoluteChangePerVersion() {
      const arr = Object.values(this.data).reduce((acc, cur) => {
        acc.push(
          (+cur.arr[cur.arr.length - 1].y - +cur.arr[0].y) /
          (cur.arr.length - 1));
        return acc;
      }, [])
      const arrSort = arr.sort();
      const len = arrSort.length;
      const mid = Math.ceil(len / 2);
      return len % 2 == 0 && len > 1
        ? (+arrSort[mid] + +arrSort[mid - 1]) / 2
        : +arrSort[mid - 1];
    },
    outOf2SigmaMedAbsoluteChangePerVersion() {
      const res = Object.entries(this.data).reduce((acc, cur) => {
        const add = (+cur[1].arr[cur[1].arr.length - 1].y - +cur[1].arr[0].y) /
          (cur[1].arr.length - 1)
        if (add < this.medAbsoluteChangePerVersion - this.standardDeviationAbsoluteChangePerVersion * 2 || add > this.medAbsoluteChangePerVersion + this.standardDeviationAbsoluteChangePerVersion * 2) {
          acc.push({
            name: cur[0],
            index: add,
            symbol: Symbol(),
          });
        }
        return acc;
      }, [])
      return res
    },
    avgAbsoluteWeightedChangePerVersion() {
      let sumSquaredY = 0
      let sumY = 0
      let counter = 0
      const res = Object.values(this.data).reduce((acc, cur) => {
        if (cur.arr.length > 1) counter++;
        const val = cur.arr.reduce(
          (c_acc, c_cur, i) => {
            if (i === 0) return c_acc;
            c_acc[0] +=
              ((+c_cur.y - +cur.arr[i - 1].y) / (cur.arr.length - 1)) *
              +c_cur.weight;
            c_acc[1] += +c_cur.weight;
            return c_acc;
          },
          [0, 0]
        );
        if (val[1]) {
          const add = val[0] / val[1]
          sumSquaredY += add ** 2
          sumY += add
          acc += add;
        }
        return acc;
      }, 0) / counter
      this.standardDeviationAbsoluteWeightedChangePerVersion = Math.sqrt(sumSquaredY / counter - (sumY / counter) ^ 2)
      return res
    },
    outOf2SigmaAvgAbsoluteWeightedChangePerVersion() {
      const res = Object.entries(this.data).reduce((acc, cur) => {
        const val = cur[1].arr.reduce(
          (c_acc, c_cur, i) => {
            if (i === 0) return c_acc;
            c_acc[0] +=
              ((+c_cur.y - +cur[1].arr[i - 1].y) / (cur[1].arr.length - 1)) *
              +c_cur.weight;
            c_acc[1] += +c_cur.weight;
            return c_acc;
          },
          [0, 0]
        );
        if (val[1]) {
          const add = val[0] / val[1]
          if (add < this.avgAbsoluteWeightedChangePerVersion - this.standardDeviationAbsoluteWeightedChangePerVersion * 2 || add > this.avgAbsoluteWeightedChangePerVersion + this.standardDeviationAbsoluteWeightedChangePerVersion * 2) {
            acc.push({
              name: cur[0],
              index: add,
              symbol: Symbol(),
            });
          }
        }
        return acc;
      }, [])
      return res
    },
    medAbsoluteWeightedChangePerVersion() {
      const arr = Object.values(this.data).reduce((acc, cur) => {
        const val = cur.arr.reduce(
          (c_acc, c_cur, i) => {
            if (i === 0) return c_acc;
            c_acc[0] +=
              ((+c_cur.y - +cur.arr[i - 1].y) / (cur.arr.length - 1)) *
              +c_cur.weight;
            c_acc[1] += +c_cur.weight;
            return c_acc;
          },
          [0, 0]
        );
        if (val[1]) {
          acc.push(val[0] / val[1]);
        }
        return acc;
      }, [])
      const arrSort = arr.sort();
      const len = arrSort.length;
      const mid = Math.ceil(len / 2);
      return len % 2 == 0 && len > 1
        ? (+arrSort[mid] + +arrSort[mid - 1]) / 2
        : +arrSort[mid - 1];
    },
    outOf2SigmaMedAbsoluteWeightedChangePerVersion() {
      const res = Object.entries(this.data).reduce((acc, cur) => {
        const val = cur[1].arr.reduce(
          (c_acc, c_cur, i) => {
            if (i === 0) return c_acc;
            c_acc[0] +=
              ((+c_cur.y - +cur[1].arr[i - 1].y) / (cur[1].arr.length - 1)) *
              +c_cur.weight;
            c_acc[1] += +c_cur.weight;
            return c_acc;
          },
          [0, 0]
        );
        if (val[1]) {
          const add = val[0] / val[1]
          if (add < this.medAbsoluteWeightedChangePerVersion - this.standardDeviationAbsoluteWeightedChangePerVersion * 2 || add > this.medAbsoluteWeightedChangePerVersion + this.standardDeviationAbsoluteWeightedChangePerVersion * 2) {
            acc.push({
              name: cur[0],
              index: add,
              symbol: Symbol(),
            });
          }
        }
        return acc;
      }, [])
      return res
    },
    avgRelativeChange() {
      let sumSquaredY = 0
      let sumY = 0
      let counter = 0
      const res = Object.values(this.data).reduce((acc, cur) => {
        let i = 0;
        let n = 0;
        while (!n) {
          try {
            n = +cur.arr[i++].y;
          } catch {
            break;
          }
        }
        if (n) {
          counter++;
          const add = ((+cur.arr[cur.arr.length - 1].y - n) / Math.abs(n)) * 100
          sumSquaredY += add ** 2
          sumY += add
          acc += add;
        }
        return acc;
      }, 0) / counter
      this.standardDeviationRelativeChange = Math.sqrt(sumSquaredY / counter - (sumY / counter) ^ 2)
      return res
    },
    outOf2SigmaAvgRelativeChange() {
      const res = Object.entries(this.data).reduce((acc, cur) => {
        let i = 0;
        let n = 0;
        while (!n) {
          try {
            n = +cur[1].arr[i++].y;
          } catch {
            break;
          }
        }
        const add = ((+cur[1].arr[cur[1].arr.length - 1].y - n) / Math.abs(n)) * 100
        if (add < this.avgRelativeChange - this.standardDeviationRelativeChange * 2 || add > this.avgRelativeChange + this.standardDeviationRelativeChange * 2) {
          acc.push({
            name: cur[0],
            index: add,
            symbol: Symbol(),
          });
        }
        return acc;
      }, [])
      return res
    },
    medRelativeChange() {
      const arr = Object.values(this.data).reduce((acc, cur) => {
        let i = 0;
        let n = 0;
        while (!n) {
          try {
            n = +cur.arr[i++].y;
          } catch {
            break;
          }
        }
        if (n) {
          acc.push(((+cur.arr[cur.arr.length - 1].y - n) / Math.abs(n)) * 100);
        }
        return acc;
      }, [])
      const arrSort = arr.sort();
      const len = arrSort.length;
      const mid = Math.ceil(len / 2);
      return len % 2 == 0 && len > 1
        ? (+arrSort[mid] + +arrSort[mid - 1]) / 2
        : +arrSort[mid - 1];
    },
    outOf2SigmaMedRelativeChange() {
      const res = Object.entries(this.data).reduce((acc, cur) => {
        let i = 0;
        let n = 0;
        while (!n) {
          try {
            n = +cur[1].arr[i++].y;
          } catch {
            break;
          }
        }
        const add = ((+cur[1].arr[cur[1].arr.length - 1].y - n) / Math.abs(n)) * 100
        if (add < this.medRelativeChange - this.standardDeviationRelativeChange * 2 || add > this.medRelativeChange + this.standardDeviationRelativeChange * 2) {
          acc.push({
            name: cur[0],
            index: add,
            symbol: Symbol(),
          });
        }
        return acc;
      }, [])
      return res
    },
    avgRelativeWeightedChange() {
      let sumSquaredY = 0
      let sumY = 0
      let counter = 0
      const res = Object.values(this.data).reduce((acc, cur) => {
        const val = cur.arr.reduce(
          (c_acc, c_cur, i) => {
            if (i === 0 || !+cur.arr[i - 1].y) return c_acc;
            c_acc[0] +=
              ((+c_cur.y - +cur.arr[i - 1].y) / Math.abs(+cur.arr[i - 1].y)) *
              100 *
              +c_cur.weight;
            c_acc[1] += +c_cur.weight;
            return c_acc;
          },
          [0, 0]
        );
        if (val[1]) {
          counter++;
          const add = val[0] / val[1]
          sumSquaredY += add ** 2
          sumY += add
          acc += add;
        }
        return acc;
      }, 0) / counter
      this.standardDeviationRelativeWeightedChange = Math.sqrt(sumSquaredY / counter - (sumY / counter) ^ 2)
      return res
    },
    outOf2SigmaAvgRelativeWeightedChange() {
      const res = Object.entries(this.data).reduce((acc, cur) => {
        const val = cur[1].arr.reduce(
          (c_acc, c_cur, i) => {
            if (i === 0 || !+cur[1].arr[i - 1].y) return c_acc;
            c_acc[0] +=
              ((+c_cur.y - +cur[1].arr[i - 1].y) / Math.abs(+cur[1].arr[i - 1].y)) *
              100 *
              +c_cur.weight;
            c_acc[1] += +c_cur.weight;
            return c_acc;
          },
          [0, 0]
        );
        if (val[1]) {
          const add = val[0] / val[1]
          if (add < this.avgRelativeWeightedChange - this.standardDeviationRelativeWeightedChange * 2 || add > this.avgRelativeWeightedChange + this.standardDeviationRelativeWeightedChange * 2) {
            acc.push({
              name: cur[0],
              index: add,
              symbol: Symbol(),
            });
          }
        }
        return acc;
      }, [])
      return res
    },
    medRelativeWeightedChange() {
      const arr = Object.values(this.data).reduce((acc, cur) => {
        const val = cur.arr.reduce(
          (c_acc, c_cur, i) => {
            if (i === 0 || !+cur.arr[i - 1].y) return c_acc;
            c_acc[0] +=
              ((+c_cur.y - +cur.arr[i - 1].y) / Math.abs(+cur.arr[i - 1].y)) *
              100 *
              +c_cur.weight;
            c_acc[1] += +c_cur.weight;
            return c_acc;
          },
          [0, 0]
        );
        if (val[1]) {
          acc.push(val[0] / val[1]);
        }
        return acc;
      }, [])
      const arrSort = arr.sort();
      const len = arrSort.length;
      const mid = Math.ceil(len / 2);
      return len % 2 == 0 && len > 1
        ? (+arrSort[mid] + +arrSort[mid - 1]) / 2
        : +arrSort[mid - 1];
    },
    outOf2SigmaMedRelativeWeightedChange() {
      const res = Object.entries(this.data).reduce((acc, cur) => {
        const val = cur[1].arr.reduce(
          (c_acc, c_cur, i) => {
            if (i === 0 || !+cur[1].arr[i - 1].y) return c_acc;
            c_acc[0] +=
              ((+c_cur.y - +cur[1].arr[i - 1].y) / Math.abs(+cur[1].arr[i - 1].y)) *
              100 *
              +c_cur.weight;
            c_acc[1] += +c_cur.weight;
            return c_acc;
          },
          [0, 0]
        );
        if (val[1]) {
          const add = val[0] / val[1]
          if (add < this.medRelativeWeightedChange - this.standardDeviationRelativeWeightedChange * 2 || add > this.medRelativeWeightedChange + this.standardDeviationRelativeWeightedChange * 2) {
            acc.push({
              name: cur[0],
              index: add,
              symbol: Symbol(),
            });
          }
        }
        return acc;
      }, [])
      return res
    },
    avgRelativeChangePerVersion() {
      let sumSquaredY = 0
      let sumY = 0
      let counter = 0
      const res = Object.values(this.data).reduce((acc, cur) => {
        let i = 0;
        let n = 0;
        while (!n) {
          try {
            n = +cur.arr[i++].y;
          } catch {
            break;
          }
        }
        if (n) {
          counter++;
          const add = ((+cur.arr[cur.arr.length - 1].y - n) /
            Math.abs(n) /
            (cur.arr.length - 1)) *
            100;
          sumSquaredY += add ** 2
          sumY += add
          acc += add;
        }
        return acc;
      }, 0) / counter
      this.standardDeviationRelativeChangePerVersion = Math.sqrt(sumSquaredY / counter - (sumY / counter) ^ 2)
      return res
    },
    outOf2SigmaAvgRelativeChangePerVersion() {
      const res = Object.entries(this.data).reduce((acc, cur) => {
        let i = 0;
        let n = 0;
        while (!n) {
          try {
            n = +cur[1].arr[i++].y;
          } catch {
            break;
          }
        }
        const add = ((+cur[1].arr[cur[1].arr.length - 1].y - n) /
          Math.abs(n) /
          (cur[1].arr.length - 1)) *
          100;
        if (add < this.avgRelativeChangePerVersion - this.standardDeviationRelativeChangePerVersion * 2 || add > this.avgRelativeChangePerVersion + this.standardDeviationRelativeChangePerVersion * 2) {
          acc.push({
            name: cur[0],
            index: add,
            symbol: Symbol(),
          });
        }
        return acc;
      }, [])
      return res
    },
    medRelativeChangePerVersion() {
      const arr = Object.values(this.data).reduce((acc, cur) => {
        let i = 0;
        let n = 0;
        while (!n) {
          try {
            n = +cur.arr[i++].y;
          } catch {
            break;
          }
        }
        if (n) {
          acc.push(
            ((+cur.arr[cur.arr.length - 1].y - n) /
              Math.abs(n) /
              (cur.arr.length - 1)) *
            100);
        }
        return acc;
      }, [])
      const arrSort = arr.sort();
      const len = arrSort.length;
      const mid = Math.ceil(len / 2);
      return len % 2 == 0 && len > 1
        ? (+arrSort[mid] + +arrSort[mid - 1]) / 2
        : +arrSort[mid - 1];
    },
    outOf2SigmaMedRelativeChangePerVersion() {
      const res = Object.entries(this.data).reduce((acc, cur) => {
        let i = 0;
        let n = 0;
        while (!n) {
          try {
            n = +cur[1].arr[i++].y;
          } catch {
            break;
          }
        }
        const add = ((+cur[1].arr[cur[1].arr.length - 1].y - n) /
          Math.abs(n) /
          (cur[1].arr.length - 1)) *
          100;
        if (add < this.medRelativeChangePerVersion - this.standardDeviationRelativeChangePerVersion * 2 || add > this.medRelativeChangePerVersion + this.standardDeviationRelativeChangePerVersion * 2) {
          acc.push({
            name: cur[0],
            index: add,
            symbol: Symbol(),
          });
        }
        return acc;
      }, [])
      return res
    },
    avgRelativeWeightedChangePerVersion() {
      let sumSquaredY = 0
      let sumY = 0
      let counter = 0
      const res = Object.values(this.data).reduce((acc, cur) => {
        const val = cur.arr.reduce(
          (c_acc, c_cur, i) => {
            if (i === 0 || !+cur.arr[i - 1].y) return c_acc;
            c_acc[0] +=
              ((+c_cur.y - +cur.arr[i - 1].y) /
                Math.abs(+cur.arr[i - 1].y) /
                (cur.arr.length - 1)) *
              100 *
              +c_cur.weight;
            c_acc[1] += +c_cur.weight;
            return c_acc;
          },
          [0, 0]
        );
        if (val[1]) {
          counter++;
          const add = val[0] / val[1]
          sumSquaredY += add ** 2
          sumY += add
          acc += add;
        }
        return acc;
      }, 0) / counter
      this.standardDeviationRelativeWeightedChangePerVersion = Math.sqrt(sumSquaredY / counter - (sumY / counter) ^ 2)
      return res
    },
    outOf2SigmaAvgRelativeWeightedChangePerVersion() {
      const res = Object.entries(this.data).reduce((acc, cur) => {
        const val = cur[1].arr.reduce(
          (c_acc, c_cur, i) => {
            if (i === 0 || !+cur[1].arr[i - 1].y) return c_acc;
            c_acc[0] +=
              ((+c_cur.y - +cur[1].arr[i - 1].y) /
                Math.abs(+cur[1].arr[i - 1].y) /
                (cur[1].arr.length - 1)) *
              100 *
              +c_cur.weight;
            c_acc[1] += +c_cur.weight;
            return c_acc;
          },
          [0, 0]
        );
        if (val[1]) {
          const add = val[0] / val[1]
          if (add < this.avgRelativeWeightedChangePerVersion - this.standardDeviationRelativeWeightedChangePerVersion * 2 || add > this.avgRelativeWeightedChangePerVersion + this.standardDeviationRelativeWeightedChangePerVersion * 2) {
            acc.push({
              name: cur[0],
              index: add,
              symbol: Symbol(),
            });
          }
        }
        return acc;
      }, [])
      return res
    },
    medRelativeWeightedChangePerVersion() {
      const arr = Object.values(this.data).reduce((acc, cur) => {
        const val = cur.arr.reduce(
          (c_acc, c_cur, i) => {
            if (i === 0 || !+cur.arr[i - 1].y) return c_acc;
            c_acc[0] +=
              ((+c_cur.y - +cur.arr[i - 1].y) /
                Math.abs(+cur.arr[i - 1].y) /
                (cur.arr.length - 1)) *
              100 *
              +c_cur.weight;
            c_acc[1] += +c_cur.weight;
            return c_acc;
          },
          [0, 0]
        );
        if (val[1]) {
          acc.push(val[0] / val[1]);
        }
        return acc;
      }, [])
      const arrSort = arr.sort();
      const len = arrSort.length;
      const mid = Math.ceil(len / 2);
      return len % 2 == 0 && len > 1
        ? (+arrSort[mid] + +arrSort[mid - 1]) / 2
        : +arrSort[mid - 1];
    },
    outOf2SigmaMedRelativeWeightedChangePerVersion() {
      const res = Object.entries(this.data).reduce((acc, cur) => {
        const val = cur[1].arr.reduce(
          (c_acc, c_cur, i) => {
            if (i === 0 || !+cur[1].arr[i - 1].y) return c_acc;
            c_acc[0] +=
              ((+c_cur.y - +cur[1].arr[i - 1].y) /
                Math.abs(+cur[1].arr[i - 1].y) /
                (cur[1].arr.length - 1)) *
              100 *
              +c_cur.weight;
            c_acc[1] += +c_cur.weight;
            return c_acc;
          },
          [0, 0]
        );
        if (val[1]) {
          const add = val[0] / val[1]
          if (add < this.medRelativeWeightedChangePerVersion - this.standardDeviationRelativeWeightedChangePerVersion * 2 || add > this.medRelativeWeightedChangePerVersion + this.standardDeviationRelativeWeightedChangePerVersion * 2) {
            acc.push({
              name: cur[0],
              index: add,
              symbol: Symbol(),
            });
          }
        }
        return acc;
      }, [])
      return res
    },
  },
}