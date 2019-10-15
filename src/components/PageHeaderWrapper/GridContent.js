import { mapState } from "vuex";
import styles from "./GridContent.less";

const GridContent = {
  name: "GridContent",
  computed: {
    ...mapState("setting", {
      contentWidth: state => state.contentWidth,
    }),
  },
  render() {
    const children = this.$slots.default;
    const { contentWidth } = this;
    let className = `${styles.main}`;
    if (contentWidth === "Fixed") {
      className = `${styles.main} ${styles.wide}`;
    }
    return <div class={className}>{children}</div>;
  },
};

export default GridContent;
