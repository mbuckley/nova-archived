import { Component, Element, Event, EventEmitter, Host, Prop, Watch, h } from "@stencil/core";

@Component({
  tag: "clio-button",
  styleUrl: "./button.scss",
  shadow: true,
})
export class Button {
  @Element() element: HTMLClioButtonElement;

  /**
   * This property defines the priority or role of a button.
   */
  @Prop() buttonStyle?: "primary" | "secondary" | "danger" = "secondary";

  /**
   * The type of the button.
   */
  @Prop({ reflect: true }) type?: "submit" | "reset" | "button" = "button";

  /**
   * Defines the two available size formats for buttons. Set to `small` where space is at a premium, such as in a data table.
   */
  @Prop() size?: "default" | "small" = "default";

  /**
   * If true, the user cannot interact with the button.
   */
  @Prop({ reflect: true }) disabled?: boolean = false;

  /**
   * If true, renders a loading state and the user cannot interact with the button.
   */
  @Prop() loading?: boolean = false;

  /**
   * The link that the user would like the button to lead to
   */
  @Prop() href?: string;

  /**
   * The specified target that the link will open in
   */
  @Prop() target?: "_blank" | "_self" | "_parent" | "_top" | "framename" = "_blank";

  /**
   * The relationship between the current document and the linked document
   */
  @Prop() rel?: "noopener" | "noreferrer";

  /**
   * Emitted when the button has focus.
   */
  @Event() clioFocus!: EventEmitter<void>;

  /**
   * Emitted when the button loses focus.
   */
  @Event() clioBlur!: EventEmitter<void>;

  @Watch("loading")
  public updateDisabled(loading: boolean) {
    this.disabled = loading;
  }

  public componentWillLoad() {
    if (this.loading) {
      this.updateDisabled(this.loading);
    }
  }

  private handleKeyDown = (ev: KeyboardEvent) => {
    if (ev.key === " " && this.href) {
      this.element.shadowRoot.querySelector("a").click();
    }
  };

  private handleClick = (ev: Event) => {
    /* The code below is needed to enable clio-button function as a submit button when used inside form i.e. <clio-button type="submit">Submit</clio-button>
     * Because of the shadow dom, it does not implicitly submit a form when clicked
     * There is on-going discussion in Web components project to address these:
     * https://github.com/w3c/webcomponents/issues/814
     * https://github.com/w3c/webcomponents/issues/187
     */
    if (this.type === "submit" || this.type === "reset") {
      const form = this.element.closest("form");
      if (form) {
        ev.preventDefault();

        const fakeButton = document.createElement("button");
        fakeButton.type = this.type;
        fakeButton.style.display = "none";
        form.appendChild(fakeButton);
        fakeButton.click();
        fakeButton.remove();
      }
    }
  };

  private onFocus = () => {
    this.clioFocus.emit();
  };

  private onBlur = () => {
    this.clioBlur.emit();
  };

  private getClasses() {
    return {
      [`clio-button`]: true,
      [`clio-button--${this.buttonStyle}`]: true,
      [`clio-button--${this.size}`]: true,
      ["clio-button__loading"]: this.loading,
    };
  }

  public render() {
    if (this.href !== undefined) {
      return (
        <Host>
          <a
            onKeyDown={this.handleKeyDown}
            aria-disabled={this.disabled ? "true" : null}
            role="button"
            class={this.getClasses()}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            href={this.href}
            rel={this.rel}
            target={this.target}
            tabindex={this.disabled ? "-1" : null}
          >
            <span class="clio-button--content">
              <slot></slot>
            </span>
            {this.loading ? <clio-loader class="clio-button--loader" size="small" /> : null}
          </a>
        </Host>
      );
    } else {
      return (
        <Host>
          <button
            class={this.getClasses()}
            onClick={this.handleClick}
            type={this.type}
            aria-disabled={this.disabled ? "true" : null}
            disabled={this.disabled}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
          >
            <span class="clio-button--content">
              <slot></slot>
            </span>
            {this.loading ? <clio-loader class="clio-button--loader" size="small" /> : null}
          </button>
        </Host>
      );
    }
  }
}
