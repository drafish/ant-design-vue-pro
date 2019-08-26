---
title: HeaderSearch
subtitle:
cols: 1
order: 8
---

Usually placed as an entry to the global search, placed on the right side of the navigation toolbar.

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| placeholder | placeholder text | string | - |
| dataSource | current list of prompts | string[] | - |
| search | Called when searching items. | function(value) | - |
| change | Called when select an option or input value change, or value of input is changed | function(value) | - |
| select | Called when a option is selected. param is option's value and option instance. | function(value) | - |
| pressEnter | Callback when pressing Enter | function(value) | - |
| visibleChange | Show or hide the callback of the text box | function(value) | - |
| defaultOpen | The input box is displayed for the first time. | boolean | false |
| open | The input box is displayed | boolean | false |
