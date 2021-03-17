import { Component, Prop, h } from "@stencil/core";
import { Logo } from "../../icons";
import componentsTemplate from "./templates/components";
import mainTemplate from "./templates/main";

@Component({
  tag: "docs-menu",
  styleUrl: "menu.css",
})
export class DocsMenu {
  @Prop() onToggleClick: (e: Event) => void;

  render() {
    return [
      <header>
        <docs-menu-toggle onClick={this.onToggleClick} />
        <stencil-route-link url="/">
          <Logo class="MenuLogo" />
        </stencil-route-link>
      </header>,
      <stencil-route-switch scrollTopOffset={0}>
        <stencil-route url="/(components|api)" routeRender={componentsTemplate} />
        <stencil-route routeRender={mainTemplate} />
      </stencil-route-switch>,
    ];
  }
}
