<template>
  <div :class="$style.main">
    <Login
      :defaultActiveKey="type"
      :onTabChange="onTabChange"
      :onSubmit="handleSubmit"
      v-ant-ref="
        form => {
          this.loginForm = form;
        }
      "
    >
      <Tab key="account" :tab="$t('app.login.tab-login-credentials')">
        <VNodes
          v-if="status === 'error' && type === 'account' && !submitting"
          :vnodes="renderMessage('account')"
        />
        <UserName
          name="userName"
          :placeholder="`${$t('app.login.userName')}: admin or user`"
          :rules="[
            {
              required: true,
              message: $t('validation.userName.required')
            }
          ]"
        />
        <Password
          name="password"
          :placeholder="`${$t('app.login.password')}：ant.design`"
          :rules="[
            { required: true, message: $t('validation.password.required') }
          ]"
          :onPressEnter="
            e => {
              e.preventDefault();
              this.form.validateFields(this.handleSubmit);
            }
          "
        />
      </Tab>
      <Tab key="mobile" :tab="$t('app.login.tab-login-mobile')">
        <VNodes
          v-if="status === 'error' && type === 'mobile' && !submitting"
          :vnodes="renderMessage('mobile')"
        />
        <Mobile
          name="mobile"
          :placeholder="$t('form.phone-number.placeholder')"
          :rules="[
            {
              required: true,
              message: $t('validation.phone-number.required')
            },
            {
              pattern: /^1\d{10}$/,
              message: $t('validation.phone-number.wrong-format')
            }
          ]"
        />
        <Captcha
          name="captcha"
          :placeholder="$t('form.verification-code.placeholder')"
          :countDown="120"
          :onGetCaptcha="onGetCaptcha"
          :getCaptchaButtonText="$t('form.get-captcha')"
          :getCaptchaSecondText="$t('form.captcha.second')"
          :rules="[
            {
              required: true,
              message: $t('validation.verification-code.required')
            }
          ]"
        />
      </Tab>
      <div>
        <a-checkbox :checked="autoLogin" @change="changeAutoLogin">
          {{ $t("app.login.remember-me") }}
        </a-checkbox>
        <a style="float: right" href="">
          {{ $t("app.login.forgot-password") }}
        </a>
      </div>
      <Submit :loading="submitting">
        {{ $t("app.login.login") }}
      </Submit>
      <div :class="$style.other">
        {{ $t("app.login.sign-in-with") }}
        <a-icon type="alipay-circle" :class="$style.icon" theme="outlined" />
        <a-icon type="taobao-circle" :class="$style.icon" theme="outlined" />
        <a-icon type="weibo-circle" :class="$style.icon" theme="outlined" />
        <router-link :class="$style.register" to="/user/register">
          {{ $t("app.login.signup") }}
        </router-link>
      </div>
    </Login>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import { Modal } from "ant-design-vue";
import Login from "@/components/Login";

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

export default {
  components: {
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes
    },
    Login,
    Tab,
    UserName,
    Password,
    Mobile,
    Captcha,
    Submit
  },
  data() {
    return {
      type: "account",
      autoLogin: true,
      submitting: false,
      count: 0,
      tabs: []
    };
  },
  computed: {
    ...mapState("login", {
      status: state => state.status
    })
  },
  methods: {
    ...mapActions("login", ["login", "getCaptcha"]),
    ...mapMutations("login", ["changeLoginStatus"]),
    handleSubmit(err, values) {
      const { type } = this.$data;
      if (!err) {
        this.submitting = true;
        this.login({
          ...values,
          type
        }).then(() => {
          this.submitting = false;
        });
      }
    },
    onTabChange(type) {
      this.type = type;
      this.changeLoginStatus({
        status: false,
        currentAuthority: "guest"
      });
    },
    changeAutoLogin(e) {
      this.autoLogin = e.target.checked;
    },
    onGetCaptcha() {
      return new Promise((resolve, reject) => {
        this.loginForm.validateFields(
          ["mobile"],
          { force: true },
          (err, values) => {
            if (err) {
              reject(err);
            } else {
              this.getCaptcha({ mobile: values.mobile })
                .then(resolve)
                .catch(reject);
              Modal.info({
                title: this.$t("app.login.verification-code-warning")
              });
            }
          }
        );
      });
    },
    renderMessage(type) {
      return (
        <a-alert
          style="margin-bottom: 24px"
          message={
            type === "account"
              ? this.$t("app.login.message-invalid-credentials")
              : this.$t("app.login.message-invalid-verification-code")
          }
          type="error"
          showIcon
        />
      );
    }
  }
};
</script>

<style lang="less" src="./Login.less" module></style>
