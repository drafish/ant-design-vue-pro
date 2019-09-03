import { Icon, Tabs, Badge, Spin } from "ant-design-vue";
import classNames from "classnames";
import HeaderDropdown from "../HeaderDropdown";
import List from "./NoticeList";
import styles from "./index.less";

const { TabPane } = Tabs;

export default {
  name: "NoticeIcon",
  Tab: TabPane,
  data() {
    return { visible: false };
  },

  props: {
    className: String,
    count: {
      type: Number,
    },
    itemClick: {
      type: Function,
      default: () => {},
    },
    popupVisibleChange: {
      type: Function,
      default: () => {},
    },
    tabChange: {
      type: Function,
      default: () => {},
    },
    clear: {
      type: Function,
      default: () => {},
    },
    viewMore: {
      type: Function,
      default: () => {},
    },
    loading: {
      type: Boolean,
      default: false,
    },
    clearClose: {
      type: Boolean,
      default: false,
    },
    locale: {
      type: Object,
      default: {
        emptyText: "No notifications",
        clear: "Clear",
        viewMore: "More",
      },
    },
    emptyImage: {
      type: String,
      default:
        "https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg",
    },
  },

  methods: {
    onItemClick(item, tabProps) {
      const { itemClick } = this.$props;
      const { clickClose } = item;
      itemClick(item, tabProps);
      if (clickClose) {
        this.popover.$el.click();
      }
    },

    onClear(name) {
      const { clear, clearClose } = this.$props;
      clear(name);
      if (clearClose) {
        this.popover.$el.click();
      }
    },

    onTabChange(tabType) {
      const { tabChange } = this.$props;
      tabChange(tabType);
    },

    onViewMore(tabProps, event) {
      const { viewMore } = this.$props;
      viewMore(tabProps, event);
    },

    getNotificationBox() {
      const { loading, locale } = this.$props;
      const children = this.$slots.default;
      if (!children) {
        return null;
      }
      const panes = children.map(child => {
        const {
          list,
          title,
          count,
          emptyText,
          emptyImage,
          showClear,
          showViewMore,
        } = child.data.attrs;
        const len = list && list.length ? list.length : 0;
        const msgCount = count || count === 0 ? count : len;
        const localeTitle = locale[title] || title;
        const tabTitle =
          msgCount > 0 ? `${localeTitle} (${msgCount})` : localeTitle;
        return (
          <TabPane tab={tabTitle} key={title}>
            <List
              data={list}
              emptyImage={emptyImage}
              emptyText={emptyText}
              locale={locale}
              clear={() => this.onClear(title)}
              click={item => this.onItemClick(item, child.data.attrs)}
              viewMore={event => this.onViewMore(child.data.attrs, event)}
              showClear={showClear}
              showViewMore={showViewMore}
              title={title}
            />
          </TabPane>
        );
      });
      return (
        <div>
          <Spin spinning={loading} delay={0}>
            <Tabs class={styles.tabs} onChange={this.onTabChange}>
              {panes}
            </Tabs>
          </Spin>
        </div>
      );
    },

    handleVisibleChange(visible) {
      const { popupVisibleChange } = this.$props;
      this.visible = visible;
      popupVisibleChange(visible);
    },
  },

  render() {
    const { className, count, popupVisible, bell } = this.$props;
    const { visible } = this.$data;
    const noticeButtonClass = classNames(className, styles.noticeButton);
    const notificationBox = this.getNotificationBox();
    const NoticeBellIcon = bell || <Icon type="bell" class={styles.icon} />;
    const trigger = (
      <span class={classNames(noticeButtonClass, { opened: visible })}>
        <Badge count={count} style={{ boxShadow: "none" }} class={styles.badge}>
          {NoticeBellIcon}
        </Badge>
      </span>
    );
    if (!notificationBox) {
      return trigger;
    }
    const popoverProps = {};
    if ("popupVisible" in this.$props) {
      popoverProps.visible = popupVisible;
    }
    return (
      <HeaderDropdown
        placement="bottomRight"
        overlay={notificationBox}
        overlayClassName={styles.popover}
        trigger={["click"]}
        visible={visible}
        visibleChange={this.handleVisibleChange}
        {...{
          props: popoverProps,
          directives: [
            {
              name: "ant-ref",
              value: node => {
                this.popover = node;
              },
            },
          ],
        }}
      >
        {trigger}
      </HeaderDropdown>
    );
  },
};
