import { formatMessage, setLocale, getLocale } from "@/locales";
import { Menu, Icon } from "ant-design-vue";
import classNames from "classnames";
import HeaderDropdown from "../HeaderDropdown";
import styles from "./index.less";

const SelectLang = {
  name: "SelectLang",
  props: {
    className: String
  },

  methods: {
    changeLang({ key }) {
      setLocale(key);
    }
  },

  render() {
    const { className } = this.$props;
    const selectedLang = getLocale();
    const locales = ["zh-CN", "zh-TW", "en-US", "pt-BR"];
    const languageLabels = {
      "zh-CN": "简体中文",
      "zh-TW": "繁体中文",
      "en-US": "English",
      "pt-BR": "Português"
    };
    const languageIcons = {
      "zh-CN": "🇨🇳",
      "zh-TW": "🇭🇰",
      "en-US": "🇬🇧",
      "pt-BR": "🇧🇷"
    };
    const langMenu = (
      <Menu
        class={styles.menu}
        selectedKeys={[selectedLang]}
        onClick={this.changeLang}
      >
        {locales.map(locale => (
          <Menu.Item key={locale}>
            <span role="img" aria-label={languageLabels[locale]}>
              {languageIcons[locale]}
            </span>{" "}
            {languageLabels[locale]}
          </Menu.Item>
        ))}
      </Menu>
    );
    return (
      <HeaderDropdown overlay={langMenu} placement="bottomRight">
        <span class={classNames(styles.dropDown, className)}>
          <Icon type="global" title={formatMessage("navBar.lang")} />
        </span>
      </HeaderDropdown>
    );
  }
};

export default SelectLang;
