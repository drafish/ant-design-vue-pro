import { Spin } from "ant-design-vue";
// import isEqual from "lodash/isEqual";
import { cloneElement } from "ant-design-vue/es/_util/vnode";
import { isValidElement } from "ant-design-vue/es/_util/props-util";
import { isComponentClass } from "./Secured";

export default {
  name: "PromiseRender",

  data() {
    return {
      component: null,
    };
  },

  mounted() {
    this.setRenderComponent(this.props);
  },

  // shouldComponentUpdate(nextProps, nextState) {
  //   const { component } = this.state;
  //   if (!isEqual(nextProps, this.props)) {
  //     this.setRenderComponent(nextProps);
  //   }
  //   if (nextState.component !== component) return true;
  //   return false;
  // },

  methods: {
    // set render Component : ok or error
    setRenderComponent(props) {
      const ok = this.checkIsInstantiation(props.ok);
      const error = this.checkIsInstantiation(props.error);
      props.promise
        .then(() => {
          this.component = ok;
        })
        .catch(() => {
          this.component = error;
        });
    },

    // Determine whether the incoming component has been instantiated
    // AuthorizedRoute is already instantiated
    // Authorized  render is already instantiated, children is no instantiated
    // Secured is not instantiated
    checkIsInstantiation(target) {
      if (isComponentClass(target)) {
        const Target = target;
        return props => <Target {...{ props }} />;
      }
      if (isValidElement(target)) {
        return props => cloneElement(target, props);
      }
      return () => target;
    },
  },

  render() {
    const { component: Component } = this.$data;
    // eslint-disable-next-line
    const { ok, error, promise, ...rest } = this.$props;
    return Component ? (
      <Component {...{ props: rest }} />
    ) : (
      <div
        style={{
          width: "100%",
          height: "100%",
          margin: "auto",
          paddingTop: 50,
          textAlign: "center",
        }}
      >
        <Spin size="large" />
      </div>
    );
  },
};
