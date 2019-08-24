import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";
import i18n from "./locales";
import VueHighlightJS from "vue-highlightjs";
import IconFont from "@/components/IconFont";

import {
  Button,
  Layout,
  Icon,
  Drawer,
  Radio,
  Menu,
  Form,
  Input,
  Select,
  LocaleProvider,
  Dropdown,
  DatePicker,
  Badge,
  Tabs,
  Spin,
  List,
  Avatar,
  Tooltip,
  Tag,
  Checkbox,
  Col,
  Row,
  Popover,
  Progress,
  Alert,
  Card,
  Steps,
  message
} from "ant-design-vue";
import Authorized from "./components/Authorized";
import Auth from "./directives/auth";
import "highlight.js/styles/github.css";

Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);
Vue.use(Form);
Vue.use(Input);
Vue.use(Select);
Vue.use(LocaleProvider);
Vue.use(Dropdown);
Vue.use(DatePicker);
Vue.use(Avatar);
Vue.use(Tooltip);
Vue.component("Authorized", Authorized);
Vue.use(Auth);
Vue.use(VueHighlightJS);
Vue.use(Badge);
Vue.use(Tabs);
Vue.use(Spin);
Vue.use(List);
Vue.use(Tag);
Vue.use(Checkbox);
Vue.use(Col);
Vue.use(Row);
Vue.use(Popover);
Vue.use(Progress);
Vue.use(Alert);
Vue.use(Card);
Vue.use(Steps);
Vue.prototype.$message = message;

// const IconFont = Icon.createFromIconfontCN({
//   scriptUrl: "//at.alicdn.com/t/font_1154049_w87h4oeytph.js" // 在 iconfont.cn 上生成
// });

Vue.component("IconFont", IconFont);

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
