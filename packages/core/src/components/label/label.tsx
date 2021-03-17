import { Component, Host, Prop, h } from "@stencil/core";

@Component({
  tag: "clio-label",
  styleUrl: "./label.scss",
  scoped: true,
})
export class Label {
  /**
   * The type of label. Allows a label to use the required or sub-label styling.
   */
  @Prop() labelType: "required" | "sub-label" | "default" = "default";

  /**
   * The id value of the input that the label is associated with.
   */
  @Prop() for?: string;

  public render() {
    return (
      <Host>
        <label htmlFor={this.for ? `${this.for}` : undefined} class={`label label-${this.labelType}`}>
          <span class="label-content">
            <slot />
          </span>
          {this.labelType === "required" ? <span class="required-indicator">Required</span> : null}
          {/* TODO: add an `optional` supplementary indicator when needed*/}
        </label>
      </Host>
    );
  }
}
