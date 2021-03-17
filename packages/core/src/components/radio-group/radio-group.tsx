import { Component, Host, Prop, Watch, Event, EventEmitter, Element, h } from "@stencil/core";
import { linkLabelComponents } from "../../utils/form-helpers";
import { uuidWithPrefix } from "../../utils/helpers";

@Component({
  tag: "clio-radio-group",
  styleUrl: "./radio-group.scss",
  scoped: true,
})
export class RadioGroup {
  private readonly radioGroupId = uuidWithPrefix("clio-radio-group");
  private clioLabelElement: HTMLClioLabelElement;
  private radioGroupElement: HTMLElement;

  @Element() element!: HTMLClioRadioGroupElement;

  /**
   * The name of the radio group, which is submitted with the form data.
   */
  @Prop() name: string;

  /**
   * The label for the radio group.
   */
  @Prop() label?: string;

  /**
   * The value of the radio group.
   */
  @Prop({ mutable: true }) value?: any;

  @Watch("value")
  public valueChanged(value: string) {
    this.clioChange.emit({ value });
    this.element.setAttribute("value", value);
  }

  /**
   * Emitted when the value has changed.
   */
  @Event() clioChange!: EventEmitter<{ value: string }>;

  private onClick = (ev: Event) => {
    const selectedRadio = ev.target && (ev.target as HTMLElement).closest("clio-radio");
    if (selectedRadio) {
      const currentValue = this.value;
      const newValue = selectedRadio.value;
      if (newValue !== currentValue) {
        this.value = newValue;
      }
    }
  };

  private linkLabelToRadioEls() {
    this.radioGroupElement
      .querySelectorAll("clio-radio")
      .forEach(el => el.setAttribute("aria-describedby", this.clioLabelElement.id));
  }

  public componentDidLoad() {
    if (this.clioLabelElement) {
      linkLabelComponents(this.radioGroupElement, this.clioLabelElement);
      this.linkLabelToRadioEls();
    }
  }

  public render() {
    return (
      <Host>
        {!!this.label ? <clio-label ref={el => (this.clioLabelElement = el)}>{this.label}</clio-label> : null}
        <span id={this.radioGroupId} role="radiogroup" ref={el => (this.radioGroupElement = el)} onClick={this.onClick}>
          <slot />
        </span>
      </Host>
    );
  }
}
