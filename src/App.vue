<template>
  <div id="root">
    <a-locale-provider :locale="locale">
      <router-view />
    </a-locale-provider>
  </div>
</template>
<script>
// import ConfigProvider from "../../ant-design-vue/components/config-provider";
import { LocaleProvider } from "ant-design-vue";
// import moment from "moment";
// import "moment/locale/zh-cn";
import { getLocale, setLocaleMessage } from "@/locales";

export default {
  data() {
    return {
      locale: {},
      lang: "",
    };
  },
  components: {
    ALocaleProvider: LocaleProvider,
  },
  provide() {
    return {
      changeGlobalLang: this.changeGlobalLang,
    };
  },
  created() {
    const lang = getLocale();
    this.changeGlobalLang(lang);
    setLocaleMessage(lang);
  },
  methods: {
    async changeGlobalLang(lang) {
      if (lang !== this.lang) {
        this.lang = lang;
        this.locale = (await import(
          /* webpackChunkName: "locale" */ `ant-design-vue/lib/locale-provider/${lang
            .split("-")
            .join("_")}`
        )).default;
      }
    },
  },
};
</script>

<style lang="less" src="./global.less"></style>
