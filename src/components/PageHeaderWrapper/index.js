import { formatMessage } from "@/locales";
// import { PageHeader, Tabs, Typography } from "ant-design-vue";
import { Tabs } from "ant-design-vue";
import PageHeader from "@/utils/page-header";
import { mapState } from "vuex";
import classNames from "classnames";
import GridContent from "./GridContent";
import styles from "./index.less";
import MenuContext from "@/layouts/MenuContext";
import { conversionBreadcrumbList } from "./breadcrumb";

// const { Title } = Typography;

/**
 * render Footer tabList
 * In order to be compatible with the old version of the PageHeader
 * basically all the functions are implemented.
 */
const renderFooter = (
  h,
  { tabList, tabActiveKey, onTabChange, tabBarExtraContent },
) => {
  return tabList && tabList.length ? (
    <Tabs
      class={styles.tabs}
      activeKey={tabActiveKey}
      onChange={key => {
        if (onTabChange) {
          onTabChange(key);
        }
      }}
      tabBarExtraContent={tabBarExtraContent}
    >
      {tabList.map(item => (
        <Tabs.TabPane tab={item.tab} key={item.key} />
      ))}
    </Tabs>
  ) : null;
};

const PageHeaderWrapper = {
  name: "PageHeaderWrapper",
  props: [
    "fluid",
    "wrapperClassName",
    "home",
    "top",
    "title",
    "logo",
    "hiddenBreadcrumb",
    "tabList",
    "tabActiveKey",
    "tabChange",
    "tabBarExtraContent",
  ],
  computed: {
    ...mapState("setting", {
      contentWidth: state => state.contentWidth,
    }),
  },
  render(h) {
    const children = this.$slots.default;
    const { contentWidth } = this;
    const {
      fluid,
      wrapperClassName,
      home,
      top,
      title,
      logo,
      hiddenBreadcrumb,
      ...restProps
    } = this.$props;
    const { content, extraContent } = this.$slots;
    return (
      <div
        style={{ margin: "-24px -24px 0" }}
        class={classNames(wrapperClassName, styles.main)}
      >
        {top}
        <MenuContext.Consumer>
          {value => {
            return (
              <div class={styles.wrapper}>
                <div
                  class={classNames({
                    [styles.wide]: !fluid && contentWidth === "Fixed",
                  })}
                >
                  <PageHeader
                    key="pageheader"
                    {...{ props: restProps, on: this.$listeners }}
                    breadcrumb={{
                      props:
                        !hiddenBreadcrumb &&
                        conversionBreadcrumbList({
                          ...value,
                          ...restProps,
                          ...(home !== null && {
                            home: formatMessage({
                              id: "menu.home",
                              defaultMessage: "Home",
                            }),
                          }),
                        }),
                    }}
                    class={styles.pageHeader}
                    linkElement="router-link"
                  >
                    <template slot="title">
                      {logo && <span class={styles.logo}>{logo}</span>}
                      <h4
                        style={{
                          marginBottom: 0,
                          display: "inline-block",
                        }}
                      >
                        {title}
                      </h4>
                    </template>
                    <template slot="footer">
                      {renderFooter(h, restProps)}
                    </template>
                    <template slot="extra">{this.$slots.extra}</template>
                    <div class={styles.detail}>
                      <div class={styles.main}>
                        <div class={styles.row}>
                          {content && (
                            <div class={styles.content}>{content}</div>
                          )}
                          {extraContent && (
                            <div class={styles.extraContent}>
                              {extraContent}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </PageHeader>
                </div>
              </div>
            );
          }}
        </MenuContext.Consumer>
        {children ? (
          <div class={styles["children-content"]}>
            <GridContent>{children}</GridContent>
          </div>
        ) : null}
      </div>
    );
  },
};

export default PageHeaderWrapper;
