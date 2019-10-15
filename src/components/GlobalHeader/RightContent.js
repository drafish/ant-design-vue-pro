import { FormattedMessage, formatMessage } from "@/locales";
import {
  Spin,
  Tag,
  Menu,
  Icon,
  Avatar,
  Tooltip,
  message,
} from "ant-design-vue";
import { mapActions } from "vuex";
import moment from "moment";
import groupBy from "lodash/groupBy";
import NoticeIcon from "../NoticeIcon";
import HeaderSearch from "../HeaderSearch";
import HeaderDropdown from "../HeaderDropdown";
import SelectLang from "../SelectLang";
import styles from "./index.less";

const GlobalHeaderRight = {
  name: "GlobalHeaderRight",
  props: [
    "notices",
    "currentUser",
    "fetchingNotices",
    "onNoticeVisibleChange",
    "onMenuClick",
    "onNoticeClear",
    "theme",
  ],
  methods: {
    ...mapActions("global", ["changeNoticeReadState"]),
    getNoticeData() {
      const { notices = [] } = this.$props;
      if (notices.length === 0) {
        return {};
      }
      const newNotices = notices.map(notice => {
        const newNotice = { ...notice };
        if (newNotice.datetime) {
          newNotice.datetime = moment(notice.datetime).fromNow();
        }
        if (newNotice.id) {
          newNotice.key = newNotice.id;
        }
        if (newNotice.extra && newNotice.status) {
          const color = {
            todo: "",
            processing: "blue",
            urgent: "red",
            doing: "gold",
          }[newNotice.status];
          newNotice.extra = (
            <Tag color={color} style={{ marginRight: 0 }}>
              {newNotice.extra}
            </Tag>
          );
        }
        return newNotice;
      });
      return groupBy(newNotices, "type");
    },

    getUnreadData(noticeData) {
      const unreadMsg = {};
      Object.entries(noticeData).forEach(([key, value]) => {
        if (!unreadMsg[key]) {
          unreadMsg[key] = 0;
        }
        if (Array.isArray(value)) {
          unreadMsg[key] = value.filter(item => !item.read).length;
        }
      });
      return unreadMsg;
    },

    changeReadState(clickedItem) {
      const { id } = clickedItem;
      this.changeNoticeReadState(id);
    },
  },

  render() {
    const {
      currentUser,
      fetchingNotices,
      onNoticeVisibleChange,
      onMenuClick,
      onNoticeClear,
      theme,
    } = this.$props;
    const menu = (
      <Menu class={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item key="userCenter">
          <Icon type="user" />
          <FormattedMessage
            id="menu.account.center"
            defaultMessage="account center"
          />
        </Menu.Item>
        <Menu.Item key="userinfo">
          <Icon type="setting" />
          <FormattedMessage
            id="menu.account.settings"
            defaultMessage="account settings"
          />
        </Menu.Item>
        <Menu.Item key="triggerError">
          <Icon type="close-circle" />
          <FormattedMessage
            id="menu.account.trigger"
            defaultMessage="Trigger Error"
          />
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" />
          <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
        </Menu.Item>
      </Menu>
    );
    const noticeData = this.getNoticeData();
    const unreadMsg = this.getUnreadData(noticeData);
    let className = styles.right;
    if (theme === "dark") {
      className = `${styles.right}  ${styles.dark}`;
    }
    return (
      <div class={className}>
        <HeaderSearch
          className={`${styles.action} ${styles.search}`}
          placeholder={formatMessage({ id: "component.globalHeader.search" })}
          dataSource={[
            formatMessage({ id: "component.globalHeader.search.example1" }),
            formatMessage({ id: "component.globalHeader.search.example2" }),
            formatMessage({ id: "component.globalHeader.search.example3" }),
          ]}
          search={value => {
            console.log('input', value); // eslint-disable-line
          }}
          pressEnter={value => {
            console.log('enter', value); // eslint-disable-line
          }}
        />
        <Tooltip title={formatMessage({ id: "component.globalHeader.help" })}>
          <a
            target="_blank"
            href="https://pro.ant.design/docs/getting-started"
            rel="noopener noreferrer"
            class={styles.action}
          >
            <Icon type="question-circle-o" />
          </a>
        </Tooltip>
        <NoticeIcon
          className={styles.action}
          count={currentUser.unreadCount}
          itemClick={(item, tabProps) => {
            console.log(item, tabProps); // eslint-disable-line
            this.changeReadState(item, tabProps);
          }}
          loading={fetchingNotices}
          locale={{
            emptyText: formatMessage({ id: "component.noticeIcon.empty" }),
            clear: formatMessage({ id: "component.noticeIcon.clear" }),
            viewMore: formatMessage({ id: "component.noticeIcon.view-more" }),
            notification: formatMessage({
              id: "component.globalHeader.notification",
            }),
            message: formatMessage({ id: "component.globalHeader.message" }),
            event: formatMessage({ id: "component.globalHeader.event" }),
          }}
          clear={onNoticeClear}
          popupVisibleChange={onNoticeVisibleChange}
          viewMore={() => message.info("Click on view more")}
          clearClose
        >
          <NoticeIcon.Tab
            count={unreadMsg.notification}
            list={noticeData.notification}
            title="notification"
            emptyText={formatMessage({
              id: "component.globalHeader.notification.empty",
            })}
            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
            showViewMore
          />
          <NoticeIcon.Tab
            count={unreadMsg.message}
            list={noticeData.message}
            title="message"
            emptyText={formatMessage({
              id: "component.globalHeader.message.empty",
            })}
            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
            showViewMore
          />
          <NoticeIcon.Tab
            count={unreadMsg.event}
            list={noticeData.event}
            title="event"
            emptyText={formatMessage({
              id: "component.globalHeader.event.empty",
            })}
            emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
            showViewMore
          />
        </NoticeIcon>
        {currentUser.name ? (
          <HeaderDropdown overlay={menu}>
            <span class={`${styles.action} ${styles.account}`}>
              <Avatar
                size="small"
                class={styles.avatar}
                src={currentUser.avatar}
                alt="avatar"
              />
              <span class={styles.name}>{currentUser.name}</span>
            </span>
          </HeaderDropdown>
        ) : (
          <Spin
            size="small"
            style={{ marginLeft: "8px", marginRight: "8px" }}
          />
        )}
        <SelectLang className={styles.action} />
      </div>
    );
  },
};

export default GlobalHeaderRight;
