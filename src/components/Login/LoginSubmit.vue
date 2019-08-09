<script>
import { Button, Form } from "ant-design-vue";
import styles from "./index.less";

const FormItem = Form.Item;

export default {
  props: {
    className: String,
    loading: Boolean
  },
  render() {
    return (
      <FormItem>
        <Button
          size="large"
          class={styles.submit}
          type="primary"
          htmlType="submit"
          loading={this.loading}
        >
          {this.$slots.default}
        </Button>
      </FormItem>
    );
  }
};
</script>
