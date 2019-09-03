import { queryNotices } from "@/services/api";

const state = {
  collapsed: false,
  notices: [],
};

const actions = {
  async fetchNotices({ commit, state }) {
    const data = await queryNotices();
    commit("saveNotices", data);
    const unreadCount = state.notices.filter(item => !item.read).length;
    commit(
      "user/changeNotifyCount",
      {
        totalCount: data.length,
        unreadCount,
      },
      { root: true },
    );
  },
  clearNotices({ commit, state }, payload) {
    commit("saveClearedNotices", payload);
    const count = state.notices.length;
    const unreadCount = state.notices.filter(item => !item.read).length;
    commit(
      "user/changeNotifyCount",
      {
        totalCount: count,
        unreadCount,
      },
      { root: true },
    );
  },
  changeNoticeReadState({ commit, state }, payload) {
    const notices = state.notices.map(item => {
      const notice = { ...item };
      if (notice.id === payload) {
        notice.read = true;
      }
      return notice;
    });

    commit("saveNotices", notices);
    commit(
      "user/changeNotifyCount",
      {
        totalCount: notices.length,
        unreadCount: notices.filter(item => !item.read).length,
      },
      { root: true },
    );
  },
};

const mutations = {
  changeLayoutCollapsed(state, payload) {
    Object.assign(state, {
      collapsed: payload,
    });
  },
  saveNotices(state, payload) {
    console.log(payload);
    Object.assign(state, {
      notices: payload,
    });
  },
  saveClearedNotices(state, payload) {
    Object.assign(state, {
      notices: state.notices.filter(item => item.type !== payload),
    });
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
