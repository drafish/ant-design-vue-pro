import router from "@/router";
import { message } from "ant-design-vue";
import { fakeSubmitForm } from "@/services/api";

export default {
  namespaced: true,

  state: {
    step: {
      payAccount: "ant-design@alipay.com",
      receiverAccount: "test@example.com",
      receiverName: "Alex",
      amount: "500",
    },
    loading: false,
  },

  actions: {
    // eslint-disable-next-line no-unused-vars
    async submitRegularForm({ commit }, payload) {
      commit("saveLoading", true);
      await fakeSubmitForm(payload);
      commit("saveLoading", false);
      message.success("提交成功");
    },
    async submitStepForm({ commit }, payload) {
      commit("saveLoading", true);
      await fakeSubmitForm(payload);
      commit("saveLoading", false);
      commit("saveStepFormData", payload);
      router.push({
        path: "/form/step-form/result",
      });
    },
    // eslint-disable-next-line no-unused-vars
    async submitAdvancedForm({ commit }, payload) {
      commit("saveLoading", true);
      await fakeSubmitForm(payload);
      commit("saveLoading", false);
      message.success("提交成功");
    },
  },

  mutations: {
    saveStepFormData(state, payload) {
      state.step = payload;
    },
    saveLoading(state, action) {
      state.loading = action;
    },
  },
};
