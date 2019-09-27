<template>
  <a-card :bordered="false">
    <a-steps :current="getCurrentStep()" :class="$style.steps">
      <a-step title="填写转账信息" />
      <a-step title="确认转账信息" />
      <a-step title="完成" />
    </a-steps>
    <router-view />
  </a-card>
</template>

<script>
import { Card, Steps } from "ant-design-vue";

const { Step } = Steps;

export default {
  name: "StepForm",

  components: {
    ACard: Card,
    ASteps: Steps,
    AStep: Step,
  },

  methods: {
    getCurrentStep() {
      const { pathname } = location;
      const pathList = pathname.split("/");
      switch (pathList[pathList.length - 1]) {
        case "info":
          return 0;
        case "confirm":
          return 1;
        case "result":
          return 2;
        default:
          return 0;
      }
    },
  },
};
</script>

<style lang="less" src="../style.less" module></style>
