<template>
  <div class="header">
    <notice-icon-view />
    <SelectLang />
  </div>
</template>

<script>
import NoticeIconView from "@/components/GlobalHeader/NoticeIconView";
import SelectLang from "@/components/SelectLang";
export default {
  components: {
    NoticeIconView,
    SelectLang
  }
};
</script>

<style scoped>
.header {
  float: right;
  margin-right: 30px;
}
</style>
