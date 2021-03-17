import { Component, Host, Prop, State, Element, h } from "@stencil/core";
import { CaretDown, Checkbox, Dash, Error } from "./icons";

@Component({
  tag: "clio-icon",
  styleUrl: "./icon.scss",
  shadow: true,
})
export class Icon {
  @Element() element: HTMLClioIconElement;

  @State() private svgContent?: SVGElement;

  /**
   * The name of the icon to render.
   */
  @Prop() name!: "caret-down" | "checkbox" | "dash" | "error";

  /**
   * The color for the icon. Accepts hexidecimal, rgb(a), hsl(a), and string values.
   */
  @Prop() color?: string = "#000000";

  /**
   * Used this to provide context for screen readers. Defaults to the icon name.
   */
  @Prop({ mutable: true, reflectToAttr: true }) ariaLabel?: string;

  private loadSVGContent() {
    switch (this.name) {
      case "caret-down":
        this.svgContent = <CaretDown color={this.color} />;
        break;
      case "checkbox":
        this.svgContent = <Checkbox color={this.color} />;
        break;
      case "dash":
        this.svgContent = <Dash color={this.color} />;
        break;
      case "error":
        this.svgContent = <Error color={this.color} />;
        break;
      default:
        console.warn(`clio-icon: "${this.name}" is not a valid icon name.`);
    }
  }

  private setAriaLabel() {
    // Creates a label based on the icon name if not provided
    if (!this.ariaLabel && this.svgContent) {
      this.ariaLabel = this.name.replace(/\-/g, " ");
    }
  }

  public componentWillLoad() {
    this.loadSVGContent();
    this.setAriaLabel();
  }

  public render() {
    return (
      <Host>
        {this.svgContent ? (
          <div role="img" class="icon">
            {this.svgContent}
          </div>
        ) : null}
      </Host>
    );
  }
}
