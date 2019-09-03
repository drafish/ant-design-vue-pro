<template>
  <div :class="$style.main">
    <h3>{{ $t("app.register.register") }}</h3>
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item>
        <a-input
          size="large"
          :placeholder="$t('form.email.placeholder')"
          v-decorator="[
            'mail',
            {
              rules: [
                {
                  required: true,
                  message: $t('validation.email.required'),
                },
                {
                  type: 'email',
                  message: $t('validation.email.wrong-format'),
                },
              ],
            },
          ]"
        />
      </a-form-item>
      <a-form-item :help="help">
        <a-popover
          :overlayStyle="{ width: '240px' }"
          placement="right"
          :visible="visible"
        >
          <template slot="content">
            <div style="padding: 4px 0">
              <VNodes :vnodes="passwordStatusMap()" />
              <VNodes :vnodes="renderPasswordProgress()" />
              <div style="margin-top: 10">
                {{ $t("validation.password.strength.msg") }}
              </div>
            </div>
          </template>
          <a-input
            type="password"
            size="large"
            :placeholder="$t('form.password.placeholder')"
            v-decorator="[
              'password',
              {
                rules: [{ validator: this.checkPassword }],
              },
            ]"
          />
        </a-popover>
      </a-form-item>
      <a-form-item>
        <a-input
          type="password"
          size="large"
          :placeholder="$t('form.confirm-password.placeholder')"
          v-decorator="[
            'confirm',
            {
              rules: [
                {
                  required: true,
                  message: $t('validation.confirm-password.required'),
                },
                {
                  validator: this.checkConfirm,
                },
              ],
            },
          ]"
        />
      </a-form-item>
      <a-form-item>
        <a-input-group compact>
          <a-select
            size="large"
            :value="prefix"
            style="width: 20%"
            @change="changePrefix"
          >
            <a-select-option value="86">+86</a-select-option>
            <a-select-option value="87">+87</a-select-option>
          </a-select>
          <a-input
            size="large"
            style="width: 80%"
            :placeholder="$t('form.phone-number.placeholder')"
            v-decorator="[
              'mobile',
              {
                rules: [
                  {
                    required: true,
                    message: $t('validation.phone-number.required'),
                  },
                  {
                    pattern: /^\d{11}$/,
                    message: $t('validation.phone-number.wrong-format'),
                  },
                ],
              },
            ]"
          />
        </a-input-group>
      </a-form-item>
      <a-form-item>
        <a-row :gutter="8">
          <a-col :span="16">
            <a-input
              size="large"
              type="Captcha"
              :placeholder="$t('form.verification-code.placeholder')"
              v-decorator="[
                'captcha',
                {
                  rules: [
                    {
                      required: true,
                      message: $t('validation.verification-code.required'),
                    },
                  ],
                },
              ]"
            />
          </a-col>
          <a-col :span="8">
            <a-button
              :class="$style.getCaptcha"
              size="large"
              @click="onGetCaptcha"
              :disabled="!!count"
              >{{
                count ? `${count} s` : $t("app.register.get-verification-code")
              }}</a-button
            >
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item>
        <a-button
          size="large"
          :class="$style.submit"
          type="primary"
          htmlType="submit"
          :loading="submitting"
          >{{ $t("app.register.register") }}</a-button
        >
        <router-link :class="$style.login" to="/user/login">
          {{ $t("app.register.sign-in") }}
        </router-link>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { Modal } from "ant-design-vue";

const passwordProgressMap = {
  ok: "success",
  pass: "normal",
  poor: "exception",
};

export default {
  components: {
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
  },
  data() {
    return {
      form: this.$form.createForm(this),
      count: 0,
      confirmDirty: false,
      visible: false,
      help: "",
      prefix: "86",
      submitting: false,
    };
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    ...mapActions("login", ["register"]),
    handleSubmit(e) {
      e.preventDefault();
      const { form } = this;
      form.validateFields({ force: true }, (err, values) => {
        if (!err) {
          this.submitting = true;
          const { prefix } = this;
          this.register({
            ...values,
            prefix,
          }).then(() => {
            this.submitting = false;
          });
        }
      });
    },
    onGetCaptcha() {
      this.count = 59;
      this.interval = setInterval(() => {
        this.count -= 1;
        if (this.count === 0) {
          clearInterval(this.interval);
        }
      }, 1000);
      Modal.info({
        title: this.$t("app.login.verification-code-warning"),
      });
    },
    changePrefix(value) {
      this.prefix = value;
    },
    getPasswordStatus() {
      const { form } = this;
      const value = form.getFieldValue("password");
      if (value && value.length > 9) {
        return "ok";
      }
      if (value && value.length > 5) {
        return "pass";
      }
      return "poor";
    },
    passwordStatusMap() {
      const passwordStatusMap = {
        ok: (
          <div class={this.$style.success}>
            {this.$t("validation.password.strength.strong")}
          </div>
        ),
        pass: (
          <div class={this.$style.warning}>
            {this.$t("validation.password.strength.medium")}
          </div>
        ),
        poor: (
          <div class={this.$style.error}>
            {this.$t("validation.password.strength.short")}
          </div>
        ),
      };
      return passwordStatusMap[this.getPasswordStatus()];
    },
    checkPassword(rule, value, callback) {
      const { visible, confirmDirty } = this;
      if (!value) {
        (this.help = this.$t("validation.password.required")),
          (this.visible = !!value),
          callback("error");
      } else {
        this.help = "";
        if (!visible) {
          this.visible = !!value;
        }
        if (value.length < 6) {
          callback("error");
        } else {
          const { form } = this;
          if (value && confirmDirty) {
            form.validateFields(["confirm"], { force: true });
          }
          callback();
        }
      }
    },
    renderPasswordProgress() {
      const { form } = this;
      const value = form.getFieldValue("password");
      const passwordStatus = this.getPasswordStatus();
      return value && value.length ? (
        <div class={this.$style[`progress-${passwordStatus}`]}>
          <a-progress
            status={passwordProgressMap[passwordStatus]}
            class={this.$style.progress}
            strokeWidth={6}
            percent={value.length * 10 > 100 ? 100 : value.length * 10}
            showInfo={false}
          />
        </div>
      ) : null;
    },
    checkConfirm(rule, value, callback) {
      const { form } = this;
      if (value && value !== form.getFieldValue("password")) {
        callback(this.$t("validation.password.twice"));
      } else {
        callback();
      }
    },
  },
};
</script>

<style lang="less" src="./Register.less" module></style>
