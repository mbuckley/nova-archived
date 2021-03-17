```html
<clio-button id="menu-popover-activator" onclick="handlePopoverActivatorClick('menu-popover')">
  Click to see menu items
</clio-button>
<clio-popover id="menu-popover" active="true" align-x="left" align-y="bottom" padding="xs">
  <div slot="content">
    <clio-menu>
      <clio-menu-item onclick="alert('Triggered')">Apple</clio-menu-item>
      <clio-menu-item onclick="alert('Triggered')">Ball</clio-menu-item>
      <clio-menu-item onclick="alert('Triggered')">Cat</clio-menu-item>
    </clio-menu>
  </div>
</clio-popover>
```

```javascript
const handlePopoverActivatorClick = popoverId => {
  const popover = document.getElementById(popoverId);
  popover.active = !popover.active;
};

const initializePopover = () => {
  window.onload = () => {
    const popover = document.getElementById("menu-popover");
    const activator = document.getElementById("menu-popover-activator");
    popover.activator = activator;
  };
};

initializePopover();
```
