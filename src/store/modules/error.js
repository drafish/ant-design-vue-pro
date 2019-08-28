import queryError from "@/services/error";

export default {
  namespaced: true,

  state: {
    error: ""
  },

  actions: {
    async query({ commit }, payload) {
      await queryError(payload);
      commit("trigger", payload);
    }
  },

  mutations: {
    trigger(state, action) {
      state.error = action;
    }
  }
};
