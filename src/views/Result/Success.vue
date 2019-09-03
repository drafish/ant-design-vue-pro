<template>
  <a-card borderd="false">
    <Result
      type="success"
      :title="$t('app.result.success.title')"
      :description="$t('app.result.success.description')"
      style="margin-top=48px; margin-bottom:16px"
    >
      <template slot="extra">
        <div
          style="font-size: 16px; color: rgba(0, 0, 0, 0.85); font-weight: 500; margin-bottom: 20px"
        >
          {{ $t("app.result.success.operate-title") }}
        </div>
        <a-row style="margin-bottom: 16px">
          <a-col :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
            <span style="color: rgba(0, 0, 0, 0.85)">
              {{ $t("app.result.success.operate-id") }}
            </span>
            23421
          </a-col>
          <a-col :xs="24" :sm="12" :md="12" :lg="12" :xl="6">
            <span style="color: rgba(0, 0, 0, 0.85)">
              {{ $t("app.result.success.principal") }}
            </span>
            {{ $t("app.result.success.step1-operator") }}
          </a-col>
          <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
            <span style="color: rgba(0, 0, 0, 0.85)">
              {{ $t("app.result.success.operate-time") }}
            </span>
            2016-12-12 ~ 2017-12-12
          </a-col>
        </a-row>
        <a-steps
          style="margin-left: -42px; width: calc(100% + 84px)"
          progressDot
          :current="1"
        >
          <a-step>
            <template slot="title">
              <span style="font-size: 14px">
                {{ $t("app.result.success.step1-title") }}
              </span>
            </template>
            <template slot="description">
              <div
                style="font-size: 12px; color: rgba(0, 0, 0, 0.45); position: relative; left: 42px; text-align: left"
              >
                <div style="margin: 8px 0 4px">
                  {{ $t("app.result.success.step1-operator") }}
                  <a-icon style="margin-left: 8px" type="dingding-o" />
                </div>
                <div>2016-12-12 12:32</div>
              </div>
            </template>
          </a-step>
          <a-step>
            <template slot="title">
              <span style="font-size: 14px">
                {{ $t("app.result.success.step2-title") }}
              </span>
            </template>
            <template slot="description">
              <div
                style="font-size: 12px; position: relative; left: 42px; text-align: left"
              >
                <div style="margin: 8px 0 4px">
                  {{ $t("app.result.success.step2-operator") }}
                  <a-icon
                    type="dingding-o"
                    style="color: #00A0E9; margin-left: 8px"
                  />
                </div>
                <div>
                  <a href="">
                    {{ $t("app.result.success.step2-extra") }}
                  </a>
                </div>
              </div>
            </template>
          </a-step>
          <a-step>
            <template slot="title">
              <span style="font-size: 14px">
                {{ $t("app.result.success.step3-title") }}
              </span>
            </template>
          </a-step>
          <a-step>
            <template slot="title">
              <span style="font-size: 14px">
                {{ $t("app.result.success.step4-title") }}
              </span>
            </template>
          </a-step>
        </a-steps>
      </template>
      <template slot="actions">
        <a-button type="primary">
          {{ $t("app.result.success.btn-return") }}
        </a-button>
        <a-button>
          {{ $t("app.result.success.btn-project") }}
        </a-button>
        <a-button>
          {{ $t("app.result.success.btn-print") }}
        </a-button>
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
