---
order: 0
title: 演示
iframe: 400
---

基本页脚。

```jsx
import GlobalFooter from 'ant-design-vue-pro/lib/GlobalFooter';
import { Icon } from 'ant-design-vue';

export default {
  render() {
    const links = [
      {
        key: '帮助',
        title: '帮助',
        href: '',
      },
      {
        key: 'github',
        title: <Icon type="github" />,
        href: 'https://github.com/vueComponent/ant-design-vue-pro',
        blankTarget: true,
      },
      {
        key: '条款',
        title: '条款',
        href: '',
        blankTarget: true,
      },
    ];
    const copyright = (
      <div>
        Copyright <Icon type="copyright" /> 2017 蚂蚁金服体验技术部出品
      </div>
    );
    return (
      <div style={{ background: '#f5f5f5', overflow: 'hidden' }}>
        <div style={{ height: 280 }} />
        <GlobalFooter links={links} copyright={copyright} />
      </div>
    )
  }
}
```
