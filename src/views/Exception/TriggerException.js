import { Button, Spin, Card } from "ant-design-vue";
import { mapActions } from "vuex";
import styles from "./style.less";

const TriggerException = {
  name: "TriggerException",
  data() {
    return {
      isloading: false,
    };
  },

  methods: {
    ...mapActions("error", ["query"]),
    triggerError(code) {
      this.isloading = true;

      this.query(code);
    },
  },

  render() {
    const { isloading } = this.$data;
    return (
      <Card>
        <Spin spinning={isloading} wrapperClassName={styles.trigger}>
          <Button type="danger" onClick={() => this.triggerError(401)}>
            触发401
          </Button>
          <Button type="danger" onClick={() => this.triggerError(403)}>
            触发403
          </Button>
          <Button type="danger" onClick={() => this.triggerError(500)}>
            触发500
          </Button>
          <Button type="danger" onClick={() => this.triggerError(404)}>
            触发404
          </Button>
        </Spin>
      </Card>
    );
  },
};

export default TriggerException;
