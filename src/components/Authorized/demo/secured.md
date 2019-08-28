---
order: 3
title:
  zh-CN: 注解基本使用
  en-US: Basic use secured
---

secured demo used

```jsx
import RenderAuthorized from 'ant-design-vue-pro/lib/Authorized';
import { Alert } from 'ant-design-vue';

const { Secured } = RenderAuthorized('user');

const TestSecuredString = {
  render() {
    return <Alert message="user Passed!" type="success" showIcon />;
  }
}
export default Secured('admin')(TestSecuredString)
```
