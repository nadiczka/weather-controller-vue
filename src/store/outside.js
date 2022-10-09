export const outside = {
  namespaced: true,
  state: {
    selectedTab: 0,
    pressure: {
      PressureBalcony: [],
      PressureTerrace: [],
      PressureSwimmingPool: [],
    },
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
  },
  actions: {

  },
  getters: {

  },
};
