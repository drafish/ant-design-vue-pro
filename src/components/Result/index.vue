<script>
import classNames from "classnames";
import { Icon } from "ant-design-vue";
import styles from "./index.less";

export default {
  props: {
    className: String,
    type: String,
    title: String,
    description: String,
  },
  render() {
    const { className, type } = this.$props;

    let { title, description } = this.$props;

    const { extra, actions } = this.$slots;

    if (this.$slots.title) {
      title = this.$slots.title;
    }

    if (this.$slots.description) {
      description = this.$slots.description;
    }

    const iconMap = {
      error: <Icon class={styles.error} type="close-circle" theme="filled" />,
      success: (
        <Icon class={styles.success} type="check-circle" theme="filled" />
      ),
    };

    const clsString = classNames(styles.result, className);

    return (
      <div class={clsString}>
        <div class={styles.icon}>{iconMap[type]}</div>
        <div class={styles.title}>{title}</div>
        {description && <div class={styles.description}>{description}</div>}
        {extra && <div class={styles.extra}>{extra}</div>}
        {actions && <div class={styles.actions}>{actions}</div>}
      </div>
    );
  },
};
</script>
