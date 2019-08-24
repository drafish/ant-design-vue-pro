import Vue from "vue";
import Vuex from "vuex";
import form from "./modules/form";
import global from "./modules/global";
import login from "./modules/login";
import menu from "./modules/menu";
import setting from "./modules/setting";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  modules: {
    login,
    menu,
    setting,
    form,
    global
  }
});
