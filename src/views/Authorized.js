import { mapState, mapActions } from "vuex";
import pathToRegexp from "path-to-regexp";
import Authorized from "@/utils/Authorized";
import { getAuthority } from "@/utils/authority";
import Exception403 from "@/views/Exception/403";

const Redirect = {
  methods: {
    ...mapActions("login", ["logout"]),
  },
  render() {
    this.logout();
    return null;
  },
};
export default {
  name: "AuthComponent",
  computed: {
    ...mapState("menu", {
      routerData: state => state.routerData,
    }),
  },
  render() {
    const { routerData } = this;
    const children = this.$slots.default;
    const auth = getAuthority();
    const isLogin = auth && auth[0] !== "guest";
    console.log(isLogin);
    const getRouteAuthority = (path, routeData) => {
      let authorities;
      routeData.forEach(route => {
        // match prefix
        if (pathToRegexp(`${route.path}(.*)`).test(path)) {
          authorities = route.authority || authorities;

          // get children authority recursively
          if (route.children) {
            authorities =
              getRouteAuthority(path, route.children) || authorities;
          }
        }
      });
      return authorities;
    };
    return (
      <Authorized
        authority={getRouteAuthority(location.pathname, routerData)}
        noMatch={isLogin ? <Exception403 /> : <Redirect />}
      >
        {children}
      </Authorized>
    );
  },
};
