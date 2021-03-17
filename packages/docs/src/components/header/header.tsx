import { Component, Listen, Prop, State, h } from "@stencil/core";
import { ForwardArrow, Logo, GitHub } from "../../icons";

@Component({
  tag: "docs-header",
  styleUrl: "header.css",
})
export class DocsHeader {
  @State() hidden = false;
  private frameRequested = false;
  private prevScroll = 0;

  @Prop() onToggleClick: (e: Event) => void;

  @Listen("scroll", { target: "window" })
  handleScroll() {
    if (!this.frameRequested) {
      requestAnimationFrame(() => {
        const { scrollY } = window;
        this.hidden = scrollY > 60 && scrollY > this.prevScroll;
        this.prevScroll = scrollY;
        this.frameRequested = false;
      });
      this.frameRequested = true;
    }
  }

  hostData() {
    return {
      class: { hidden: this.hidden },
    };
  }

  renderMenu() {
    return (
      <div class="SectionNav-tabs">
        <stencil-route-link url="/" urlMatch={[/^(?!\/(api|components)).*$/]}>
          Guide
        </stencil-route-link>
        <stencil-route-link url="/components" urlMatch={["/api", "/components"]}>
          Components
        </stencil-route-link>
      </div>
    );
  }

  render() {
    return (
      <header>
        <docs-menu-toggle onClick={this.onToggleClick} />

        <stencil-route-link url="/">
          <Logo class="HeaderLogo" />
        </stencil-route-link>

        <header-mobile-collapse>
          <nav class="SectionNav">
            <stencil-route-switch>
              <stencil-route>{this.renderMenu()}</stencil-route>
            </stencil-route-switch>
          </nav>

          <nav class="UtilNav">
            <ionic-search></ionic-search>
            <a href="https://github.com/clio/design_system" target="_blank" class="nova-icon">
              <GitHub class="lg-only" />
              <span class="sm-only">
                GitHub <ForwardArrow class="Dropdown-arrow" />
              </span>
            </a>
          </nav>
        </header-mobile-collapse>
      </header>
    );
  }
}
