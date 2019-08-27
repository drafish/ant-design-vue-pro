import CheckPermissions from "./CheckPermissions";

const Authorized = {
  functional: true,
  render(h, ctx) {
    const { children } = ctx;
    const { authority, noMatch = null } = ctx.props;
    const childrenRender = typeof children === "undefined" ? null : children;
    return CheckPermissions(authority, childrenRender, noMatch);
  }
};

export default Authorized;
