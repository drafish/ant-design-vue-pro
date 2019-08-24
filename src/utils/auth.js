const currentAuth = ["admin"];
export { currentAuth };

export function getCurrentAuthority() {
  return currentAuth;
}

export function check(authority) {
  const current = getCurrentAuthority();
  return current.some(item => authority.includes(item));
}

// 授权模块还没写好，临时写一个函数凑合着用
export function proCheck(authority, target, Exception) {
  if (!authority) {
    return target;
  }
  const current = getCurrentAuthority();
  return current.some(item => authority.includes(item)) ? target : Exception;
}

export function isLogin() {
  const current = getCurrentAuthority();
  return current && current[0] !== "guest";
}
