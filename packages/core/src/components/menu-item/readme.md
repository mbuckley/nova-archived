# clio-menu-item



<!-- Auto Generated Below -->


## Usage

### Javascript

```html
<clio-menu-item id="item-one" onclick="console.log('Triggered')">Apple</clio-menu-item>
<clio-button onclick="enableDisableMenuItem()">Enable/Disable</clio-button>
```

```javascript
const enableDisableMenuItem = id => {
  const el = document.getElementById("item-one");
  el.toggleAttribute("disabled");
};
```



## Properties

| Property   | Attribute  | Description                                                 | Type      | Default     |
| ---------- | ---------- | ----------------------------------------------------------- | --------- | ----------- |
| `disabled` | `disabled` | If true, the user cannot interact with the menu item.       | `boolean` | `false`     |
| `href`     | `href`     | The link that the user would like the menu-item to lead to. | `string`  | `undefined` |


## Events

| Event                   | Description                                                          | Type               |
| ----------------------- | -------------------------------------------------------------------- | ------------------ |
| `clioMenuItemActivated` | Emitted when the menu item is activated by a click or keydown event. | `CustomEvent<any>` |
| `clioMenuItemHovered`   | Emitted when the menu item is hovered by a mouse.                    | `CustomEvent<any>` |


## CSS Custom Properties

| Name                                   | Description                                                                        |
| -------------------------------------- | ---------------------------------------------------------------------------------- |
| `--menu-item-default-background-color` | The menu item's background color in the default state. Defaults to global --white. |
| `--menu-item-default-color`            | The menu item's text color in the default state. Defaults to global --grey-700.    |
| `--menu-item-padding-x`                | The menu item's horizontal padding. Defaults to global --spacing-m.                |
| `--menu-item-padding-y`                | The menu item's vertical padding. Defaults to global --spacing-s.                  |


----------------------------------------------

*Built with love!*
