import RightContent from "../GlobalHeader/RightContent";
import BaseMenu from "../SiderMenu/BaseMenu";
import { getFlatMenuKeys } from "../SiderMenu/SiderMenuUtils";
import styles from "./index.less";
import { title } from "../../defaultSettings";

const TopNavHeader = {
  name: "TopNavHeader",
  props: [
    "contentWidth",
    "menuData",
    "logo",
    "notices",
    "currentUser",
    "fetchingNotices",
    "onNoticeVisibleChange",
    "onMenuClick",
    "onNoticeClear",
    "theme",
    "isMobile",
    "onCollapse",
    "openKeys",
    "mode",
    "collapsed",
    "fixedHeader",
    "layout"
  ],
  computed: {
    maxWidth() {
      const props = this.$props;
      return {
        maxWidth:
          (props.contentWidth === "Fixed" && window.innerWidth > 1200
            ? 1200
            : window.innerWidth) -
          280 -
          120 -
          40
      };
    }
  },

  render() {
    const { theme, contentWidth, menuData, logo } = this.$props;
    const { maxWidth } = this;
    const flatMenuKeys = getFlatMenuKeys(menuData);
    return (
      <div class={`${styles.head} ${theme === "light" ? styles.light : ""}`}>
        <div
          ref={ref => {
            this.maim = ref;
          }}
          class={`${styles.main} ${
            contentWidth === "Fixed" ? styles.wide : ""
          }`}
        >
          <div class={styles.left}>
            <div class={styles.logo} key="logo" id="logo">
              <router-link to="/">
                <img src={logo} alt="logo" />
                <h1>{title}</h1>
              </router-link>
            </div>
            <div
              style={{
                maxWidth
              }}
            >
              <BaseMenu
                {...{ props: this.$props }}
                flatMenuKeys={flatMenuKeys}
                className={styles.menu}
                handleOpenChange={() => {}}
              />
            </div>
          </div>
          <RightContent {...{ props: this.$props }} />
        </div>
      </div>
    );
  }
};

export default TopNavHeader;
