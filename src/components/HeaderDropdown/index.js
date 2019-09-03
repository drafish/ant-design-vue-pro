import { Dropdown } from "ant-design-vue";
import classNames from "classnames";
import styles from "./index.less";

export default {
  name: "HeaderDropdown",
  functional: true,
  render(h, ctx) {
    const { children } = ctx;
    const { directives } = ctx.data;
    const { overlayClassName, visibleChange = () => {}, ...rest } = ctx.props;

    return (
      <Dropdown
        overlayClassName={classNames(styles.container, overlayClassName)}
        {...{ props: rest, on: { visibleChange }, directives }}
      >
        {children}
      </Dropdown>
    );
  },
};
