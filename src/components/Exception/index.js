import classNames from "classnames";
import { Button } from "ant-design-vue";
import config from "./typeConfig";
import styles from "./index.less";

const Exception = {
  name: "Exception",
  functional: true,
  render(createElement, ctx) {
    const {
      className,
      backText = "back to home",
      linkElement = "a",
      type,
      title,
      desc,
      img,
      actions,
      redirect = "/",
      ...rest
    } = ctx.props;
    const pageType = type in config ? type : "404";
    const clsString = classNames(styles.exception, className);
    return (
      <div class={clsString} {...rest}>
        <div class={styles.imgBlock}>
          <div
            class={styles.imgEle}
            style={{ backgroundImage: `url(${img || config[pageType].img})` }}
          />
        </div>
        <div class={styles.content}>
          <h1>{title || config[pageType].title}</h1>
          <div class={styles.desc}>{desc || config[pageType].desc}</div>
          <div class={styles.actions}>
            {actions ||
              createElement(
                linkElement,
                {
                  props: {
                    to: redirect,
                  },
                  attrs: {
                    href: redirect,
                  },
                },
                [<Button type="primary">{backText}</Button>],
              )}
          </div>
        </div>
      </div>
    );
  },
};

export default Exception;
