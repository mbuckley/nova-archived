import { Component, Host, Listen, Prop, h } from "@stencil/core";

@Component({
  tag: "clio-combo-button",
  styleUrl: "./combo-button.scss",
  shadow: true,
})
export class ComboButton {
  private popoverElement: HTMLClioPopoverElement;
  private secondaryButtonEl: HTMLClioButtonElement;

  /**
   * Defines the two available size formats for combo-buttons. Set to small where space is at a premium, such as in a data table.
   */
  @Prop() size?: "default" | "small" = "default";

  /**
   * The text that will appear in the primary button.
   */
  @Prop() primaryActionLabel: string;

  /**
   * This property defines the priority or role of a button.
   */
  @Prop() buttonStyle?: "primary" | "secondary" | "danger" = "secondary";

  /**
   * The function that will handle the click event of the primary action button.
   */
  @Prop() primaryActionClick: Function;

  @Listen("clioMenuItemActivated", { target: "body" })
  public menuItemActivated() {
    this.popoverElement.active = false;
  }

  private handlePrimaryActionClick = () => {
    this.primaryActionClick();
  };

  private handleSecondaryActionClick = () => {
    this.popoverElement.active = !this.popoverElement.active;
  };

  public componentDidLoad() {
    this.popoverElement.activator = this.secondaryButtonEl;
  }

  public render() {
    return (
      <Host>
        <clio-button
          class="combo-button--primary"
          onClick={this.handlePrimaryActionClick}
          size={this.size}
          button-style={this.buttonStyle}
        >
          {this.primaryActionLabel}
        </clio-button>

        <clio-button
          class="combo-button--secondary"
          onClick={this.handleSecondaryActionClick}
          ref={el => (this.secondaryButtonEl = el as HTMLClioButtonElement)}
          size={this.size}
          button-style={this.buttonStyle}
          aria-label="More options"
        >
          <clio-icon
            class="icon--container__auto"
            name="caret-down"
            aria-hidden="true"
            color={this.buttonStyle === "secondary" ? "#263238" : "#ffffff"}
          />
        </clio-button>

        <clio-popover
          align-x="right"
          align-y="bottom"
          padding="none"
          ref={el => (this.popoverElement = el as HTMLClioPopoverElement)}
          active={false}
          autofocus={true}
          activator={this.secondaryButtonEl}
        >
          <slot name="parent-slot" slot="content"></slot>
        </clio-popover>
      </Host>
    );
  }
}
