import { Form, Input, Button, Alert, Divider } from "ant-design-vue";
import { mapState, mapActions } from "vuex";
import router from "@/router";
import { digitUppercase } from "@/utils/utils";
import styles from "./style.less";

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

const Step2 = Form.create()({
  computed: {
    ...mapState("form", {
      data: state => state.step,
      submitting: state => state.loading,
    }),
  },
  methods: {
    ...mapActions("form", ["submitStepForm"]),
  },
  render() {
    const { form, data, submitting } = this;
    const { getFieldDecorator, validateFields } = form;
    const onPrev = () => {
      router.push("/form/step-form/info");
    };
    const onValidateForm = e => {
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          this.submitStepForm({
            ...data,
            ...values,
          });
        }
      });
    };
    return (
      <Form layout="horizontal" class={styles.stepForm}>
        <Alert
          closable
          showIcon
          message="确认转账后，资金将直接打入对方账户，无法退回。"
          style={{ marginBottom: "24px" }}
        />
        <Form.Item
          {...{ props: formItemLayout }}
          class={styles.stepFormText}
          label="付款账户"
        >
          {data.payAccount}
        </Form.Item>
        <Form.Item
          {...{ props: formItemLayout }}
          class={styles.stepFormText}
          label="收款账户"
        >
          {data.receiverAccount}
        </Form.Item>
        <Form.Item
          {...{ props: formItemLayout }}
          class={styles.stepFormText}
          label="收款人姓名"
        >
          {data.receiverName}
        </Form.Item>
        <Form.Item
          {...{ props: formItemLayout }}
          class={styles.stepFormText}
          label="转账金额"
        >
          <span class={styles.money}>{data.amount}</span>
          <span class={styles.uppercase}>
            （{digitUppercase(data.amount)}）
          </span>
        </Form.Item>
        <Divider style={{ margin: "24px 0" }} />
        <Form.Item
          {...{ props: formItemLayout }}
          label="支付密码"
          required={false}
        >
          {getFieldDecorator("password", {
            initialValue: "123456",
            rules: [
              {
                required: true,
                message: "需要支付密码才能进行支付",
              },
            ],
          })(
            <Input
              type="password"
              autoComplete="off"
              style={{ width: "80%" }}
            />,
          )}
        </Form.Item>
        <Form.Item
          style={{ marginBottom: "8px" }}
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: {
              span: formItemLayout.wrapperCol.span,
              offset: formItemLayout.labelCol.span,
            },
          }}
          label=""
        >
          <Button type="primary" onClick={onValidateForm} loading={submitting}>
            提交
          </Button>
          <Button onClick={onPrev} style={{ marginLeft: "8px" }}>
            上一步
          </Button>
        </Form.Item>
      </Form>
    );
  },
});

export default Step2;
