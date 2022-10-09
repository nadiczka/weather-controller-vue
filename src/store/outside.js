export const outside = {
  namespaced: true,
  state: {
    selectedTab: 0,
    pressure: {
      PressureBalcony: [],
      PressureTerrace: [],
      PressureSwimmingPool: [],
    },
    temperature: {
      TemperatureBalcony: [],
      TemperatureTerrace: [],
      TemperatureSwimmingPool: [],
    },
    processChart: {
      AverageTemperature: [],
      AveragePressure: [],
      SetpointTemperature: [],
    },
    configChartData: [{}],
    configData: [{}],
  },
  mutations: {
    setSelectedTab(state, selectedTab) {
      state.selectedTab = selectedTab;
    },
    addToAttribute(state, { attributeName, attributePartName, value }) {
      if (state[attributeName][attributePartName].length > 1000) {
        state[attributeName][attributePartName].shift();
      }
      state[attributeName][attributePartName].push(value);
    },
    setWholeConfigChartData(state, chartData) {
      state.configChartData = chartData;
    },
    setConfigData(state, { configDataIndex, data }) {
      state.configData[configDataIndex] = data;
    },
    setWholeConfigData(state, data) {
      state.configData = data;
    },
    clearWholeConfigData(state) {
      state.configData = [{}, {}];
    },
  },
  actions: {

  },
  getters: {
    getLastPointsValues: (state) => (attributeName) => {
      let lastPoints = {};
      if (state[attributeName]) {
        Object.entries(state[attributeName]).forEach(([key, val]) => {
          lastPoints[key] = val[val.length-1];
        })
      }
      return lastPoints;
    },
    getConfigData: (state) => {
      return {'outside': state.configData[0].segmentsConfig};
    }
  },
};
