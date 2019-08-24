import Vue from "vue";
import VueI18n from "vue-i18n";
import enUS from "./en-US";
import zhCN from "./zh-CN";
import zhTW from "./zh-TW";
import ptBR from "./pt-BR";

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: getLocale() || "zh-CN",
  messages: {
    "zh-CN": zhCN,
    "en-US": enUS,
    "zh-TW": zhTW,
    "pt-BR": ptBR
  }
});

function setLocale(lang) {
  if (lang !== undefined && !/^([a-z]{2})-([A-Z]{2})$/.test(lang)) {
    // for reset when lang === undefined
    throw new Error("setLocale lang format error");
  }
  if (getLocale() !== lang) {
    window.localStorage.setItem("ant_design_vue_pro_locale", lang || "");
    i18n.locale = lang;
  }
}

function getLocale() {
  const lang = window.localStorage.getItem("ant_design_vue_pro_locale");
  return lang || "zh-CN";
}

function formatMessage() {
  return i18n.t(...arguments);
}

export { setLocale, getLocale, formatMessage };
export default i18n;
