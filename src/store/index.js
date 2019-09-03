import Vue from "vue";
import Vuex from "vuex";
import form from "./modules/form";
import global from "./modules/global";
import login from "./modules/login";
import menu from "./modules/menu";
import setting from "./modules/setting";
import user from "./modules/user";
import error from "./modules/error";
import rule from "./modules/rule";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  modules: {
    login,
    menu,
    setting,
    error,
    rule,
    user,
    form,
    global
  }
});
