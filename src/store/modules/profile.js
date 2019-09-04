import { queryBasicProfile, queryAdvancedProfile } from "@/services/api";

export default {
  namespaced: true,

  state: {
    basicGoods: [],
    advancedOperation1: [],
    advancedOperation2: [],
    advancedOperation3: [],
    loadingBasic: false,
    loadingAdvanced: false,
  },

  actions: {
    async fetchBasic({ commit }, payload) {
      commit("saveLoading", { loadingBasic: true });
      const response = await queryBasicProfile(payload);
      commit("saveLoading", { loadingBasic: false });
      commit("show", response);
    },
    async fetchAdvanced({ commit }) {
      commit("saveLoading", { loadingAdvanced: true });
      const response = await queryAdvancedProfile();
      commit("saveLoading", { loadingAdvanced: false });
      commit("show", response);
    },
  },

  mutations: {
    show(state, payload) {
      Object.assign(state, {
        ...payload,
      });
    },
    saveLoading(state, payload) {
      Object.assign(state, {
        ...payload,
      });
    },
  },
};
