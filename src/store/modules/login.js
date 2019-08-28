import router from "@/router";
import { parse } from "query-string";
import { fakeAccountLogin, getFakeCaptcha, fakeRegister } from "@/services/api";
import { setAuthority } from "@/utils/authority";
import { reloadAuthorized } from "@/utils/Authorized";

const state = {
  status: undefined
};

const actions = {
  async login({ commit }, payload) {
    console.log(payload);
    const response = await fakeAccountLogin(payload);
    console.log(response);
    commit("changeLoginStatus", response);
    // Login successfully
    if (response.status === "ok") {
      reloadAuthorized();
      const urlParams = new URL(window.location.href);
      let redirect = parse(location.search).redirect;
      if (redirect) {
        const redirectUrlParams = new URL(redirect);
        if (redirectUrlParams.origin === urlParams.origin) {
          redirect = redirect.substr(urlParams.origin.length);
          if (redirect.match(/^\/.*#/)) {
            redirect = redirect.substr(redirect.indexOf("#") + 1);
          }
        } else {
          redirect = null;
        }
      }
      router.replace({ path: redirect || "/" });
    }
  },
  async logout({ commit }) {
    commit("changeLoginStatus", {
      status: false,
      currentAuthority: "guest"
    });
    reloadAuthorized();
    const redirect = parse(location.search).redirect;
    // redirect
    if (window.location.pathname !== "/user/login" && !redirect) {
      router.replace({
        path: "/user/login",
        query: {
          redirect: window.location.href
        }
      });
    }
  },
  async register({ commit }, payload) {
    console.log(payload);
    const response = await fakeRegister(payload);
    console.log(response);
    if (response.status === "ok") {
      commit("changeLoginStatus", response);
      router.push({
        name: "register.result",
        params: {
          account: payload.mail
        }
      });
    }
  },
  // eslint-disable-next-line no-unused-vars
  async getCaptcha({ commit }, payload) {
    console.log(payload);
    await getFakeCaptcha(payload.mobile);
  }
};

const mutations = {
  changeLoginStatus(state, payload) {
    setAuthority(payload.currentAuthority);
    state.status = payload.status;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
