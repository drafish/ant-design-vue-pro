import { Icon } from "ant-design-vue";
// import Debounce from 'lodash-decorators/debounce';
import debounce from "lodash/debounce";
import styles from "./index.less";
import RightContent from "./RightContent";

const GlobalHeader = {
  name: "GlobalHeader",
  props: [
    "collapsed",
    "isMobile",
    "logo",
    "onCollapse",
    "notices",
    "currentUser",
    "fetchingNotices",
    "onNoticeVisibleChange",
    "onMenuClick",
    "onNoticeClear",
    "theme"
  ],
  created() {
    // @Debounce(600)
    this.triggerResizeEvent = debounce(function() {
      const event = document.createEvent("HTMLEvents");
      event.initEvent("resize", true, false);
      window.dispatchEvent(event);
    }, 600);
  },
  beforeDestroy() {
    this.triggerResizeEvent.cancel();
  },
  methods: {
    toggle() {
      const { collapsed, onCollapse } = this.$props;
      onCollapse(!collapsed);
      this.triggerResizeEvent();
    }
  },
  render() {
    const { collapsed, isMobile, logo } = this.$props;
    return (
      <div class={styles.header}>
        {isMobile && (
          <router-link to="/" class={styles.logo} key="logo">
            <img src={logo} alt="logo" width="32" />
          </router-link>
        )}
        <span class={styles.trigger} onClick={this.toggle}>
          <Icon type={collapsed ? "menu-unfold" : "menu-fold"} />
        </span>
        <RightContent {...{ props: this.$props }} />
      </div>
    );
  }
};

export default GlobalHeader;
