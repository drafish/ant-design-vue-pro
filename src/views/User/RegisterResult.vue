<template>
  <Result
    :className="$style.registerResult"
    type="success"
    :description="$t('app.register-result.activation-email')"
    style="margin-top: 56px"
  >
    <template slot="title">
      <div :class="$style.title">
        {{
          $t("app.register-result.msg", {
            email: account || "AntDesign@example.com"
          })
        }}
      </div>
    </template>
    <template slot="actions">
      <div :class="$style.actions">
        <a href="">
          <a-button size="large" type="primary">
            {{ $t("app.register-result.view-mailbox") }}
          </a-button>
        </a>
        <router-link to="/">
          <a-button size="large">{{
            $t("app.register-result.back-home")
          }}</a-button>
        </router-link>
      </div>
    </template>
  </Result>
</template>

<script>
import Result from "@/components/Result";

export default {
  components: {
    Result
  },
  computed: {
    account() {
      return this.$route.params.account;
    }
  }
};
</script>

<style lang="less" src="./RegisterResult.less" module></style>
