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
