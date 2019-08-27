import request from "@/utils/request";

export default {
  namespaced: true,

  state: {
    error: ""
  },

  actions: {
    async query({ commit }, payload) {
      await request(`/api/${payload}`);
      commit("trigger", payload);
    }
  },

  mutations: {
    trigger(state, action) {
      state.error = action;
    }
  }
};
