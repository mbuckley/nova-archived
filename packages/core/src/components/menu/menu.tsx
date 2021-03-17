import { Component, Element, Listen, h } from "@stencil/core";

@Component({
  tag: "clio-menu",
  styleUrl: "./menu.scss",
  shadow: true,
})
export class Menu {
  private allMenuItems: Array<HTMLElement>;
  private focusableMenuItems: Array<HTMLElement> = [];

  @Element() element: HTMLClioMenuElement;

  private handleKeyDown = (ev: KeyboardEvent) => {
    ev.preventDefault();

    const currentEl = (ev.target as HTMLElement).closest("clio-menu-item");
    const currentIndex = this.focusableMenuItems.indexOf(currentEl);

    if (ev.key === "Enter") {
      currentEl.click();
    } else {
      const elToFocus = this.determineListItemToFocus(ev, currentIndex);
      this.focusListItemElement(elToFocus);
    }
  };

  @Listen("clioPopoverVisibilityToggled", { target: "body" })
  public popoverVisibilityToggled(event: CustomEvent) {
    if (event.detail.active && event.detail.autofocus) {
      const elToFocus = this.findFirstFocusableMenuItem();
      this.focusListItemElement(elToFocus);
    }
  }

  @Listen("clioMenuItemHovered")
  public menuItemHovered(event: CustomEvent) {
    const elToFocus = event.target as HTMLElement;
    this.focusListItemElement(elToFocus);
  }

  private focusListItemElement(elToFocus: HTMLElement) {
    if (elToFocus) {
      const elHasLink = !!elToFocus.shadowRoot.querySelector("a");
      if (elHasLink) {
        elToFocus.shadowRoot.querySelector("a").focus();
      } else {
        elToFocus.shadowRoot.querySelector("li").focus();
      }
    }
  }

  private determineListItemToFocus(ev: KeyboardEvent, currentIndex: number) {
    let elToFocus: HTMLElement;

    if (ev.key === "ArrowDown" || ev.key === "Down") {
      elToFocus = this.findNextFocusableMenuItem(currentIndex);
    }
    if (ev.key === "ArrowUp" || ev.key === "Up") {
      elToFocus = this.findPreviousFocusableMenuItem(currentIndex);
    }
    if (ev.key === "Home") {
      elToFocus = this.findFirstFocusableMenuItem();
    }
    if (ev.key === "End") {
      elToFocus = this.findLastFocusableMenuItem();
    }
    if (this.isKeyALetter(ev.keyCode)) {
      elToFocus = this.findFocusableMenuItemWithLetter(ev.key, currentIndex);
    }

    return elToFocus;
  }

  private isKeyALetter(keycode: number) {
    return keycode > 64 && keycode < 91;
  }

  private findFirstFocusableMenuItem() {
    return this.focusableMenuItems[0];
  }

  private findLastFocusableMenuItem() {
    return this.focusableMenuItems[this.focusableMenuItems.length - 1];
  }

  private findNextFocusableMenuItem(currentIndex: number) {
    let nextFocusableMenuItem = this.focusableMenuItems[currentIndex + 1];
    if (!nextFocusableMenuItem) {
      nextFocusableMenuItem = this.findFirstFocusableMenuItem();
    }
    return nextFocusableMenuItem;
  }

  private findPreviousFocusableMenuItem(currentIndex: number) {
    let previousFocusableMenuItem = this.focusableMenuItems[currentIndex - 1];
    if (!previousFocusableMenuItem) {
      previousFocusableMenuItem = this.findLastFocusableMenuItem();
    }
    return previousFocusableMenuItem;
  }

  private findFocusableMenuItemWithLetter(key: string, currentIndex: number) {
    const currentLetter = key.toLowerCase();
    const focusableItemsWithMatchingLetter = this.focusableMenuItems.filter((menuItem: HTMLElement) => {
      return menuItem.innerText.charAt(0).toLowerCase() === currentLetter;
    });
    const nextFocusableItemsWithMatchingLetter = [...focusableItemsWithMatchingLetter].slice(currentIndex + 1);

    return nextFocusableItemsWithMatchingLetter.length > 0
      ? nextFocusableItemsWithMatchingLetter[0]
      : focusableItemsWithMatchingLetter[0];
  }

  private setFocusableMenuItems() {
    this.allMenuItems = Array.from(this.element.querySelectorAll("clio-menu-item"));

    if (this.allMenuItems.length) {
      this.focusableMenuItems = this.allMenuItems.filter((menuItem: HTMLElement) => {
        return !menuItem.getAttribute("disabled");
      });
    }
  }

  public componentDidLoad() {
    this.setFocusableMenuItems();
  }

  public render() {
    return (
      <ul role="menu" class="menu" onKeyDown={this.handleKeyDown}>
        <slot></slot>
      </ul>
    );
  }
}
