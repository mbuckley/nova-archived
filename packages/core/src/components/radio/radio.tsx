import { Component, Host, Prop, State, Element, h } from "@stencil/core";
import { linkLabelComponents } from "../../utils/form-helpers";
import { uuidWithPrefix } from "../../utils/helpers";

@Component({
  tag: "clio-radio",
  styleUrl: "./radio.scss",
  scoped: true,
})
export class Radio {
  private readonly inputElementId = uuidWithPrefix("clio-radio");
  private inputElement: HTMLInputElement;
  private clioLabelElement: HTMLClioLabelElement;
  private radioGroup: HTMLClioRadioGroupElement | null = null;

  @Element() element!: HTMLClioRadioElement;

  /**
   * If true, the radio is selected.
   */
  @State() checked = false;

  /**
   * If a custom sub-label element is being used, set this to the `id` of that sub-label element to provide context for screen readers.
   */
  @Prop() ariaDescribedby?: string;

  /**
   * If no visible label is provided, use this to provide context for screen readers.
   */
  @Prop() ariaLabel?: string;

  /**
   * If a custom label element is being used, set this to the `id` of that label element to provide context for screen readers.
   */
  @Prop() ariaLabelledby?: string;

  /**
   * If true, radio cannot be interacted with.
   */
  @Prop({ reflect: true }) disabled?: boolean = false;

  /**
   * The label for the radio.
   */
  @Prop() label?: string;

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string;

  /**
   * The value of the radio.
   */
  @Prop() value: any;

  private updateState = () => {
    if (this.radioGroup) {
      this.checked = this.radioGroup.value === this.value;
    }
  };

  public connectedCallback() {
    const radioGroup = (this.radioGroup = this.element.closest("clio-radio-group"));
    if (radioGroup) {
      this.updateState();
      radioGroup.addEventListener("clioChange", this.updateState);
    }
  }

  public disconnectedCallback() {
    const radioGroup = this.radioGroup;
    if (radioGroup) {
      radioGroup.removeEventListener("clioChange", this.updateState);
      if (this.checked) {
        radioGroup.value = undefined;
      }
      this.radioGroup = null;
    }
  }

  public componentDidLoad() {
    linkLabelComponents(this.inputElement, this.clioLabelElement);
  }

  public render() {
    return (
      <Host>
        <input
          id={this.inputElementId}
          type="radio"
          ref={el => (this.inputElement = el)}
          disabled={this.disabled}
          value={this.value}
          checked={this.checked}
          name={this.name}
          aria-checked={`${this.checked}`}
          aria-disabled={this.disabled ? "true" : null}
          aria-describedby={this.ariaDescribedby}
          aria-label={this.ariaLabel}
          aria-labelledby={this.ariaLabelledby}
        />
        <span class="radio-circle"></span>

        {!!this.label ? <clio-label ref={el => (this.clioLabelElement = el)}>{this.label}</clio-label> : null}
      </Host>
    );
  }
}
