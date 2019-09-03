<template>
  <Media query="(max-width: 599px)" v-slot="isMobile">
    <ContainerQuery :query="query" v-model="params">
      <Provider :value="getContext()">
        <div :class="className">
          <a-layout>
            <SiderMenu
              v-if="!(isTop && !isMobile)"
              :logo="logo"
              :theme="setting.navTheme"
              :onCollapse="handleMenuCollapse"
              :menuData="menuData"
              :isMobile="isMobile"
              :collapsed="collapsed"
              :fixSiderbar="setting.fixSiderbar"
            />
            <a-layout :style="layoutStyle">
              <Header
                :menuData="menuData"
                :handleMenuCollapse="handleMenuCollapse"
                :logo="logo"
                :isMobile="isMobile"
              />
              <a-layout-content :class="$style.content" :style="contentStyle">
                <Authorized><router-view /></Authorized>
              </a-layout-content>
              <Footer />
            </a-layout>
          </a-layout>

          <VNodes :vnodes="renderSettingDrawer()" />
        </div>
      </Provider>
    </ContainerQuery>
  </Media>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { ContainerQuery } from "vue-container-query";
import classNames from "classnames";
import Media from "@/utils/VueMedia";
import Context from "./MenuContext";
import SiderMenu from "@/components/SiderMenu";
import SettingDrawer from "@/components/SettingDrawer";
import logo from "@/assets/logo.svg";
import Authorized from "@/views/Authorized.js";

import Header from "./Header";
import Footer from "./Footer";

const Provider = Context.Provider;
const query = {
  "screen-xs": {
    maxWidth: 575,
  },
  "screen-sm": {
    minWidth: 576,
    maxWidth: 767,
  },
  "screen-md": {
    minWidth: 768,
    maxWidth: 991,
  },
  "screen-lg": {
    minWidth: 992,
    maxWidth: 1199,
  },
  "screen-xl": {
    minWidth: 1200,
    maxWidth: 1599,
  },
  "screen-xxl": {
    minWidth: 1600,
  },
};

export default {
  data() {
    return {
      query,
      params: {},
      logo,
    };
  },
  computed: {
    ...mapState("global", {
      collapsed: state => state.collapsed,
    }),
    ...mapState("setting", {
      setting: state => state,
    }),
    ...mapState("menu", {
      menuData: state => state.menuData,
      breadcrumbNameMap: state => state.breadcrumbNameMap,
    }),
    className() {
      return classNames(this.params);
    },
    isTop() {
      return this.setting.layout === "topmenu";
    },
    layoutStyle() {
      return {
        ...this.getLayoutStyle(),
        minHeight: "100vh",
      };
    },
    contentStyle() {
      return !this.setting.fixedHeader ? { paddingTop: 0 } : {};
    },
  },
  components: {
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
    Header,
    Footer,
    SiderMenu,
    Authorized,
    Media,
    ContainerQuery,
    Provider,
  },
  mounted() {
    const { children, path, authority } = this.$router.options.routes[1];
    this.getMenuData({ routes: children, path, authority });
    this.getSetting();
    this.fetchCurrent();
  },
  methods: {
    ...mapActions("menu", ["getMenuData"]),
    ...mapActions("user", ["fetchCurrent"]),
    ...mapMutations("setting", ["getSetting"]),
    ...mapMutations("global", ["changeLayoutCollapsed"]),
    getContext() {
      const { location, breadcrumbNameMap } = this;
      return {
        location,
        breadcrumbNameMap,
      };
    },

    getLayoutStyle() {
      const { fixSiderbar, layout } = this.setting;
      const { collapsed, isMobile } = this;
      if (fixSiderbar && layout !== "topmenu" && !isMobile) {
        return {
          paddingLeft: collapsed ? "80px" : "256px",
        };
      }
      return null;
    },

    handleMenuCollapse(collapsed) {
      this.changeLayoutCollapsed(collapsed);
    },
    renderSettingDrawer() {
      // Do not render SettingDrawer in production
      // unless it is deployed in preview.pro.ant.design as demo
      // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
      if (
        process.env.NODE_ENV === "production" &&
        ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION !== "site"
      ) {
        return null;
      }
      return <SettingDrawer />;
    },
  },
};
</script>

<style lang="less" src="./BasicLayout.less" module></style>
