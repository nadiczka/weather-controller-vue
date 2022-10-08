import { notify } from "@/helpers";
import { extractUserNameFromResponse } from "@/helpers/user";

export const user = {
  namespaced: true,
  state: {
    user: {
      name: '',
    }
  },
  mutations: {
    setUserName(state, userName) {
      state.user.name = userName;
    },
  },
  actions: {
    async login({ commit }, authData) {
      // TODO - backend
      // const response = await this.$https('', authData)
      const response = { data: authData.username, status: 200 }

      if (response.status === 200) {
        const userName = extractUserNameFromResponse(response);
        commit('setUserName', userName);
        localStorage.setItem('user', JSON.stringify({ name: userName }));
        notify({type: 'success', title: `${userName} logged in`})
      } else {
        notify({type: 'error', title: 'Access denied'})
        localStorage.removeItem('user');
      }
      return Promise.resolve()
    },
    async logout({ commit }) {
      // TODO - backend
      // const response = await this.$http.post('')
      const response = { status: 200 }

      if (response.status === 200) {
        commit('setUserName', '');
        localStorage.removeItem('user');
        notify({type: 'success', title: `Logged out correctly`})
      } else {
        notify({type: 'error', title: 'Error occurred'})
      }
      return Promise.resolve()
    },
  },
}
