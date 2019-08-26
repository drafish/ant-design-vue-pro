---
title: NoticeIcon
subtitle:
cols: 1
order: 9
---

Used in navigation toolbar as a unified notification center for the entire product.

## API

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| count | Total number of messages | number | - |
| bell | Change the bell Icon | VNode | `<Icon type='bell' />` |
| loading | Popup card loading status | boolean | `false` |
| clear | Click to clear button the callback | function(tabName) | - |
| itemClick | Click on the list item's callback | function(item, tabProps) | - |
| popupVisibleChange | Popup Card Showing or Hiding Callbacks | function(visible) | - |
| tabChange | Switching callbacks for tabs | function(tabTitle) | - |
| viewMore | Callback of click for view more | function(tabProps, event) | - |
| popupVisible | Popup card display state | boolean | - |
| locale | Default message text | Object | `{ emptyText: 'No notifications', clear: 'Clear', viewMore: 'Loading more' }` |
| clearClose | Close menu after clear | boolean | `false` |

### NoticeIcon.Tab

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| count | Unread messages count of this tab | number | list.length |
| emptyText | Message text when list is empty | VNode | - |
| emptyImage | Image when list is empty | string | - |
| list | List data, format refer to the following table | Array | `[]` |
| showClear | Clear button display status | boolean | `true` |
| showViewMore | View more button display status | boolean | `false` |
| title | header for message Tab, the actual text is `locale[title] || title` | string | - |

### Tab data

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| avatar | avatar img url | string \| VNode | - |
| title | title | VNode | - |
| description | description info | VNode | - |
| datetime | Timestamps | VNode | - |
| extra | Additional information in the upper right corner of the list item | VNode | - |
| clickClose | Close menu after clicking list item | boolean | `false` |
