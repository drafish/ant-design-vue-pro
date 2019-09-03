import { query as queryUsers, queryCurrent } from "@/services/user";
export default {
  namespaced: true,

  state: {
    list: [],
    currentUser: {},
  },

  actions: {
    async fetch({ commit }) {
      const response = await queryUsers();
      commit("save", response);
    },
    async fetchCurrent({ commit }) {
      const response = await queryCurrent();
      commit("saveCurrentUser", response);
    },
  },

  mutations: {
    save(state, action) {
      Object.assign(state, {
        list: action,
      });
    },
    saveCurrentUser(state, action) {
      Object.assign(state, {
        currentUser: action || {},
      });
    },
    changeNotifyCount(state, action) {
      Object.assign(state.currentUser, {
        notifyCount: action.totalCount,
        unreadCount: action.unreadCount,
      });
    },
  },
};
