import { Component, Element, Host, Prop, State, Method, h } from "@stencil/core";
import { uuidWithPrefix } from "../../utils/helpers";
import { linkLabelComponents } from "../../utils/form-helpers";

@Component({
  tag: "clio-textarea",
  styleUrl: "./textarea.scss",
  scoped: true,
})
export class TextArea {
  private readonly inputElementId = uuidWithPrefix("clio-textarea");
  private textareaEl: HTMLTextAreaElement;
  private clioLabelElement: HTMLClioLabelElement;
  private clioSubLabelElement: HTMLClioLabelElement;
  private requiredMessage = "This field is required.";

  @State() dirty = false;
  @State() errorMessage = null;
  @State() valid = true;

  @Element() element: HTMLClioTextareaElement;

  /**
   * If no sub-label is provided, use this to provide context for screen readers.
   */
  @Prop() ariaDescribedby?: string;

  /**
   * If no label is provided, use this to provide context for screen readers.
   */
  @Prop() ariaLabel?: string;

  /**
   * If no label is provided, use this to provide context for screen readers.
   */
  @Prop() ariaLabelledby?: string;

  /**
   * Specify that a form control should give the textarea focus when the page loads.
   */
  @Prop() autofocus?: boolean = false;

  /**
   * If true, the textarea will be disabled.
   */
  @Prop() disabled?: boolean;

  /**
   * The name of the textarea, which is submitted with the form data.
   */
  @Prop() name!: string;

  /**
   * Instructional text that shows before the textarea has a value.
   */
  @Prop() placeholder?: string;

  /**
   * If true, the textarea is required.
   */
  @Prop() required?: boolean;

  /**
   * The label for the input.
   */
  @Prop() label?: string;

  /**
   * The sub-label for the input.
   */
  @Prop() subLabel?: string;

  /**
   * Specifies the value of the element.
   */
  @Prop({ reflect: true }) value?: string;

  /**
   * Forces the textarea to validate. Returns `true` if the textarea is valid.
   * @returns {Promise<boolean>}
   */
  @Method()
  public async validate(): Promise<boolean> {
    this.handleValidity(true);
    return this.valid;
  }

  /**
   * Returns the validity state of the textarea.
   * @returns {Promise<boolean>}
   */
  @Method()
  public async isValid(): Promise<boolean> {
    this.valid = this.textareaEl.checkValidity();
    return this.valid;
  }

  /**
   * Returns the dirty state of the textarea.
   * @returns {Promise<boolean>}
   */
  @Method()
  public async isDirty(): Promise<boolean> {
    return this.dirty;
  }

  /**
   * Manually sets the dirty state of the textarea.
   */
  @Method()
  public async setDirty(dirty: boolean) {
    this.dirty = dirty;
  }

  /**
   * Sets focus on the specified `clio-textarea`. Use this method instead of the global
   * `textarea.focus()`.
   */
  @Method()
  public async setFocus() {
    if (this.textareaEl) {
      this.textareaEl ? this.textareaEl.focus() : null;
    }
  }

  private onInput = (ev: Event) => {
    const input = ev.target as HTMLTextAreaElement | null;
    if (input) {
      this.value = input.value ? input.value : "";
    }
  };

  private onBlur = () => {
    this.dirty = this.value ? true : this.dirty;
    this.handleValidity();
  };

  private async handleValidity(force?: boolean) {
    if (this.required) {
      this.valid = this.textareaEl.checkValidity();
      this.dirty = force ? true : this.dirty;
      this.errorMessage = !this.valid ? this.requiredMessage : null;
    }
  }

  public componentWillLoad() {
    this.errorMessage = this.required ? this.requiredMessage : null;
  }

  public componentDidLoad() {
    linkLabelComponents(this.textareaEl, this.clioLabelElement, this.clioSubLabelElement);
  }

  public render() {
    return (
      <Host>
        {this.label ? (
          <clio-label ref={el => (this.clioLabelElement = el)} label-type={this.required ? "required" : null}>
            {this.label}
          </clio-label>
        ) : null}
        <textarea
          id={this.inputElementId}
          aria-describedby={this.ariaDescribedby}
          aria-disabled={this.disabled ? "true" : null}
          aria-label={this.ariaLabel}
          aria-labelledby={this.ariaLabelledby}
          autofocus={this.autofocus}
          class={{
            textarea: true,
            textarea__error: !this.valid && this.dirty,
          }}
          disabled={this.disabled}
          name={this.name}
          placeholder={this.placeholder}
          onBlur={this.onBlur}
          onInput={this.onInput}
          ref={el => {
            this.textareaEl = el as HTMLTextAreaElement;
          }}
          required={this.required}
          value={this.value}
        />
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
