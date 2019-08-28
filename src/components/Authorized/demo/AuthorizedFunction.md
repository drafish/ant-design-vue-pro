---
order: 2
title:
  zh-CN: 使用方法作为参数
  en-US: Use function as a parameter
---

Use Function as a parameter

```jsx
import RenderAuthorized from 'ant-design-vue-pro/lib/Authorized';
import { Alert } from 'ant-design-vue';

export default {
  render() {
    const Authorized = RenderAuthorized('user');
    const noMatch = <Alert message="No permission." type="error" showIcon />;

    const havePermission = () => {
      return false;
    };
    return (
      <Authorized authority={havePermission} noMatch={noMatch}>
        <Alert message="Use Function as a parameter passed!" type="success" showIcon />
      </Authorized>
    )
  }
}
```
