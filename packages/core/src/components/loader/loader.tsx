import { Component, Host, Prop, h } from "@stencil/core";
import { Components } from "../../components";

@Component({
  tag: "clio-loader",
  styleUrl: "./loader.scss",
  shadow: true,
})
export class Loader implements Components.ClioLoader {
  /**
   * Labels the form for screen readers.
   */
  @Prop() ariaLabel?: string = "Content is loading";

  /**
   * Sets the loader to "default" or "reversed" style.
   */
  @Prop() loaderStyle?: "reversed" | "default" = "default";

  /**
   * Sets the size of Sets the size of the loader.
   */
  @Prop() size?: "small" | "large" = "large";

  public render() {
    return (
      <Host role="status" aria-label={this.ariaLabel}>
        <div class={`loader loader--${this.size}`}>
          <svg class={`loader-svg loader-svg--${this.loaderStyle}`} viewBox="25 25 50 50" focusable="false">
            <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-miterlimit="10" />
          </svg>
        </div>
      </Host>
    );
  }
}
