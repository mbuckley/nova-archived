import { Component, Element, Event, EventEmitter, Listen, Method, Prop, h } from "@stencil/core";

@Component({
  tag: "clio-form",
  styleUrl: "./form.scss",
  scoped: true,
})
export class Form {
  private clioFormInputTypes = ["clio-input", "clio-checkbox", "clio-select", "clio-radio", "clio-textarea"];
  private formElement: HTMLFormElement;

  @Element() element: HTMLClioFormElement;
  /**
   * The URI of a program that processes the form information.
   */
  @Prop() action?: string;

  /**
   * If true, form won't be submitted through an AJAX request and will redirect to the action URL after the form has been submitted.
   */
  @Prop() allowRedirect?: boolean;

  /**
   * Labels the form for screen readers.
   */
  @Prop() ariaLabel?: string;

  /**
   * The id of the element that labels the form.
   */
  @Prop() ariaLabelledby?: string;

  /**
   * The id of the element which describes the form.
   */
  @Prop() ariaDescribedby?: string;

  /**
   * Indicates whether input elements can by default have their values automatically completed by the browser.
   */
  @Prop() autocomplete?: "on" | "off";

  /**
   * When the value of the method attribute is post, enctype is the MIME type of content that is used to submit the form to the server.
   */
  @Prop() enctype?: "application/x-www-form-urlencoded" | "multipart/form-data" | "text/plain";

  /**
   * The HTTP method that the browser uses to submit the form.
   */
  @Prop() method?: "post" | "get" | "dialog" = "post";

  /**
   * The name of the form.
   */
  @Prop() name?: string;

  /**
   * This indicates that the form is not to be validated when submitted.
   */
  @Prop() novalidate?: boolean;

  /**
   * A name or keyword indicating where to display the response that is received after submitting the form.
   */
  @Prop() target?: "_self" | "_blank" | "_parent" | "_top" | string;

  /**
   * Emitted when the form has been submitted.
   */
  @Event() clioSubmit: EventEmitter;

  @Listen("clioInputEnterKeyPress")
  public handleEnterKeyPress(ev: CustomEvent) {
    this.handleSubmit(ev);
  }

  /**
   * Submit the form.
   * @returns {Promise<void>}
   */
  @Method()
  public async submit(): Promise<void> {
    this.handleSubmit();
  }

  /**
   * Returns true if the form is valid.
   * @returns {Promise<boolean>}
   */
  @Method()
  public async isValid(): Promise<boolean> {
    return this.formElement.checkValidity();
  }

  /**
   * Returns true if the form contains dirty inputs.
   * @returns {Promise<boolean>}
   */
  @Method()
  public async isDirty(): Promise<boolean> {
    const dirtyValues = await Promise.all(this.getClioFormComponents().map(el => el.isDirty()));
    return dirtyValues.find(dirty => dirty === true) ? true : false;
  }

  /**
   * Forces the form to validate. It calls triggerValidationChecks() which calls the .validate() method on each input
   * @returns {Promise<void>}
   */
  @Method()
  public async validate(): Promise<void> {
    this.triggerValidationChecks();
  }

  private getClioFormComponents() {
    return this.clioFormInputTypes.reduce((elements, type) => {
      this.element.querySelectorAll(type).forEach(e => elements.push(e));
      return elements;
    }, []);
  }

  private triggerValidationChecks() {
    this.getClioFormComponents().forEach(el => {
      typeof el.validate === "function" ? el.validate() : null;
    });
  }

  private setInputDirtyStates() {
    this.getClioFormComponents().forEach(el => {
      typeof el.setDirty === "function" ? el.setDirty(true) : null;
    });
  }

  private handleSubmit = (event: Event = null) => {
    if (event) {
      event.preventDefault();
    }

    this.setInputDirtyStates();
    this.triggerValidationChecks();

    if (this.formElement.checkValidity()) {
      if (this.allowRedirect) {
        // Standard form submission
        this.formElement.submit();
      } else {
        // AJAX submission
        this.clioSubmit.emit();
      }
    }
  };

  public render() {
    return (
      <form
        action={this.action}
        aria-label={this.ariaLabel}
        aria-labelledby={this.ariaLabelledby}
        aria-describedby={this.ariaDescribedby}
        autocomplete={this.autocomplete}
        enctype={this.enctype}
        method={this.method}
        name={this.name}
        novalidate={this.novalidate}
        onSubmit={this.handleSubmit}
        ref={el => (this.formElement = el)}
        target={this.target}
      >
        <slot />
      </form>
    );
  }
}
