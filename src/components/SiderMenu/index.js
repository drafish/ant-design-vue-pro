import { Drawer } from "ant-design-vue";
import SiderMenu from "./SiderMenu";
import { getFlatMenuKeys } from "./SiderMenuUtils";

const SiderMenuWrapper = {
  functional: true,
  render(h, { props }) {
    const { isMobile, menuData, collapsed, onCollapse } = props;
    const flatMenuKeys = getFlatMenuKeys(menuData);

    return isMobile ? (
      <Drawer
        visible={!collapsed}
        placement="left"
        onClose={() => onCollapse(true)}
        style={{
          padding: 0,
          height: "100vh"
        }}
      >
        <SiderMenu
          {...{ props }}
          flatMenuKeys={flatMenuKeys}
          collapsed={isMobile ? false : collapsed}
        />
      </Drawer>
    ) : (
      <SiderMenu {...{ props }} flatMenuKeys={flatMenuKeys} />
    );
  }
};

export default SiderMenuWrapper;
