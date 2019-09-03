import classNames from "classnames";
import { Menu, Icon } from "ant-design-vue";
import { urlToList } from "../_utils/pathTools";
import { getMenuMatches } from "./SiderMenuUtils";
import { isUrl } from "@/utils/utils";
import styles from "./index.less";
import IconFont from "@/components/IconFont";

const { SubMenu } = Menu;

const BaseMenu = {
  props: [
    "flatMenuKeys",
    "isMobile",
    "onCollapse",
    "openKeys",
    "theme",
    "mode",
    "className",
    "collapsed",
    "fixedHeader",
    "layout",
    "handleOpenChange",
    // "style",
    "menuData",
    "pathname",
  ],

  methods: {
    // Allow menu.js config icon as string or ReactNode
    //   icon: 'setting',
    //   icon: 'icon-geren' #For Iconfont ,
    //   icon: 'http://demo.com/icon.png',
    //   icon: <Icon type="setting" />,
    getIcon(icon) {
      if (typeof icon === "string") {
        if (isUrl(icon)) {
          return (
            <Icon
              component={() => (
                <img src={icon} alt="icon" className={styles.icon} />
              )}
            />
          );
        }
        if (icon.startsWith("icon-")) {
          return <IconFont type={icon} />;
        }
        return <Icon type={icon} />;
      }
      return icon;
    },
    /**
     * 获得菜单子节点
     * @memberof SiderMenu
     */
    getNavMenuItems(menusData) {
      if (!menusData) {
        return [];
      }
      return menusData
        .filter(item => item.name && !item.hideInMenu)
        .map(item => this.getSubMenuOrItem(item))
        .filter(item => item);
    },

    // Get the currently selected menu
    getSelectedMenuKeys(pathname) {
      const { flatMenuKeys } = this.$props;
      if (flatMenuKeys.length) {
        return urlToList(pathname).filter(itemPath =>
          getMenuMatches(flatMenuKeys, itemPath).pop(),
        );
      } else {
        return [];
      }
    },

    /**
     * get SubMenu or Item
     */
    getSubMenuOrItem(item) {
      // doc: add hideChildrenInMenu
      if (
        item.children &&
        !item.hideChildrenInMenu &&
        item.children.some(child => child.name)
      ) {
        // const { name } = item;
        const name = this.$t(item.locale);
        return (
          <SubMenu
            title={
              item.icon ? (
                <span>
                  {this.getIcon(item.icon)}
                  <span>{name}</span>
                </span>
              ) : (
                name
              )
            }
            key={item.path}
          >
            {this.getNavMenuItems(item.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>
      );
    },

    /**
     * 判断是否是http链接.返回 Link 或 a
     * Judge whether it is http link.return a or Link
     * @memberof SiderMenu
     */
    getMenuItemPath(item) {
      // const { name } = item;
      const name = this.$t(item.locale);
      const itemPath = this.conversionPath(item.path);
      const icon = this.getIcon(item.icon);
      const { target } = item;
      // Is it a http link
      if (/^https?:\/\//.test(itemPath)) {
        return (
          <a href={itemPath} target={target}>
            {icon}
            <span>{name}</span>
          </a>
        );
      }
      const { isMobile, onCollapse, pathname } = this.$props;
      return (
        <router-link
          to={itemPath}
          target={target}
          replace={itemPath === pathname}
          onClick={
            isMobile
              ? () => {
                  onCollapse(true);
                }
              : () => {}
          }
        >
          {icon}
          <span>{name}</span>
        </router-link>
      );
    },

    conversionPath(path) {
      if (path && path.indexOf("http") === 0) {
        return path;
      }
      return `/${path || ""}`.replace(/\/+/g, "/");
    },

    getPopupContainer(fixedHeader, layout) {
      if (fixedHeader && layout === "topmenu") {
        return this.wrap;
      }
      return document.body;
    },

    getRef(ref) {
      this.wrap = ref;
    },
  },

  render() {
    const {
      openKeys,
      theme,
      mode,
      className,
      collapsed,
      fixedHeader,
      layout,
      pathname,
    } = this.$props;

    // if pathname can't match, use the nearest parent's key
    let selectedKeys = this.getSelectedMenuKeys(pathname);
    if (!selectedKeys.length && openKeys) {
      selectedKeys = [openKeys[openKeys.length - 1]];
    }
    let props = {};
    if (openKeys && !collapsed) {
      props = {
        openKeys: openKeys.length === 0 ? [...selectedKeys] : openKeys,
      };
    }
    const { handleOpenChange, style, menuData } = this.$props;
    const cls = classNames(className, {
      "top-nav-menu": mode === "horizontal",
    });

    return (
      <div>
        <Menu
          key="Menu"
          mode={mode}
          theme={theme}
          onOpenChange={handleOpenChange}
          selectedKeys={selectedKeys}
          style={style}
          class={cls}
          {...{ props }}
          getPopupContainer={() => this.getPopupContainer(fixedHeader, layout)}
        >
          {this.getNavMenuItems(menuData)}
        </Menu>
        <div ref={this.getRef} />
      </div>
    );
  },
};

export default BaseMenu;
