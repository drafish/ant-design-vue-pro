import { Col } from "ant-design-vue";
import styles from "./index.less";

const Description = {
  functional: true,
  render(h, ctx) {
    const { children } = ctx;
    const { term, ...restProps } = ctx.props;
    return (
      <Col {...{ props: { ...restProps } }}>
        {term && <div class={styles.term}>{term}</div>}
        {children !== null && children !== undefined && (
          <div class={styles.detail}>{children}</div>
        )}
      </Col>
    );
  },
};

export default Description;
