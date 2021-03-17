import { Component, Element, Event, EventEmitter, Host, Method, Prop, State, Watch, h } from "@stencil/core";
import { Validator, getValidator } from "../../utils/validator/validator.factory";

import { linkLabelComponents } from "../../utils/form-helpers";
import { uuidWithPrefix } from "../../utils/helpers";

/**
 * A validation rule that can be used to validate an input field.
 */
export type ValidationRule = {
  name?: string;
  options?: any;
  validator?: (
    options: any,
  ) => {
    validate: (value: string) => boolean;
    errorMessage: string;
  };
};

@Component({
  tag: "clio-input",
  styleUrl: "./input.scss",
  scoped: true,
})
export class Input {
  private readonly inputElementId = uuidWithPrefix("clio-input");
  private inputElement: HTMLInputElement;
  private clioLabelElement: HTMLClioLabelElement;
  private clioSubLabelElement: HTMLClioLabelElement;
  private validator: Validator;
  private inputIconElement: HTMLElement;

  @State() dirty = false;
  @State() errorMessage = "";
  @State() focused = false;
  @State() valid = true;

  @Element() element: HTMLClioInputElement;

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
   * Indicates whether the value of the control can be automatically completed by the browser.
   */
  @Prop() autocomplete: "off" | "on" = "on";

  /**
   * Specify that a form control should have input focus when the page loads.
   */
  @Prop() autofocus: boolean = false;

  /**
   * The type of input field to display.
   */
  @Prop() type: "date" | "email" | "number" | "password" | "search" | "tel" | "text" | "time" | "url" = "text";

  /**
   * Instructional text that shows before the input has a value.
   */
  @Prop() placeholder: string;

  /**
   * The name of the input, which is submitted with the form data.
   */
  @Prop() name!: string;

  /**
   * If true the input field cannot be interacted with.
   */
  @Prop() disabled: boolean;

  /**
   * If true the input field is required.
   */
  @Prop() required: boolean;

  /**
   * The label for the input.
   */
  @Prop() label?: string;

  /**
   * If true the input field will show a loading icon.
   */
  @Prop() loading: boolean = false;

  /**
   * The sub-label for the input.
   */
  @Prop() subLabel?: string;

  /**
   * Specifies the value of the element
   */
  @Prop({ reflect: true }) value: string;

  /**
   * An array of validation rules can be passed in to provide validation checking.
   */
  @Prop() validationRules: ValidationRule[];

  @Watch("validationRules")
  private updateValidationRules(validationRules: ValidationRule[]) {
    this.validator = validationRules ? getValidator(validationRules) : undefined;
  }

  /**
   * Specifies the icon that is to be associated with the input.
   */
  @Prop() icon?: "caret-down" | "checkbox" | "dash" | "error";

  /**
   * Provides additional context to the user, (ex. “$” or “$/hr”).
   */
  @Prop() suffix?: string;

  /**
   * Emitted when the enter key is pressed.
   */
  @Event() clioInputEnterKeyPress!: EventEmitter;

  /**
   * Emitted when the input loses focus.
   */
  @Event() clioBlur!: EventEmitter<void>;

  /**
   * Returns the validity state of the input.
   * @returns {Promise<boolean>}
   */
  @Method()
  public async isValid(): Promise<boolean> {
    this.handleValidity();
    return this.valid;
  }

  /**
   * Forces the input to validate. It calls handleValidity() and passes an optional `force` boolean.
   * @returns {Promise<void>}
   */
  @Method()
  public async validate(): Promise<void> {
    this.handleValidity(true);
  }

  /**
   * Returns the dirty state of the input.
   * @returns {Promise<boolean>}
   */
  @Method()
  public async isDirty(): Promise<boolean> {
    return this.dirty;
  }

  /**
   * Manually sets the dirty state of the input.
   */
  @Method()
  public async setDirty(dirty: boolean) {
    this.dirty = dirty;
  }

  /**
   * A method that returns the input's icon element.
   */
  @Method()
  public async getIconElement() {
    return this.inputIconElement;
  }
  /**
   * Sets focus on the specified `clio-input`. Use this method instead of the global
   * `input.focus()`.
   */
  @Method()
  public async setFocus() {
    if (this.inputElement) {
      this.inputElement.focus();
    }
  }

  public componentDidLoad() {
    this.updateValidationRules(this.validationRules);

    linkLabelComponents(this.inputElement, this.clioLabelElement, this.clioSubLabelElement);
  }

  private onBlur = () => {
    this.handleValidity();
    this.focused = false;
    this.dirty = this.value ? true : this.dirty;
    this.clioBlur.emit();
  };

  private onFocus = () => {
    // We want clio-input's text to be selected whenever it is focused
    this.inputElement.select();
    this.focused = true;
  };

  private onInput = (ev: Event) => {
    const input = ev.target as HTMLInputElement | null;
    if (input) {
      this.value = input.value || "";
    }
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      this.handleValidity();
      this.clioInputEnterKeyPress.emit();
    }
  };

  private async handleValidity(force?: boolean) {
    if (this.validator) {
      this.valid = this.validator.validate(this.inputElement.value);
      this.dirty = force ? true : this.dirty;
      this.errorMessage = this.validator.errorMessage;
      this.inputElement.setCustomValidity(this.valid ? "" : this.errorMessage);
    }
  }

  public render() {
    return (
      <Host>
        {this.label ? (
          <clio-label ref={el => (this.clioLabelElement = el)} label-type={this.required ? "required" : null}>
            {this.label}
          </clio-label>
        ) : null}
        <div
          class={{
            "text-input--container": true,
            "text-input--container__focus": this.focused,
            "text-input--container__error": !this.valid && this.dirty,
          }}
        >
          <input
            aria-describedby={this.ariaDescribedby}
            aria-disabled={this.disabled ? "true" : null}
            aria-label={this.ariaLabel}
            aria-labelledby={this.ariaLabelledby}
            autocomplete={this.autocomplete}
            autofocus={this.autofocus}
            class={{
              "text-input": true,
              "text-input--has-loader": !!this.loading,
              "text-input--has-icon": !!this.icon,
            }}
            disabled={this.disabled}
            id={this.inputElementId}
            name={this.name}
            onBlur={this.onBlur}
            onInput={this.onInput}
            onFocus={this.onFocus}
            onKeyDown={this.handleKeyDown}
            placeholder={this.placeholder}
            ref={el => (this.inputElement = el as HTMLInputElement)}
            required={this.required}
            type={this.type}
            value={this.value}
          />
          {this.loading ? (
            <div class="text-input__loader">
              <clio-loader size="small"></clio-loader>
            </div>
          ) : null}
          {this.icon ? (
            <div class="text-input__icon" ref={el => (this.inputIconElement = el)}>
              <clio-icon name={this.icon} />
            </div>
          ) : null}
          {this.suffix ? <div class="text-input__suffix">{this.suffix}</div> : null}
        </div>
        {this.subLabel ? (
          <clio-label ref={el => (this.clioSubLabelElement = el)} label-type="sub-label">
            {this.subLabel}
          </clio-label>
        ) : null}
        {!this.valid && this.dirty ? <clio-form-error message={this.errorMessage}></clio-form-error> : null}
      </Host>
    );
  }
}
