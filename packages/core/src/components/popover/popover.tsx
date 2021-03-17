import { Component, Element, Event, EventEmitter, Host, Prop, Watch, h } from "@stencil/core";
import { Components } from "../../components";
import { positionElement } from "../../utils/position-helpers";
import { debounce, uuidWithPrefix } from "../../utils/helpers";

/**
 * @slot content - Popover content goes inside of this slot.
 */
@Component({
  tag: "clio-popover",
  styleUrl: "./popover.scss",
  shadow: true,
})
export class Popover implements Components.ClioPopover {
  private readonly REPOSITION_DEBOUNCE = 50;
  private focusableElementsInPopover: NodeListOf<HTMLElement>;
  private activatorConnected: boolean = false;

  @Element() element: HTMLClioPopoverElement;

  /**
   * This determines whether the popover is visible or not.
   */
  @Prop({ mutable: true, reflect: true }) active?: boolean = false;

  /**
   * This is the element that should control the popover's active state and which the popover is position relative to. Ex. a `<clio-button>`
   */
  @Prop() activator!: HTMLElement;

  /**
   * This determines the horizontal alignment of the popover relative to its activator.
   */
  @Prop() alignX?: "left" | "middle" | "right" = "left";

  /**
   * This determines the vertical alignment of the popover relative to its activator.
   */
  @Prop() alignY?: "bottom" | "middle" | "top" = "top";

  /**
   * This determines how much padding is applied to the popover content container.
   */

  @Prop() padding?: "none" | "xs" | "s" | "m" | "l" | "xl" = "l";

  /**
   * This determines whether the popover should attempt to automatically find and focus on content. Defaults to `true`.
   */
  @Prop() autofocus?: boolean = true;

  /**
   * The role of the popover.
   */
  @Prop() role?: string = "dialog";

  /**
   * Emitted when the popover visisbility is toggled.
   */
  @Event() clioPopoverVisibilityToggled!: EventEmitter;

  @Watch("active")
  public watchHandler(isActive: boolean) {
    this.activator.setAttribute("aria-expanded", `${isActive}`);
  }

  private focusActivator() {
    const focusableActivatorElement = this.activator.shadowRoot
      ? (this.activator.shadowRoot.querySelectorAll("button, [href]")[0] as HTMLElement)
      : this.activator;

    focusableActivatorElement.focus();
  }

  private handleKeyDown = (ev: KeyboardEvent) => {
    if (ev.key === "Escape" || ev.key === "Esc") {
      this.active = false;
      this.focusActivator();
    } else if (ev.key === "Tab" && this.autofocus) {
      if (this.focusableElementsInPopover.length > 0) {
        this.handleTabKeyDown(ev);
      }
    }
  };

  private setA11yAttributes() {
    if (!this.element.id) {
      this.element.id = uuidWithPrefix("popover");
    }
    if (!this.activator.getAttribute("aria-haspopup")) {
      this.activator.setAttribute("aria-haspopup", "true");
    }
    if (!this.activator.getAttribute("aria-controls")) {
      this.activator.setAttribute("aria-controls", this.element.id);
    }
    if (!this.activator.getAttribute("aria-owns")) {
      this.activator.setAttribute("aria-owns", this.element.id);
    }
    if (!this.activator.getAttribute("aria-expanded")) {
      this.activator.setAttribute("aria-expanded", `${this.active}`);
    }
  }

  private setFocus() {
    if (this.active) {
      const firstFocusableElement = this.focusableElementsInPopover[0] as HTMLElement;
      if (firstFocusableElement) {
        firstFocusableElement.focus();
      }
    }
  }

  private handleTabKeyDown(ev: KeyboardEvent) {
    const firstFocusableElement = this.focusableElementsInPopover[0];
    const lastFocusableElement = this.focusableElementsInPopover[this.focusableElementsInPopover.length - 1];

    if (ev.shiftKey) {
      if (firstFocusableElement === document.activeElement) {
        ev.preventDefault();
        lastFocusableElement.focus();
      }
    } else {
      if (lastFocusableElement === document.activeElement) {
        ev.preventDefault();
        firstFocusableElement.focus();
      }
    }
  }

  private setFocusableElementsInPopover() {
    this.focusableElementsInPopover = this.element.querySelectorAll(
      "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])",
    );
  }

  private updateEventListeners() {
    if (this.active) {
      document.addEventListener("mousedown", this.handleMouseEvent);
      document.addEventListener("scroll", this.handleMouseEvent, true);
      window.addEventListener("resize", this.reposition);
    } else {
      document.removeEventListener("mousedown", this.handleMouseEvent);
      document.removeEventListener("scroll", this.handleMouseEvent, true);
      window.removeEventListener("resize", this.reposition);
    }
  }

  private reposition = debounce(() => {
    positionElement(this.element, this.activator, this.alignX, this.alignY);
  }, this.REPOSITION_DEBOUNCE);

  private handleMouseEvent = (ev: MouseEvent) => {
    const targetEl = ev.target as HTMLElement;

    if (
      this.targetIsNotInPopover(targetEl) &&
      this.targetIsNotInNestedSlots(targetEl) &&
      this.targetDoesNotMatchActivator(targetEl) &&
      this.activatorIsNotInEventComposedPath(ev)
    ) {
      this.active = false;
    }
  };

  private targetIsNotInPopover(targetEl: HTMLElement) {
    return this.element !== targetEl && !this.element.contains(targetEl);
  }

  private targetDoesNotMatchActivator(targetEl: HTMLElement) {
    return targetEl !== this.activator && !this.activator.contains(targetEl);
  }

  /* Events that happen in shadow DOM have the host element as the target, when caught outside of the component. For e.g. when popover is opened from combo-button, the activator element is one of the buttons inside combo-button, but for MouseEvent the target is sent out as `clio-combo-button`.
   * In this case we use `event.composedPath` to track if activator existed in the path travelled by event to determine if visibility of popover should be toggled.
   * Ref: https://javascript.info/shadow-dom-events
   */
  private activatorIsNotInEventComposedPath(ev: MouseEvent) {
    let activatorExistInComposedPathForEvent = false;
    if (ev.composedPath) {
      activatorExistInComposedPathForEvent = ev.composedPath().some(el => el === this.activator);
    }

    return !activatorExistInComposedPathForEvent;
  }

  private targetIsNotInNestedSlots(targetEl: HTMLElement) {
    let isNotInSlot = true;
    const popoverSlots = this.element.shadowRoot.querySelectorAll("slot");
    popoverSlots.forEach(slot => {
      // fetch all elements assigned to current and nested slots
      // Ref: https://developer.mozilla.org/en-US/docs/Web/API/HTMLSlotElement/assignedElements
      const elementsAssignedToSlot = slot.assignedElements({ flatten: true });

      isNotInSlot = elementsAssignedToSlot.some(ele => !ele.contains(targetEl));
    });
    return isNotInSlot;
  }

  public componentWillLoad() {
    this.setFocusableElementsInPopover();
  }

  public componentDidUpdate() {
    if (!this.activatorConnected && this.activator) {
      this.activatorConnected = true;
    }
    this.clioPopoverVisibilityToggled.emit({ active: this.active, autofocus: this.autofocus });
  }

  public componentDidRender() {
    if (this.activator) {
      this.setA11yAttributes();
      positionElement(this.element, this.activator, this.alignX, this.alignY);
    }

    if (this.autofocus) {
      this.setFocus();
    }

    this.updateEventListeners();
  }

  private createPaddingClass() {
    return this.padding
      ? {
          [`popover--padding-${this.padding}`]: true,
        }
      : undefined;
  }

  private getInlineStyle() {
    if (!!this.activator) {
      return { minWidth: `${this.activator.clientWidth}px` };
    }
  }

  public render() {
    return (
      <Host>
        <div
          aria-modal="true"
          class={{
            "popover__content-container": true,
            ...this.createPaddingClass(),
          }}
          onKeyDown={this.handleKeyDown}
          role={this.role}
          style={this.getInlineStyle()}
        >
          <slot name="content" />
        </div>
      </Host>
    );
  }
}
