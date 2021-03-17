import { h } from "@stencil/core";

export default () => <docs-nav items={items} />;

const items = {
  CSS: {
    Architecture: "/css/architecture",
    Styleguide: "/css/styleguide",
  },
  Foundations: {
    Colors: "/foundations/colors",
    Typography: "/foundations/typography",
    Spacing: "/foundations/spacing",
  },
};
