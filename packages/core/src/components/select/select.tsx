import { Component, Event, EventEmitter, Host, Listen, Method, Prop, State, Watch, h } from "@stencil/core";
import { uuidWithPrefix } from "../../utils/helpers";

const NAVIGATION_KEYS = ["ArrowDown", "Down", "ArrowUp", "Up", "Home", "End"];
@Component({
  tag: "clio-select",
  styleUrl: "./select.scss",
})
export class Select {
  private clioInputElement: HTMLClioInputElement;
  private clioInputChildInput: HTMLInputElement;
  private clioPopoverElement: HTMLClioPopoverElement;
  private caretIconElement: HTMLElement;
  private readonly listboxId = uuidWithPrefix("listbox");
  private unfilteredItems: { label: string; value: number | string }[];
  private listItemIdPrefix = uuidWithPrefix("item");
  private labelId: string;

  @State() focusedItemIndex: number = 0;
  @State() inputValue: string;
  @State() isExpanded: boolean = false;

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
   * Sets whether this element will receive focus when it is rendered.
   */
  @Prop() autofocus: boolean = false;

  /**
   * The items that will be displayed as `<clio-menu-item>`s within a `<clio-popover>`.
   */
  @Prop({ mutable: true }) items: Array<{ label: string; value: number | string }>;

  /**
   * The label for the input.
   */
  @Prop() label?: string;

  /**
   * If true, a loading spinner is displayed within the text input.
   */
  @Prop() loading: boolean = false;

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string;

  /**
   * If true, this field is required.
   */
  @Prop() required?: boolean = false;

  /**
   * The sub-label for the input.
   */
  @Prop() subLabel?: string;

  /**
   * The value of the item that is currently selected. This can be used to set an initial value as well.
   */
  @Prop({ mutable: true }) value?: number | string;

  /**
   * Emitted when the selected value changes.
   */
  @Event() clioItemSelected: EventEmitter<{ label: string; value: number | string }>;

  /**
   * Emitted when `clio-input` value changes.
   */
  @Event() clioInput: EventEmitter<{ value: string }>;

  /**
   * Returns the validity state of the select.
   * @returns {Promise<boolean>}
   */
  @Method()
  public async isValid(): Promise<boolean> {
    return this.clioInputElement.isValid();
  }

  /**
   * Forces the select to validate. It calls the Input's validate() method.
   * @returns {Promise<void>}
   */
  @Method()
  public async validate(): Promise<void> {
    this.clioInputElement.validate();
  }

  /**
   * Returns the dirty state of the select.
   * @returns {Promise<boolean>}
   */
  @Method()
  public async isDirty(): Promise<boolean> {
    return this.clioInputElement.isDirty();
  }

  /**
   * Manually sets the dirty state of the select.
   */
  @Method()
  public async setDirty(dirty: boolean) {
    this.clioInputElement.setDirty(dirty);
  }

  /**
   * Sets focus on the input element.
   */
  @Method()
  public async setFocus() {
    if (this.clioInputElement) {
      this.clioInputElement.setFocus();
    }
  }

  @Listen("clioPopoverVisibilityToggled")
  public keepIsExpandedInSyncWithPopoverActiveState({ detail: { active } }) {
    // The isExpanded value and popover active value can get out of sync
    // when then popover is closed by an action outside of the Select.
    // Ex. A user performs a mouseclick outside of the popover, which sets its 'active' prop to false.
    if (this.isExpanded !== active) {
      this.isExpanded = active;
      if (!this.isExpanded) {
        this.updateActivedescendant("");
      }
    }
  }

  @Watch("value")
  public updateClioInput() {
    this.setInputValue();
  }

  private setClioInputValidation() {
    if (this.required) {
      const requiredValidator = () => {
        return {
          validate: () => {
            return this.value ? !!this.findItemByValue(this.value) : false;
          },
          errorMessage: "This field is required.",
        };
      };

      this.clioInputElement.validationRules = [{ validator: requiredValidator }];
    }
  }

  private updateActivedescendant(activeDescendantId: string) {
    this.clioInputChildInput.setAttribute("aria-activedescendant", activeDescendantId);
  }

  private openFullMenu() {
    this.items = this.unfilteredItems;
    this.isExpanded = true;
    this.focusFirstMenuItem();
    this.updateActivedescendant(`${this.listItemIdPrefix}-${this.focusedItemIndex}`);
  }

  private toggleMenu() {
    this.isExpanded = !this.isExpanded;
    if (this.isExpanded) {
      this.focusFirstMenuItem();
      this.updateActivedescendant(`${this.listItemIdPrefix}-${this.focusedItemIndex}`);
    } else {
      this.updateActivedescendant("");
    }
  }

  private resetSelect() {
    const emptyValue = "";
    this.toggleMenu();
    this.inputValue = emptyValue;
    this.value = emptyValue;
    this.clioInput.emit({ value: emptyValue });
  }

  private selectTextAndOpenMenu() {
    this.clioInputChildInput.select();
    this.openFullMenu();
  }

  private handleInputClick = (e: MouseEvent) => {
    if (
      !!this.caretIconElement &&
      (e.target === this.caretIconElement || this.caretIconElement.contains(e.target as HTMLElement))
    ) {
      this.isExpanded = !this.isExpanded;
      this.clioInputElement.setFocus();
    } else {
      this.selectTextAndOpenMenu();
    }
  };

  private handleKeyDown = (ev: KeyboardEvent) => {
    if (this.isExpanded) {
      if (ev.key === "Enter" && this.items.length > 0) {
        this.updateInputValue(this.items[this.focusedItemIndex].label, this.items[this.focusedItemIndex].value);
      } else if (NAVIGATION_KEYS.indexOf(ev.key) !== -1) {
        this.updateMenuItemFocus(ev);
      } else if (ev.key === "Escape" || ev.key === "Esc") {
        ev.preventDefault();
        this.resetSelect();
      }
    } else if ((ev.key === "ArrowDown" || ev.key === "Down") && this.items !== undefined) {
      this.openFullMenu();
    }
  };

  private focusFirstMenuItem() {
    this.focusedItemIndex = 0;
  }

  private focusLastMenuItem() {
    this.focusedItemIndex = this.items.length - 1;
  }

  private focusNextMenuItem() {
    this.focusedItemIndex = this.focusedItemIndex + 1;
    const nextFocusableMenuItem = this.items[this.focusedItemIndex];

    if (!nextFocusableMenuItem) {
      this.focusFirstMenuItem();
    }
  }

  private focusPreviousMenuItem() {
    this.focusedItemIndex = this.focusedItemIndex - 1;
    const previousFocusableMenuItem = this.items[this.focusedItemIndex];

    if (!previousFocusableMenuItem) {
      this.focusLastMenuItem();
    }
  }

  private updateMenuItemFocus(ev: KeyboardEvent) {
    ev.preventDefault();
    if (!!this.items) {
      if (ev.key === "ArrowDown" || ev.key === "Down") {
        this.focusNextMenuItem();
      } else if (ev.key === "ArrowUp" || ev.key === "Up") {
        this.focusPreviousMenuItem();
      } else if (ev.key === "Home") {
        this.focusFirstMenuItem();
      } else if (ev.key === "End") {
        this.focusLastMenuItem();
      }
      this.updateActivedescendant(`${this.listItemIdPrefix}-${this.focusedItemIndex}`);
    }
  }

  private inputChanged = (event: Event) => {
    this.inputValue = (event.target as HTMLClioInputElement).value;

    this.clioInput.emit({ value: this.inputValue });

    if (!!this.inputValue) {
      this.focusFirstMenuItem();
      this.updateActivedescendant(`${this.listItemIdPrefix}-${this.focusedItemIndex}`);
      this.isExpanded = true;
    } else {
      this.isExpanded = false;
      this.updateActivedescendant("");
    }
  };

  private updateInputValue(itemLabel: string, itemValue: number | string) {
    this.toggleMenu();
    this.inputValue = itemLabel;
    this.clioItemSelected.emit({ label: itemLabel, value: itemValue });
    this.value = itemValue;
    this.clioInputChildInput.focus();
    this.clioInputElement.validate();
  }

  private generateOnListItemClickHandler = (item: { label: string; value: string | number }) => {
    return () => this.updateInputValue(item.label, item.value);
  };

  private handleMouseEnter = (ev: MouseEvent) => {
    const el = ev.target as HTMLLIElement;
    this.focusedItemIndex = this.items.findIndex(item => item.label === el.textContent);
  };

  private renderList = () => {
    if (!this.items) {
      return null;
    } else {
      return (
        <ul
          id={this.listboxId}
          class="select__popover__list"
          slot="content"
          role="listbox"
          aria-labelledby={!!this.labelId ? this.labelId : null}
        >
          {this.items.length === 0 ? (
            <li class="select__popover__item--disabled">No Matches</li>
          ) : (
            this.items.map((item, index) => (
              <li
                aria-selected={this.focusedItemIndex === index ? "true" : null}
                class="select__popover__item"
                id={`${this.listItemIdPrefix}-${index}`}
                onClick={this.generateOnListItemClickHandler(item)}
                role="option"
                onMouseEnter={this.handleMouseEnter}
              >
                {item.label}
              </li>
            ))
          )}
        </ul>
      );
    }
  };

  // If the items are being set for the first time, save a copy to an
  // internal list called `unfilteredItems`. This is because we need to
  // always have a copy of that original list post filtering.
  private saveUnfilteredItems() {
    if (!this.unfilteredItems && !!this.items) {
      this.unfilteredItems = [...this.items];
    }
  }

  private findItemByValue(value: number | string) {
    if (value) {
      let index = 0;

      this.items.some(item => {
        index++;
        return item.value === value;
      });

      index = index > 0 ? index - 1 : 0;

      return this.items[index];
    }
  }

  private setInputValue() {
    if (!!this.value && !!this.items && this.items.length > 0) {
      const item = this.findItemByValue(this.value);

      this.inputValue = item.label;
    }
  }

  public componentWillLoad() {
    this.saveUnfilteredItems();
    this.setInputValue();
  }

  public componentDidUpdate() {
    if (!this.loading && !this.caretIconElement) {
      this.setCaretElement();
    }
  }

  private setInitialAriaAttributes() {
    const listboxElement = this.clioPopoverElement.querySelector(`#${this.listboxId}`);

    this.labelId = this.clioInputChildInput.getAttribute("aria-labelledby");
    if (!!this.labelId && listboxElement) {
      listboxElement.setAttribute("aria-labelledby", this.labelId);
    }

    this.clioInputChildInput.setAttribute("aria-autocomplete", "list");
    this.clioInputChildInput.setAttribute("aria-controls", this.listboxId);
  }

  private async setCaretElement() {
    this.caretIconElement = await this.clioInputElement.getIconElement();
  }

  private handleClioInputBlur = () => {
    const validSelection = this.value ? this.findItemByValue(this.value) : undefined;

    if (!validSelection) {
      this.value = undefined;
      this.clioInputElement.value = "";
    }
  };

  public componentDidLoad() {
    this.clioPopoverElement.activator = this.clioInputElement;
    this.clioInputChildInput = this.clioInputElement.querySelector("input");
    this.setCaretElement();
    this.setInitialAriaAttributes();
    this.setClioInputValidation();
    this.clioInputElement.addEventListener("clioBlur", this.handleClioInputBlur);
  }

  public render() {
    return (
      <Host>
        <div
          aria-expanded={`${this.isExpanded}`}
          aria-haspopup="listbox"
          aria-owns={this.listboxId}
          class="select"
          onKeyDown={this.handleKeyDown}
          role="combobox"
        >
          <clio-input
            aria-describedby={this.ariaDescribedby}
            aria-label={this.ariaLabel}
            aria-labelledby={this.ariaLabelledby}
            autocomplete={"disabled-autocomplete" as any} // TODO: Fix this once the clio-input allows for values beyond "on" and "off" in order to suppress default browser behavior completely. For more context see: https://themis.atlassian.net/browse/FEI-50
            autofocus={this.autofocus}
            icon={this.loading ? undefined : "caret-down"}
            label={this.label}
            loading={this.loading}
            name=""
            onClick={this.handleInputClick}
            onInput={this.inputChanged}
            ref={el => (this.clioInputElement = el)}
            required={this.required}
            sub-label={this.subLabel}
            value={this.inputValue}
          />

          <input type="hidden" name={this.name} value={this.value} />

          <clio-popover
            activator={this.clioInputElement}
            active={this.isExpanded}
            align-x="left"
            align-y="bottom"
            autofocus={false}
            class="select__popover"
            padding="none"
            ref={el => (this.clioPopoverElement = el as HTMLClioPopoverElement)}
          >
            {this.renderList()}
          </clio-popover>
        </div>
      </Host>
    );
  }
}
