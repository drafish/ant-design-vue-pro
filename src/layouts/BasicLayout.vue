<template>
  <Media query="(max-width: 599px)" v-slot="isMobile">
    <ContainerQuery :query="query" v-model="params">
      <Provider :value="getContext()">
        <div :class="className">
          <a-layout>
            <SiderMenu
              :logo="logo"
              :theme="setting.navTheme"
              :onCollapse="handleMenuCollapse"
              :menuData="menuData"
              :isMobile="isMobile"
              :collapsed="collapsed"
            />
            <a-layout :style="layoutStyle">
              <Header
                :menuData="menuData"
                :handleMenuCollapse="handleMenuCollapse"
                :logo="logo"
                :isMobile="isMobile"
              />
              <a-layout-content :class="$style.content" :style="contentStyle">
                <router-view />
              </a-layout-content>
              <Footer />
            </a-layout>
          </a-layout>
          <Authorized :authority="['admin']">
            <SettingDrawer />
          </Authorized>
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
import logo from "@/assets/logo.svg";

import Header from "./Header";
import Footer from "../components/GlobalFooter";
import SettingDrawer from "../components/SettingDrawer";

const Provider = Context.Provider;
const query = {
  "screen-xs": {
    maxWidth: 575
  },
  "screen-sm": {
    minWidth: 576,
    maxWidth: 767
  },
  "screen-md": {
    minWidth: 768,
    maxWidth: 991
  },
  "screen-lg": {
    minWidth: 992,
    maxWidth: 1199
  },
  "screen-xl": {
    minWidth: 1200,
    maxWidth: 1599
  },
  "screen-xxl": {
    minWidth: 1600
  }
};

export default {
  data() {
    return {
      query,
      params: {},
      logo
    };
  },
  computed: {
    ...mapState("global", {
      collapsed: state => state.collapsed
    }),
    ...mapState("setting", {
      setting: state => state
    }),
    ...mapState("menu", {
      menuData: state => state.menuData,
      breadcrumbNameMap: state => state.breadcrumbNameMap
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
        minHeight: "100vh"
      };
    },
    contentStyle() {
      return !this.setting.fixedHeader ? { paddingTop: 0 } : {};
    }
  },
  components: {
    Header,
    Footer,
    SiderMenu,
    SettingDrawer,
    Media,
    ContainerQuery,
    Provider
  },
  mounted() {
    const { children, path, authority } = this.$router.options.routes[1];
    this.getMenuData({ routes: children, path, authority });
  },
  methods: {
    ...mapActions("menu", ["getMenuData"]),
    ...mapMutations("global", ["changeLayoutCollapsed"]),
    getContext() {
      const { location, breadcrumbNameMap } = this;
      return {
        location,
        breadcrumbNameMap
      };
    },

    getLayoutStyle() {
      const { fixSiderbar, layout } = this.setting;
      const { collapsed, isMobile } = this;
      if (fixSiderbar && layout !== "topmenu" && !isMobile) {
        return {
          paddingLeft: collapsed ? "80px" : "256px"
        };
      }
      return null;
    },

    handleMenuCollapse(collapsed) {
      this.changeLayoutCollapsed(collapsed);
    }
  }
};
</script>

<style lang="less" src="./BasicLayout.less" module></style>
