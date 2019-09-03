import { Avatar, List } from "ant-design-vue";
import classNames from "classnames";
import styles from "./NoticeList.less";

export default {
  name: "NoticeList",
  functional: true,
  render(h, ctx) {
    const {
      data = [],
      click,
      clear,
      title,
      locale,
      emptyText,
      emptyImage,
      viewMore = null,
      showClear = true,
      showViewMore = false,
    } = ctx.props;

    if (data.length === 0) {
      return (
        <div class={styles.notFound}>
          {emptyImage ? <img src={emptyImage} alt="not found" /> : null}
          <div>{emptyText || locale.emptyText}</div>
        </div>
      );
    }
    return (
      <div>
        <List class={styles.list}>
          {data.map((item, i) => {
            const itemCls = classNames(styles.item, {
              [styles.read]: item.read,
            });
            const leftIcon = item.avatar ? (
              typeof item.avatar === "string" ? (
                <Avatar class={styles.avatar} src={item.avatar} />
              ) : (
                <span class={styles.iconElement}>{item.avatar}</span>
              )
            ) : null;

            return (
              <List.Item
                class={itemCls}
                key={item.key || i}
                onClick={() => click(item)}
              >
                <List.Item.Meta
                  class={styles.meta}
                  avatar={leftIcon}
                  title={
                    <div class={styles.title}>
                      {item.title}
                      <div class={styles.extra}>{item.extra}</div>
                    </div>
                  }
                  description={
                    <div>
                      <div class={styles.description} title={item.description}>
                        {item.description}
                      </div>
                      <div class={styles.datetime}>{item.datetime}</div>
                    </div>
                  }
                />
              </List.Item>
            );
          })}
        </List>
        <div class={styles.bottomBar}>
          {showClear ? (
            <div onClick={clear}>
              {locale.clear} {locale[title] || title}
            </div>
          ) : null}
          {showViewMore ? (
            <div onClick={viewMore}>{locale.viewMore}</div>
          ) : null}
        </div>
      </div>
    );
  },
};
