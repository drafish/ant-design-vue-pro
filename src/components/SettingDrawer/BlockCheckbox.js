import { Tooltip, Icon } from "ant-design-vue";
import style from "./index.less";

const BlockChecbox = {
  functional: true,
  render(h, ctx) {
    const { value, onChange, list } = ctx.props;
    return (
      <div class={style.blockChecbox} key={value}>
        {list.map(item => (
          <Tooltip title={item.title} key={item.key}>
            <div class={style.item} onClick={() => onChange(item.key)}>
              <img src={item.url} alt={item.key} />
              <div
                class={style.selectIcon}
                style={{
                  display: value === item.key ? "block" : "none",
                }}
              >
                <Icon type="check" />
              </div>
            </div>
          </Tooltip>
        ))}
      </div>
    );
  },
};

export default BlockChecbox;
