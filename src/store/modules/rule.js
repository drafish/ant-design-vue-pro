import { queryRule, removeRule, addRule, updateRule } from "@/services/api";

export default {
  namespaced: true,

  state: {
    data: {
      list: [],
      pagination: {},
    },
    loading: false,
  },

  actions: {
    async fetch({ commit }, payload) {
      commit("saveLoading", true);
      const response = await queryRule(payload);
      commit("saveLoading", false);
      commit("save", response);
    },
    async add({ commit }, payload, callback) {
      commit("saveLoading", true);
      const response = await addRule(payload);
      commit("saveLoading", false);
      commit("save", response);
      if (callback) callback();
    },
    async remove({ commit }, payload, callback) {
      commit("saveLoading", true);
      const response = await removeRule(payload);
      commit("saveLoading", false);
      commit("save", response);
      if (callback) callback();
    },
    async update({ commit }, payload, callback) {
      commit("saveLoading", true);
      const response = await updateRule(payload);
      commit("saveLoading", false);
      commit("save", response);
      if (callback) callback();
    },
  },

  mutations: {
    save(state, action) {
      Object.assign(state, {
        data: action,
      });
    },
    saveLoading(state, action) {
      state.loading = action;
    },
  },
};
