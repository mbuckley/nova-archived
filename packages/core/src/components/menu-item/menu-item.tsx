import { Component, Element, Event, EventEmitter, Listen, Prop, Watch, h } from "@stencil/core";

@Component({
  tag: "clio-menu-item",
  styleUrl: "./menu-item.scss",
  shadow: true,
})
export class MenuItem {
  private clickEventListener: EventListener;

  @Element() element: HTMLClioMenuItemElement;
  /**
   * The link that the user would like the menu-item to lead to.
   */
  @Prop() href?: string;

  /**
   * If true, the user cannot interact with the menu item.
   */
  @Prop() disabled?: boolean = false;

  /**
   * Emitted when the menu item is activated by a click or keydown event.
   */
  @Event() clioMenuItemActivated!: EventEmitter;

  /**
   * Emitted when the menu item is hovered by a mouse.
   */
  @Event() clioMenuItemHovered!: EventEmitter;

  @Watch("disabled")
  public disabledWatchHandler() {
    this.addOrRemoveClickEventListener();
  }

  @Listen("click", { capture: true })
  public handleClick() {
    if (!this.disabled) {
      this.clioMenuItemActivated.emit();
    }
  }

  public componentWillLoad() {
    this.clickEventListener = this.element.onclick;
    this.addOrRemoveClickEventListener();
  }

  /* Since we rely on native `onClick` event for item click action,
   * we cannot prevent the listener to be added for disabled menu items.
   * Hence, the logic to add/remove the event listener based on value of disabled prop
   */
  private addOrRemoveClickEventListener() {
    if (this.disabled) {
      this.element.onclick = null;
    } else {
      this.element.onclick = this.clickEventListener;
    }
  }

  private handleMouseEnter = () => {
    this.clioMenuItemHovered.emit();
  };

  public render() {
    const isHrefDefined = !!this.href;
    const attrs = isHrefDefined
      ? {
          role: "none",
        }
      : {
          role: "menuitem",
          tabindex: this.disabled ? "-1" : "0",
        };

    return (
      <li
        {...attrs}
        class={{ "menu-item": true, "menu-item--has-href": isHrefDefined, "menu-item--disabled": this.disabled }}
        onMouseEnter={this.handleMouseEnter}
      >
        {isHrefDefined ? (
          <a
            href={this.disabled ? null : this.href}
            target="blank"
            role="menuitem"
            tabindex={this.disabled ? "-1" : "0"}
            class="menu-item__anchor"
          >
            <slot />
          </a>
        ) : (
          <slot />
        )}
      </li>
    );
  }
}
