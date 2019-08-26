import { Dropdown } from "ant-design-vue";
import classNames from "classnames";
import styles from "./index.less";

export default {
  name: "HeaderDropdown",
  functional: true,
  render(h, ctx) {
    const { children, props } = ctx;
    const { overlayClassName, visibleChange = () => {}, ...rest } = props;

    return (
      <Dropdown
        overlayClassName={classNames(styles.container, overlayClassName)}
        {...{ props: rest, on: { visibleChange } }}
      >
        {children}
      </Dropdown>
    );
  }
};
