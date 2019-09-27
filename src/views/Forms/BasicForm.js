import { formatMessage, FormattedMessage } from "@/locales";
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Icon,
  Tooltip,
} from "ant-design-vue";
import { mapState, mapActions } from "vuex";
import styles from "./style.less";

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const BasicForms = Form.create()({
  computed: {
    ...mapState("form", {
      submitting: state => state.loading,
    }),
  },
  methods: {
    ...mapActions("form", ["submitRegularForm"]),
    handleSubmit(e) {
      const { form } = this;
      e.preventDefault();
      form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.submitRegularForm(values);
        }
      });
    },
  },

  render() {
    const { submitting } = this;
    const {
      form: { getFieldDecorator, getFieldValue },
    } = this;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <Card bordered={false}>
        <Form
          onSubmit={this.handleSubmit}
          hideRequiredMark
          style={{ marginTop: "8px" }}
        >
          <FormItem
            {...{ props: formItemLayout }}
            label={<FormattedMessage id="form.title.label" />}
          >
            {getFieldDecorator("title", {
              rules: [
                {
                  required: true,
                  message: formatMessage({ id: "validation.title.required" }),
                },
              ],
            })(
              <Input
                placeholder={formatMessage({ id: "form.title.placeholder" })}
              />,
            )}
          </FormItem>
          <FormItem
            {...{ props: formItemLayout }}
            label={<FormattedMessage id="form.date.label" />}
          >
            {getFieldDecorator("date", {
              rules: [
                {
                  required: true,
                  message: formatMessage({ id: "validation.date.required" }),
                },
              ],
            })(
              <RangePicker
                style={{ width: "100%" }}
                placeholder={[
                  formatMessage({ id: "form.date.placeholder.start" }),
                  formatMessage({ id: "form.date.placeholder.end" }),
                ]}
              />,
            )}
          </FormItem>
          <FormItem
            {...{ props: formItemLayout }}
            label={<FormattedMessage id="form.goal.label" />}
          >
            {getFieldDecorator("goal", {
              rules: [
                {
                  required: true,
                  message: formatMessage({ id: "validation.goal.required" }),
                },
              ],
            })(
              <TextArea
                style={{ minHeight: 32 }}
                placeholder={formatMessage({ id: "form.goal.placeholder" })}
                rows={4}
              />,
            )}
          </FormItem>
          <FormItem
            {...{ props: formItemLayout }}
            label={<FormattedMessage id="form.standard.label" />}
          >
            {getFieldDecorator("standard", {
              rules: [
                {
                  required: true,
                  message: formatMessage({
                    id: "validation.standard.required",
                  }),
                },
              ],
            })(
              <TextArea
                style={{ minHeight: 32 }}
                placeholder={formatMessage({
                  id: "form.standard.placeholder",
                })}
                rows={4}
              />,
            )}
          </FormItem>
          <FormItem
            {...{ props: formItemLayout }}
            label={
              <span>
                <FormattedMessage id="form.client.label" />
                <em class={styles.optional}>
                  <FormattedMessage id="form.optional" />
                  <Tooltip
                    title={<FormattedMessage id="form.client.label.tooltip" />}
                  >
                    <Icon type="info-circle-o" style={{ marginRight: "4px" }} />
                  </Tooltip>
                </em>
              </span>
            }
          >
            {getFieldDecorator("client")(
              <Input
                placeholder={formatMessage({ id: "form.client.placeholder" })}
              />,
            )}
          </FormItem>
          <FormItem
            {...{ props: formItemLayout }}
            label={
              <span>
                <FormattedMessage id="form.invites.label" />
                <em class={styles.optional}>
                  <FormattedMessage id="form.optional" />
                </em>
              </span>
            }
          >
            {getFieldDecorator("invites")(
              <Input
                placeholder={formatMessage({
                  id: "form.invites.placeholder",
                })}
              />,
            )}
          </FormItem>
          <FormItem
            {...{ props: formItemLayout }}
            label={
              <span>
                <FormattedMessage id="form.weight.label" />
                <em class={styles.optional}>
                  <FormattedMessage id="form.optional" />
                </em>
              </span>
            }
          >
            {getFieldDecorator("weight")(
              <InputNumber
                placeholder={formatMessage({ id: "form.weight.placeholder" })}
                min={0}
                max={100}
              />,
            )}
            <span class="ant-form-text">%</span>
          </FormItem>
          <FormItem
            {...{ props: formItemLayout }}
            label={<FormattedMessage id="form.public.label" />}
            help={<FormattedMessage id="form.public.label.help" />}
          >
            <div>
              {getFieldDecorator("public", {
                initialValue: "1",
              })(
                <Radio.Group>
                  <Radio value="1">
                    <FormattedMessage id="form.public.radio.public" />
                  </Radio>
                  <Radio value="2">
                    <FormattedMessage id="form.public.radio.partially-public" />
                  </Radio>
                  <Radio value="3">
                    <FormattedMessage id="form.public.radio.private" />
                  </Radio>
                </Radio.Group>,
              )}
              <FormItem style={{ marginBottom: "0px" }}>
                {getFieldDecorator("publicUsers")(
                  <Select
                    mode="multiple"
                    placeholder={formatMessage({
                      id: "form.publicUsers.placeholder",
                    })}
                    style={{
                      margin: "8px 0",
                      display:
                        getFieldValue("public") === "2" ? "block" : "none",
                    }}
                  >
                    <Option value="1">
                      <FormattedMessage id="form.publicUsers.option.A" />
                    </Option>
                    <Option value="2">
                      <FormattedMessage id="form.publicUsers.option.B" />
                    </Option>
                    <Option value="3">
                      <FormattedMessage id="form.publicUsers.option.C" />
                    </Option>
                  </Select>,
                )}
              </FormItem>
            </div>
          </FormItem>
          <FormItem
            {...{ props: submitFormLayout }}
            style={{ marginTop: "32px" }}
          >
            <Button type="primary" htmlType="submit" loading={submitting}>
              <FormattedMessage id="form.submit" />
            </Button>
            <Button style={{ marginLeft: "8px" }}>
              <FormattedMessage id="form.save" />
            </Button>
          </FormItem>
        </Form>
      </Card>
    );
  },
});

export default BasicForms;
