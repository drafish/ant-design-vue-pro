import classNames from "classnames";
import { Row } from "ant-design-vue";
import { cloneElement } from "ant-design-vue/es/_util/vnode";
import styles from "./index.less";
import responsive from "./responsive";

const DescriptionList = {
  functional: true,
  render(h, ctx) {
    const { children } = ctx;
    const {
      className,
      title,
      col = 3,
      layout = "horizontal",
      gutter = 32,
      size,
      ...restProps
    } = ctx.props;
    const clsString = classNames(
      styles.descriptionList,
      styles[layout],
      className,
      {
        [styles.small]: size === "small",
        [styles.large]: size === "large",
      },
    );
    const column = col > 4 ? 4 : col;
    return (
      <div class={clsString} {...{ props: restProps }}>
        {title ? <div class={styles.title}>{title}</div> : null}
        <Row gutter={gutter}>
          {children.map(child =>
            child
              ? cloneElement(child, { props: { ...responsive[column] } })
              : child,
          )}
        </Row>
      </div>
    );
  },
};

export default DescriptionList;
