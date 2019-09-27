import { Form, Input, Button, Select, Divider } from "ant-design-vue";
import { mapState, mapMutations } from "vuex";
import router from "@/router";
import styles from "./style.less";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

const Step1 = Form.create()({
  computed: {
    ...mapState("form", {
      data: state => state.step,
    }),
  },
  methods: {
    ...mapMutations("form", ["saveStepFormData"]),
  },
  render() {
    const { form, data } = this;
    const { getFieldDecorator, validateFields } = form;
    const onValidateForm = () => {
      validateFields((err, values) => {
        if (!err) {
          this.saveStepFormData(values);
          router.push("/form/step-form/confirm");
        }
      });
    };
    return (
      <div>
        <Form layout="horizontal" class={styles.stepForm} hideRequiredMark>
          <Form.Item {...{ props: formItemLayout }} label="付款账户">
            {getFieldDecorator("payAccount", {
              initialValue: data.payAccount,
              rules: [{ required: true, message: "请选择付款账户" }],
            })(
              <Select placeholder="test@example.com">
                <Option value="ant-design@alipay.com">
                  ant-design@alipay.com
                </Option>
              </Select>,
            )}
          </Form.Item>
          <Form.Item {...{ props: formItemLayout }} label="收款账户">
            <Input.Group compact>
              <Select defaultValue="alipay" style={{ width: "100px" }}>
                <Option value="alipay">支付宝</Option>
                <Option value="bank">银行账户</Option>
              </Select>
              {getFieldDecorator("receiverAccount", {
                initialValue: data.receiverAccount,
                rules: [
                  { required: true, message: "请输入收款人账户" },
                  { type: "email", message: "账户名应为邮箱格式" },
                ],
              })(
                <Input
                  style={{ width: "calc(100% - 100px)" }}
                  placeholder="test@example.com"
                />,
              )}
            </Input.Group>
          </Form.Item>
          <Form.Item {...{ props: formItemLayout }} label="收款人姓名">
            {getFieldDecorator("receiverName", {
              initialValue: data.receiverName,
              rules: [{ required: true, message: "请输入收款人姓名" }],
            })(<Input placeholder="请输入收款人姓名" />)}
          </Form.Item>
          <Form.Item {...{ props: formItemLayout }} label="转账金额">
            {getFieldDecorator("amount", {
              initialValue: data.amount,
              rules: [
                { required: true, message: "请输入转账金额" },
                {
                  pattern: /^(\d+)((?:\.\d+)?)$/,
                  message: "请输入合法金额数字",
                },
              ],
            })(<Input prefix="￥" placeholder="请输入金额" />)}
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: {
                span: formItemLayout.wrapperCol.span,
                offset: formItemLayout.labelCol.span,
              },
            }}
            label=""
          >
            <Button type="primary" onClick={onValidateForm}>
              下一步
            </Button>
          </Form.Item>
        </Form>
        <Divider style={{ margin: "40px 0 24px" }} />
        <div class={styles.desc}>
          <h3>说明</h3>
          <h4>转账到支付宝账户</h4>
          <p>
            如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
          </p>
          <h4>转账到银行卡</h4>
          <p>
            如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。
          </p>
        </div>
      </div>
    );
  },
});

export default Step1;
