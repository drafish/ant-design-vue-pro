import { Button, Row, Col } from "ant-design-vue";
import { mapState } from "vuex";
import router from "@/router";
import Result from "@/components/Result";
import styles from "./style.less";

const Step3 = {
  computed: {
    ...mapState("form", {
      data: state => state.step,
    }),
  },
  render() {
    const { data } = this;
    const onFinish = () => {
      router.push("/form/step-form/info");
    };
    const information = (
      <template slot="extra">
        <div class={styles.information}>
          <Row>
            <Col xs={24} sm={8} class={styles.label}>
              付款账户：
            </Col>
            <Col xs={24} sm={16}>
              {data.payAccount}
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={8} class={styles.label}>
              收款账户：
            </Col>
            <Col xs={24} sm={16}>
              {data.receiverAccount}
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={8} class={styles.label}>
              收款人姓名：
            </Col>
            <Col xs={24} sm={16}>
              {data.receiverName}
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={8} class={styles.label}>
              转账金额：
            </Col>
            <Col xs={24} sm={16}>
              <span class={styles.money}>{data.amount}</span> 元
            </Col>
          </Row>
        </div>
      </template>
    );
    const actions = (
      <template slot="actions">
        <Button type="primary" onClick={onFinish}>
          再转一笔
        </Button>
        <Button>查看账单</Button>
      </template>
    );
    return (
      <Result
        type="success"
        title="操作成功"
        description="预计两小时内到账"
        className={styles.result}
      >
        {information}
        {actions}
      </Result>
    );
  },
};

export default Step3;
