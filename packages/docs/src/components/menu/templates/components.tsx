import { h } from "@stencil/core";

export default () => <docs-nav items={items} />;

const items = {
  Buttons: {
    "clio-button": "/api/clio-button",
    "clio-combo-button": "/api/clio-combo-button",
  },
  "Form Elements": {
    "clio-checkbox": "/api/clio-checkbox",
    "clio-input": "/api/clio-input",
    "clio-label": "/api/clio-label",
    "clio-radio": "/api/clio-radio",
    "clio-select": "/api/clio-select",
    "clio-textarea": "/api/clio-textarea",
  },
  Other: {
    "clio-menu": "/api/clio-menu",
    "clio-menu-item": "/api/clio-menu-item",
    "clio-pill": "/api/clio-pill",
    "clio-popover": "/api/clio-popover",
    "clio-loader": "/api/clio-loader",
  },
};
