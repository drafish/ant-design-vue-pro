<script>
import { mapState, mapActions } from "vuex";
import { formatMessage } from "@/locales";
import { Layout, message } from "ant-design-vue";
import GlobalHeader from "@/components/GlobalHeader";
import TopNavHeader from "@/components/TopNavHeader";
import styles from "./Header.less";

const { Header } = Layout;

const HeaderView = {
  data() {
    return { visible: true, fetchingNotices: false };
  },

  props: [
    "autoHideHeader",
    "isMobile",
    "handleMenuCollapse",
    "menuData",
    "logo"
  ],

  computed: {
    ...mapState("user", {
      currentUser: state => state.currentUser
    }),
    ...mapState("global", {
      collapsed: state => state.collapsed,
      notices: state => state.notices
    }),
    ...mapState("setting", {
      setting: state => state
    })
  },

  beforeUpdate() {
    if (!this.autoHideHeader && !this.visible) {
      return {
        visible: true
      };
    }
    return null;
  },

  mounted() {
    document.addEventListener("scroll", this.handScroll, { passive: true });
  },

  beforeDestroy() {
    document.removeEventListener("scroll", this.handScroll);
  },

  methods: {
    ...mapActions("login", ["logout"]),
    ...mapActions("global", ["fetchNotices", "clearNotices"]),
    getHeadWidth() {
      const { isMobile, collapsed, setting } = this;
      const { fixedHeader, layout } = setting;
      if (isMobile || !fixedHeader || layout === "topmenu") {
        return "100%";
      }
      return collapsed ? "calc(100% - 80px)" : "calc(100% - 256px)";
    },

    handleNoticeClear(type) {
      message.success(
        `${formatMessage("component.noticeIcon.cleared")} ${formatMessage(
          `component.globalHeader.${type}`
        )}`
      );
      this.clearNotices(type);
    },

    handleMenuClick({ key }) {
      if (key === "userCenter") {
        this.$router.push("/account/center");
        return;
      }
      if (key === "triggerError") {
        this.$router.push("/exception/trigger");
        return;
      }
      if (key === "userinfo") {
        this.$router.push("/account/settings/base");
        return;
      }
      if (key === "logout") {
        this.logout();
      }
    },

    handleNoticeVisibleChange(visible) {
      if (visible) {
        this.fetchingNotices = true;
        this.fetchNotices().then(() => {
          this.fetchingNotices = false;
        });
      }
    },

    handScroll() {
      const { autoHideHeader } = this.$props;
      const { visible } = this.$data;
      if (!autoHideHeader) {
        return;
      }
      const scrollTop =
        document.body.scrollTop + document.documentElement.scrollTop;
      if (!this.ticking) {
        this.ticking = true;
        requestAnimationFrame(() => {
          if (this.oldScrollTop > scrollTop) {
            this.visible = true;
          } else if (scrollTop > 300 && visible) {
            this.visible = false;
          } else if (scrollTop < 300 && !visible) {
            this.visible = true;
          }
          this.oldScrollTop = scrollTop;
          this.ticking = false;
        });
      }
    }
  },

  render() {
    const { isMobile, handleMenuCollapse, setting } = this;
    const { navTheme, layout, fixedHeader } = setting;
    const { visible } = this.$data;
    const isTop = layout === "topmenu";
    const width = this.getHeadWidth();
    const HeaderDom = visible ? (
      <Header
        style={{ padding: 0, width, zIndex: 2 }}
        class={fixedHeader ? styles.fixedHeader : ""}
      >
        {isTop && !isMobile ? (
          <TopNavHeader
            theme={navTheme}
            mode="horizontal"
            currentUser={this.currentUser}
            notices={this.notices}
            fetchingNotices={this.fetchingNotices}
            {...{
              props: {
                ...this.$props,
                onCollapse: handleMenuCollapse,
                onNoticeClear: this.handleNoticeClear,
                onMenuClick: this.handleMenuClick,
                onNoticeVisibleChange: this.handleNoticeVisibleChange
              }
            }}
          />
        ) : (
          <GlobalHeader
            currentUser={this.currentUser}
            collapsed={this.collapsed}
            notices={this.notices}
            fetchingNotices={this.fetchingNotices}
            {...{
              props: {
                ...this.$props,
                onCollapse: handleMenuCollapse,
                onNoticeClear: this.handleNoticeClear,
                onMenuClick: this.handleMenuClick,
                onNoticeVisibleChange: this.handleNoticeVisibleChange
              }
            }}
          />
        )}
      </Header>
    ) : null;
    return <transition name="fade">{HeaderDom}</transition>;
  }
};

export default HeaderView;
</script>
