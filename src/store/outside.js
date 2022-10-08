export const outside = {
  namespaced: true,
  state: {
    selectedTab: 0,
  },
  mutations: {
    setSelectedTab(state, selectedTab) {
      state.selectedTab = selectedTab;
    },
  },
  actions: {},
  getters: {},
};
