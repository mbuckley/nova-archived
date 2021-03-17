import { Component, Host, Prop, h } from "@stencil/core";

@Component({
  tag: "clio-form-error",
  styleUrl: "./form-error.scss",
  scoped: true,
})
export class FormError {
  /**
   * A custom error message. Use this to override HTML5 validation message.
   */
  @Prop() message?: string;

  public render() {
    return (
      <Host>
        <clio-icon name="error" color="#E41B28" aria-hidden="true" />
        <span aria-live="polite">{this.message}</span>
      </Host>
    );
  }
}
