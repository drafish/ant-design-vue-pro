<script>
import classNames from "classnames";
import { Icon } from "ant-design-vue";

export default {
  props: {
    className: String,
    type: String,
    title: String,
    description: String
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
      error: <Icon class="error" type="close-circle" theme="filled" />,
      success: <Icon class="success" type="check-circle" theme="filled" />
    };

    const clsString = classNames("result", className);

    return (
      <div class={clsString}>
        <div class="icon">{iconMap[type]}</div>
        <div class="title">{title}</div>
        {description && <div class="description">{description}</div>}
        {extra && <div class="extra">{extra}</div>}
        {actions && <div class="actions">{actions}</div>}
      </div>
    );
  }
};
</script>

<style lang="less" scoped>
@import "~ant-design-vue/lib/style/themes/default.less";

.result {
  width: 72%;
  margin: 0 auto;
  text-align: center;
  @media screen and (max-width: @screen-xs) {
    width: 100%;
  }

  .icon {
    margin-bottom: 24px;
    font-size: 72px;
    line-height: 72px;

    & > .success {
      color: @success-color;
    }

    & > .error {
      color: @error-color;
    }
  }

  .title {
    margin-bottom: 16px;
    color: @heading-color;
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
  }

  .description {
    margin-bottom: 24px;
    color: @text-color-secondary;
    font-size: 14px;
    line-height: 22px;
  }

  .extra {
    padding: 24px 40px;
    text-align: left;
    background: #fafafa;
    border-radius: @border-radius-sm;

    @media screen and (max-width: @screen-xs) {
      padding: 18px 20px;
    }
  }

  .actions {
    margin-top: 32px;

    button:not(:last-child) {
      margin-right: 8px;
    }
  }
}
</style>
