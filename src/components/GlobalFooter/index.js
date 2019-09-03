import classNames from "classnames";
import styles from "./index.less";

const GlobalFooter = {
  functional: true,
  render(h, ctx) {
    const { className, links, copyright } = ctx.props;
    const clsString = classNames(styles.globalFooter, className);
    return (
      <footer class={clsString}>
        {links && (
          <div class={styles.links}>
            {links.map(link => (
              <a
                key={link.key}
                title={link.key}
                target={link.blankTarget ? "_blank" : "_self"}
                href={link.href}
              >
                {link.title}
              </a>
            ))}
          </div>
        )}
        {copyright && <div class={styles.copyright}>{copyright}</div>}
      </footer>
    );
  },
};

export default GlobalFooter;
