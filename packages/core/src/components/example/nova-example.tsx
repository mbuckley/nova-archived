import { Component, Host, Prop, h } from "@stencil/core";

@Component({
  tag: "nova-example",
  styleUrl: "./nova-example.scss",
  scoped: true,
})
export class NovaExample {
  /**
   * This property sets a title label for the example
   */
  @Prop() label = "";

  public render() {
    return (
      <Host>
        <figure class="example">
          <figcaption class="example__title">{this.label}</figcaption>
          <slot />
        </figure>
      </Host>
    );
  }
}
