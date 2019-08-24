import { Layout } from "ant-design-vue";
import classNames from "classnames";
import styles from "./index.less";
import { getDefaultCollapsedSubMenus } from "./SiderMenuUtils";
import { title } from "../../defaultSettings";
import BaseMenu from "./BaseMenu";

const { Sider } = Layout;

let firstMount = true;

const SiderMenu = {
  data() {
    return {
      openKeys: getDefaultCollapsedSubMenus(this.$props)
    };
  },

  watch: {
    "flatMenuKeys.length": function() {
      this.openKeys = getDefaultCollapsedSubMenus(this.$props);
    },
    "location.pathname": function() {
      this.openKeys = getDefaultCollapsedSubMenus(this.$props);
    }
  },

  props: [
    "logo",
    "fixSiderbar",
    "flatMenuKeys",
    "onCollapse",
    "isMobile",
    "theme",
    "className",
    "collapsed",
    "fixedHeader",
    "layout",
    "menuData"
  ],

  mounted() {
    firstMount = false;
  },

  methods: {
    isMainMenu(key) {
      const { menuData } = this.$props;
      return menuData.some(item => {
        if (key) {
          return item.key === key || item.path === key;
        }
        return false;
      });
    },

    handleOpenChange(openKeys) {
      const moreThanOne =
        openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
      this.openKeys = moreThanOne ? [openKeys.pop()] : [...openKeys];
    }
  },

  render() {
    const {
      logo,
      collapsed,
      fixSiderbar,
      theme,
      isMobile,
      onCollapse
    } = this.$props;
    const { openKeys } = this.$data;
    const defaultProps = collapsed ? {} : { openKeys };

    const siderClassName = classNames(styles.sider, {
      [styles.fixSiderBar]: fixSiderbar,
      [styles.light]: theme === "light"
    });
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        onCollapse={collapse => {
          if (firstMount || !isMobile) {
            onCollapse(collapse);
          }
        }}
        width={256}
        theme={theme}
        class={siderClassName}
      >
        <div class={styles.logo} id="logo">
          <a to="/">
            <img src={logo} alt="logo" />
            <h1>{title}</h1>
          </a>
        </div>
        <BaseMenu
          {...{ props: this.$props }}
          mode="inline"
          handleOpenChange={this.handleOpenChange}
          style={{ padding: "16px 0", width: "100%" }}
          {...{ props: defaultProps }}
        />
      </Sider>
    );
  }
};

export default SiderMenu;
