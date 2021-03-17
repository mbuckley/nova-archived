import { Component, Host, Prop, h } from "@stencil/core";

import { Components } from "../../components";

@Component({
  tag: "clio-pill",
  styleUrl: "./pill.scss",
  shadow: true,
})
export class Pill implements Components.ClioPill {
  /**
   * Sets the background color and corresponding text color of the pill.
   */
  @Prop() color: "green" | "yellow" | "orange" | "red" | "teal" | "grey" = "grey";

  public render() {
    return (
      <Host>
        <div class={`pill pill--${this.color}`}>
          <slot />
        </div>
      </Host>
    );
  }
}
