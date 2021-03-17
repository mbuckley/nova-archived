import { Component, Element, Event, EventEmitter, Host, Method, Prop, State, h } from "@stencil/core";

import { linkLabelComponents } from "../../utils/form-helpers";
import { uuidWithPrefix } from "../../utils/helpers";

@Component({
  tag: "clio-checkbox",
  styleUrl: "./checkbox.scss",
  scoped: true,
})
export class Checkbox {
  private readonly inputElementId = uuidWithPrefix("clio-checkbox");
  private inputElement: HTMLInputElement;
  private clioLabelElement: HTMLClioLabelElement;

  @State() errorMessage = null;
  @State() valid = true;

  @Element() element: HTMLClioCheckboxElement;

  /**
   * The ID of the element that describes the checkbox.
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
   * If true, the checkbox will visually appear as indeterminate.
   */
  @Prop() indeterminate?: boolean = false;

  /**
   * If true, the checkbox is checked.
   */
  @Prop() checked: boolean = false;

  /**
   * If true, the checkbox cannot be interacted with.
   */
  @Prop({ reflect: true }) disabled?: boolean = false;

  /**
   * The label for the checkbox.
   */
  @Prop() label?: string;

  /**
   * If true, the checkbox is required.
   */
  @Prop() required?: boolean;

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string;

  /**
   * The value of the toggle does not mean if it's checked or not, use the `checked`
   * property for that.
   *
   * The value of a toggle is analogous to the value of a `<input type="checkbox">`,
   * it's only used when the toggle participates in a native `<form>`. Defaults to "on".
   */
  @Prop() value?: string | number;

  /**
   * Emitted when `checked` value changes.
   */
  @Event() clioChange: EventEmitter<{ checked: boolean }>;

  /**
   * Forces the checkbox to validate.
   * @returns {Promise<void>}
   */
  @Method()
  public async validate(): Promise<void> {
    this.valid = this.inputElement.checkValidity();
    this.errorMessage = !this.valid && this.required ? "This field is required." : null;
  }

  /**
   * Returns the validity state of the checkbox.
   * @returns {Promise<boolean>}
   */
  @Method()
  public async isValid(): Promise<boolean> {
    this.valid = this.inputElement.checkValidity();
    return this.valid;
  }

  private getIconElement = () => {
    if (this.checked || this.indeterminate) {
      const iconName = this.indeterminate ? "dash" : "checkbox";
      return <clio-icon name={iconName} color="#ffffff" class="icon--container__auto" />;
    }
  };

  private handleChange = async (ev: Event) => {
    const target = ev.target as HTMLInputElement;
    this.indeterminate = !!this.indeterminate ? target.indeterminate : false;
    this.checked = target.checked;
    await this.validate();
    this.clioChange.emit({ checked: this.inputElement.checked });
  };

  public componentDidLoad() {
    linkLabelComponents(this.inputElement, this.clioLabelElement);

    if (this.inputElement) {
      this.inputElement.indeterminate = this.indeterminate;
    }
  }

  public renderSubtext() {
    const labelEl = this.label ? (
      <clio-label ref={el => (this.clioLabelElement = el)} label-type={this.required ? "required" : null}>
        {this.label}
      </clio-label>
    ) : null;

    const errorMessageEl = this.errorMessage ? (
      <clio-form-error message={this.errorMessage} class="clio-checkbox__error"></clio-form-error>
    ) : null;

    if (!!labelEl || !!errorMessageEl) {
      return (
        <div class="clio-checkbox__subtext-container">
          {labelEl}
          {errorMessageEl}
        </div>
      );
    }
    return;
  }

  public render() {
    return (
      <Host>
        <div class="clio-checkbox__container">
          <input
            aria-describedby={this.ariaDescribedby}
            aria-label={this.ariaLabel}
            aria-labelledby={this.ariaLabelledby}
            checked={this.checked}
            class="clio-checkbox"
            disabled={this.disabled}
            id={this.inputElementId}
            name={this.name}
            onChange={this.handleChange}
            ref={el => (this.inputElement = el)}
            required={this.required}
            type="checkbox"
            value={this.value}
          />
          <span
            aria-hidden="true"
            class={{
              "clio-checkbox-icon": true,
              "clio-checkbox-icon__error": !!this.errorMessage,
            }}
          >
            {this.getIconElement()}
          </span>
          {this.renderSubtext()}
        </div>
      </Host>
    );
  }
}
