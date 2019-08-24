<template>
  <a-layout-header style="background: #fff; padding: 0">
    <a-icon
      v-auth="['admin']"
      class="trigger"
      :type="collapsed ? 'menu-unfold' : 'menu-fold'"
      @click="handleClick"
    ></a-icon>
    <div class="header">
      <notice-icon-view />
      <SelectLang />
    </div>
  </a-layout-header>
</template>

<script>
import NoticeIconView from "@/components/GlobalHeader/NoticeIconView";
import SelectLang from "@/components/SelectLang";
export default {
  data() {
    return {
      collapsed: false
    };
  },
  props: ["handleMenuCollapse"],
  components: {
    NoticeIconView,
    SelectLang
  },
  methods: {
    handleClick() {
      this.collapsed = !this.collapsed;
      this.handleMenuCollapse(this.collapsed);
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  float: right;
  margin-right: 30px;
}
.trigger {
  padding: 0 20px;
  line-height: 64px;
  font-size: 20px;

  &:hover {
    background: #eeeeee;
  }
}
</style>
