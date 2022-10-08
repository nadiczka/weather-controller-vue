import Vue from 'vue';
import Vuex from 'vuex';
import { outside } from './outside'
import { inside } from './inside'
import { user } from './user'

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    outside,
    inside,
    user,
  },
  state: {
    controlArea: '',
  },
  mutations: {
    setControlArea(state, controlArea) {
      state.controlArea = controlArea;
    },
  },
});
