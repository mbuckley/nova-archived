```html
<clio-combo-button id="my-combo-button" primary-action-label="Default combo button">
  <clio-menu slot="parent-slot">
    <clio-menu-item onclick="console.log('One')">Example One</clio-menu-item>
    <clio-menu-item onclick="console.log('Two')">Example Two</clio-menu-item>
    <clio-menu-item onclick="console.log('Three')">Example Three</clio-menu-item>
  </clio-menu>
</clio-combo-button>
```

```javascript
const primaryButtonAction = () => {
  console.log("primaryButtonAction called !");
};
const comboButton = document.getElementById("my-combo-button");
comboButton.primaryActionClick = primaryButtonAction;
```
