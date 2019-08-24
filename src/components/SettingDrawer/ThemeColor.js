import { Tooltip, Icon } from "ant-design-vue";
import { formatMessage } from "@/locales";
import styles from "./ThemeColor.less";

const Tag = {
  functional: true,
  render(h, ctx) {
    const { color, check, className, onClick, ...rest } = ctx.props;
    return (
      <div
        {...rest}
        onClick={onClick}
        class={className}
        style={{
          backgroundColor: color
        }}
      >
        {check ? <Icon type="check" /> : ""}
      </div>
    );
  }
};

const ThemeColor = {
  functional: true,
  render(h, ctx) {
    const { colors, title, value, onChange } = ctx.props;
    let colorList = colors;
    if (!colors) {
      colorList = [
        {
          key: "dust",
          color: "#F5222D"
        },
        {
          key: "volcano",
          color: "#FA541C"
        },
        {
          key: "sunset",
          color: "#FAAD14"
        },
        {
          key: "cyan",
          color: "#13C2C2"
        },
        {
          key: "green",
          color: "#52C41A"
        },
        {
          key: "daybreak",
          color: "#1890FF"
        },
        {
          key: "geekblue",
          color: "#2F54EB"
        },
        {
          key: "purple",
          color: "#722ED1"
        }
      ];
    }
    return (
      <div class={styles.themeColor}>
        <h3 class={styles.title}>{title}</h3>
        <div class={styles.content}>
          {colorList.map(({ key, color }) => (
            <Tooltip
              key={color}
              title={formatMessage(`app.setting.themecolor.${key}`)}
            >
              <Tag
                className={styles.colorBlock}
                color={color}
                check={value === color}
                {...{ props: { onClick: () => onChange && onChange(color) } }}
              />
            </Tooltip>
          ))}
        </div>
      </div>
    );
  }
};

export default ThemeColor;
