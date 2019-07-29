<template>
  <Result
    className="registerResult"
    type="success"
    :description="$t('app.register-result.activation-email')"
    style="margin-top: 56px"
  >
    <template slot="title">
      <div class="title">
        {{
          $t("app.register-result.msg", {
            email: account || "AntDesign@example.com"
          })
        }}
      </div>
    </template>
    <template slot="actions">
      <div class="actions">
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

<style scoped lang="less">
.registerResult {
  /deep/ .anticon {
    font-size: 64px;
  }
  .title {
    margin-top: 32px;
    font-size: 20px;
    line-height: 28px;
  }
  .actions {
    margin-top: 40px;
    a + a {
      margin-left: 8px;
    }
  }
}
</style>
