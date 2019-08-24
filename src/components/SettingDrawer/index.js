import {
  Select,
  message,
  Drawer,
  List,
  Switch,
  Divider,
  Icon,
  Button,
  Alert,
  Tooltip
} from "ant-design-vue";
import { mapState, mapMutations } from "vuex";
import { formatMessage } from "@/locales";
import omit from "lodash/omit";
import styles from "./index.less";
import ThemeColor from "./ThemeColor";
import BlockCheckbox from "./BlockCheckbox";

const { Option } = Select;

const Body = {
  functional: true,
  render(h, ctx) {
    const { children } = ctx;
    const { title } = ctx.props;
    return (
      <div
        style={{
          marginBottom: 24
        }}
      >
        <h3 class={styles.title}>{title}</h3>
        {children}
      </div>
    );
  }
};

const SettingDrawer = {
  name: "SettingDrawer",
  data() {
    return {
      collapse: false
    };
  },

  computed: {
    ...mapState("setting", {
      setting: state => state
    })
  },

  methods: {
    ...mapMutations("setting", ["updateSetting"]),
    getLayoutSetting() {
      const {
        contentWidth,
        fixedHeader,
        layout,
        autoHideHeader,
        fixSiderbar
      } = this.setting;
      return [
        {
          title: formatMessage("app.setting.content-width"),
          action: (
            <Select
              value={contentWidth}
              size="small"
              onSelect={value => this.changeSetting("contentWidth", value)}
              style={{ width: 80 }}
            >
              {layout === "sidemenu" ? null : (
                <Option value="Fixed">
                  {formatMessage("app.setting.content-width.fixed")}
                </Option>
              )}
              <Option value="Fluid">
                {formatMessage("app.setting.content-width.fluid")}
              </Option>
            </Select>
          )
        },
        {
          title: formatMessage("app.setting.fixedheader"),
          action: (
            <Switch
              size="small"
              checked={!!fixedHeader}
              onChange={checked => this.changeSetting("fixedHeader", checked)}
            />
          )
        },
        {
          title: formatMessage("app.setting.hideheader"),
          disabled: !fixedHeader,
          disabledReason: formatMessage("app.setting.hideheader.hint"),
          action: (
            <Switch
              size="small"
              checked={!!autoHideHeader}
              onChange={checked =>
                this.changeSetting("autoHideHeader", checked)
              }
            />
          )
        },
        {
          title: formatMessage("app.setting.fixedsidebar"),
          disabled: layout === "topmenu",
          disabledReason: formatMessage("app.setting.fixedsidebar.hint"),
          action: (
            <Switch
              size="small"
              checked={!!fixSiderbar}
              onChange={checked => this.changeSetting("fixSiderbar", checked)}
            />
          )
        }
      ];
    },

    changeSetting(key, value) {
      const { setting } = this;
      const nextState = { ...setting };
      nextState[key] = value;
      if (key === "layout") {
        nextState.contentWidth = value === "topmenu" ? "Fixed" : "Fluid";
      } else if (key === "fixedHeader" && !value) {
        nextState.autoHideHeader = false;
      }
      this.updateSetting(nextState);
    },

    togglerContent() {
      const { collapse } = this.$data;
      this.collapse = !collapse;
    },

    renderLayoutSettingItem(item) {
      const action = Object.assign(item.action, {
        disabled: item.disabled
      });
      return (
        <Tooltip
          title={item.disabled ? item.disabledReason : ""}
          placement="left"
        >
          <List.Item actions={[action]}>
            <span style={{ opacity: item.disabled ? "0.5" : "" }}>
              {item.title}
            </span>
          </List.Item>
        </Tooltip>
      );
    }
  },

  render() {
    const { setting } = this;
    const { navTheme, primaryColor, layout, colorWeak } = setting;
    const { collapse } = this.$data;
    return (
      <Drawer
        visible={collapse}
        width={300}
        onClose={this.togglerContent}
        placement="right"
        handle={[
          <div class={styles.handle} onClick={this.togglerContent}>
            <Icon
              type={collapse ? "close" : "setting"}
              style={{
                color: "#fff",
                fontSize: 20
              }}
            />
          </div>
        ]}
        style={{
          zIndex: 999
        }}
      >
        <div class={styles.content}>
          <Body title={formatMessage("app.setting.pagestyle")}>
            <BlockCheckbox
              list={[
                {
                  key: "dark",
                  url:
                    "https://gw.alipayobjects.com/zos/rmsportal/LCkqqYNmvBEbokSDscrm.svg",
                  title: formatMessage("app.setting.pagestyle.dark")
                },
                {
                  key: "light",
                  url:
                    "https://gw.alipayobjects.com/zos/rmsportal/jpRkZQMyYRryryPNtyIC.svg",
                  title: formatMessage("app.setting.pagestyle.light")
                }
              ]}
              value={navTheme}
              {...{
                props: {
                  onChange: value => this.changeSetting("navTheme", value)
                }
              }}
            />
          </Body>

          <ThemeColor
            title={formatMessage("app.setting.themecolor")}
            value={primaryColor}
            {...{
              props: {
                onChange: color => this.changeSetting("primaryColor", color)
              }
            }}
          />

          <Divider />

          <Body title={formatMessage("app.setting.navigationmode")}>
            <BlockCheckbox
              list={[
                {
                  key: "sidemenu",
                  url:
                    "https://gw.alipayobjects.com/zos/rmsportal/JopDzEhOqwOjeNTXkoje.svg",
                  title: formatMessage("app.setting.sidemenu")
                },
                {
                  key: "topmenu",
                  url:
                    "https://gw.alipayobjects.com/zos/rmsportal/KDNDBbriJhLwuqMoxcAr.svg",
                  title: formatMessage("app.setting.topmenu")
                }
              ]}
              value={layout}
              {...{
                props: {
                  onChange: value => this.changeSetting("layout", value)
                }
              }}
            />
          </Body>

          <List
            split={false}
            dataSource={this.getLayoutSetting()}
            renderItem={this.renderLayoutSettingItem}
          />

          <Divider />

          <Body title={formatMessage("app.setting.othersettings")}>
            <List
              split={false}
              renderItem={this.renderLayoutSettingItem}
              dataSource={[
                {
                  title: formatMessage("app.setting.weakmode"),
                  action: (
                    <Switch
                      size="small"
                      checked={!!colorWeak}
                      onChange={checked =>
                        this.changeSetting("colorWeak", checked)
                      }
                    />
                  )
                }
              ]}
            />
          </Body>
          <Divider />
          <Button
            block
            icon="copy"
            onClick={() =>
              this.$copyText(
                JSON.stringify(omit(setting, ["colorWeak"]), null, 2)
              ).then(function() {
                message.success(formatMessage("app.setting.copyinfo"));
              })
            }
          >
            {formatMessage("app.setting.copy")}
          </Button>
          <Alert
            type="warning"
            class={styles.productionHint}
            message={
              <div>
                {formatMessage("app.setting.production.hint")}{" "}
                <a
                  href="https://u.ant.design/pro-v2-default-settings"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  src/defaultSettings.js
                </a>
              </div>
            }
          />
        </div>
      </Drawer>
    );
  }
};

export default SettingDrawer;
