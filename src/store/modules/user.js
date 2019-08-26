import request from "@/utils/request";
export default {
  namespaced: true,

  state: {
    list: [],
    currentUser: {}
  },

  actions: {
    async fetch({ commit }) {
      const response = (await request("/api/users")).data;
      commit("save", response);
    },
    async fetchCurrent({ commit }) {
      const response = (await request("/api/currentUser")).data;
      commit("saveCurrentUser", response);
    }
  },

  mutations: {
    save(state, action) {
      Object.assign(state, {
        list: action
      });
    },
    saveCurrentUser(state, action) {
      Object.assign(state, {
        currentUser: action || {}
      });
    },
    changeNotifyCount(state, action) {
      Object.assign(state.currentUser, {
        notifyCount: action.totalCount,
        unreadCount: action.unreadCount
      });
    }
  }
};
