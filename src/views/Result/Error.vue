<template>
  <a-card borderd="false">
    <Result
      type="error"
      :title="$t('app.result.error.title')"
      :description="$t('app.result.error.description')"
      style="margin-top: 48px; margin-bottom: 16px"
    >
      <template slot="extra">
        <div
          style="font-size: 16px; color: rgba(0, 0, 0, 0.85); font-weight: 500; margin-bottom: 16px"
        >
          {{ $t("app.result.error.hint-title") }}
        </div>
        <div style="margin-bottom: 16px">
          <a-icon
            style="color: #f5222d; margin-right: 8px"
            type="close-circle-o"
          />
          {{ $t("app.result.error.hint-text1") }}
          <a style="margin-left: 16px">
            {{ $t("app.result.error.hint-btn1") }}
            <a-icon type="right" />
          </a>
        </div>
        <div>
          <a-icon
            style="color: #f5222d; margin-right: 8px"
            type="close-circle-o"
          />
          {{ $t("app.result.error.hint-text2") }}
          <a style="margin-left: 16px">
            {{ $t("app.result.error.hint-btn2") }}
            <a-icon type="right" />
          </a>
        </div>
      </template>
      <template slot="actions">
        <a-button type="primary">{{
          $t("app.result.error.btn-text")
        }}</a-button>
      </template>
    </Result>
  </a-card>
</template>

<script>
import Result from "@/components/Result";

export default {
  components: {
    Result,
  },
};
</script>
