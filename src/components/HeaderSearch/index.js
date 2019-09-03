import { Input, Icon, AutoComplete } from "ant-design-vue";
import classNames from "classnames";
// import Debounce from "lodash-decorators/debounce";
// import Bind from "lodash-decorators/bind";
import styles from "./index.less";

const HeaderSearch = {
  name: "HeaderSearch",
  props: {
    className: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    search: {
      type: Function,
      default: () => {},
    },
    change: {
      type: Function,
      default: () => {},
    },
    pressEnter: {
      type: Function,
      default: () => {},
    },
    defaultActiveFirstOption: {
      type: Boolean,
      default: false,
    },
    dataSource: {
      type: Array,
      default: [],
    },
    defaultOpen: {
      type: Boolean,
      default: false,
    },
    visibleChange: {
      type: Function,
      default: () => {},
    },
    open: {
      type: Boolean,
      default: undefined,
    },
  },

  data() {
    return {
      searchMode: false,
      value: "",
    };
  },

  beforeUpdate() {
    if (this.$props.open !== undefined) {
      this.searchMode = this.$props.open;
    }
  },

  beforeDestroy() {
    clearTimeout(this.timeout);
  },

  methods: {
    onKeyDown(e) {
      if (e.key === "Enter") {
        const { pressEnter } = this.$props;
        const { value } = this.$data;
        this.timeout = setTimeout(() => {
          pressEnter(value); // Fix duplicate onPressEnter
        }, 0);
      }
    },

    onChange(value) {
      const { search, change } = this.$props;
      this.value = value;
      if (search) {
        search(value);
      }
      if (change) {
        change(value);
      }
    },

    enterSearchMode() {
      const { visibleChange } = this.$props;
      visibleChange(true);
      this.searchMode = true;
      const { searchMode } = this.$data;
      if (searchMode) {
        this.input.focus();
      }
    },

    leaveSearchMode() {
      Object.assign(this, {
        searchMode: false,
        value: "",
      });
    },

    // NOTE: 不能小于500，如果长按某键，第一次触发auto repeat的间隔是500ms，小于500会导致触发2次
    // @Bind()
    // @Debounce(500, {
    //   leading: true,
    //   trailing: false,
    // })
    // debouncePressEnter() {
    //   const { onPressEnter } = this.$props;
    //   const { value } = this.$data;
    //   onPressEnter(value);
    // }
  },

  render() {
    // eslint-disable-next-line no-unused-vars
    const { className, placeholder, open, ...restProps } = this.$props;
    const { searchMode, value } = this.$data;
    delete restProps.defaultOpen; // for rc-select not affected
    const inputClass = classNames(styles.input, {
      [styles.show]: searchMode,
    });
    return (
      <span
        class={classNames(className, styles.headerSearch)}
        onClick={this.enterSearchMode}
        onTransitionEnd={({ propertyName }) => {
          if (propertyName === "width" && !searchMode) {
            const { visibleChange } = this.$props;
            visibleChange(searchMode);
          }
        }}
      >
        <Icon type="search" key="Icon" />
        <AutoComplete
          key="AutoComplete"
          {...{ props: restProps }}
          class={inputClass}
          value={value}
          onChange={this.onChange}
        >
          <Input
            {...{
              directives: [
                {
                  name: "ant-ref",
                  value: node => {
                    this.input = node;
                  },
                },
              ],
              on: {
                keydown: this.onKeyDown,
              },
            }}
            aria-label={placeholder}
            placeholder={placeholder}
            // onKeyDown={this.onKeyDown}
            onBlur={this.leaveSearchMode}
          />
        </AutoComplete>
      </span>
    );
  },
};

export default HeaderSearch;
