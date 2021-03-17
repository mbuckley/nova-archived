import { newE2EPage, E2EPage, E2EElement } from "@stencil/core/testing";

const template = `
  <div class="popover-examples-container">
    <div>
      <clio-button id="popover-activator" onclick="handlePopoverTriggerClick('popover')">
        Trigger Popover
      </clio-button>
      <clio-popover id="popover" active="false">
        <div slot="content">
          <input class="input-1"/>
          <input class="input-2"/>
          <input class="input-3"/>
        </div>
      </clio-popover>

      <clio-input
        id="popover2-activator"
        onclick="handlePopoverTriggerClick('popover2')"
        aria-autocomplete="list"
        aria-controls="listbox-uuid"
        aria-haspopup="listbox"
      />
      <clio-popover class="popover2" active="false" role="listbox">
        <ul id="listbox-uuid" slot="content">
          <li>Item</li>
          <li>Item 2</li>
        </ul>
      </clio-popover>
    </div>
    <!-- Popover js for initializing components -->
    <script type="text/javascript">
      const handlePopoverTriggerClick = popoverId => {
        const popover = document.getElementById(popoverId);
        popover.active = !popover.active;
      };
      const initializePopover = () => {
        const popover = document.getElementById("popover");
        const popover2 = document.querySelector(".popover2");
        const popoverActivator = document.getElementById("popover-activator");
        const popover2Activator = document.getElementById("popover2-activator");

        window.onload = () => {
          popover.activator = popoverActivator;
          popover2.activator = popover2Activator;
        };
      };
      initializePopover();
    </script>
  </div>
`;

describe("Popover A11y", () => {
  let page: E2EPage;
  let activatorEl: E2EElement;
  let buttonEl: E2EElement;
  let popoverEl: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage();
    await page.setContent(template);

    activatorEl = await page.find("#popover-activator");
    buttonEl = await page.find("#popover-activator >>> button");
    popoverEl = await page.find("#popover");
  });

  describe("Popover Element", () => {
    describe("roles and attributes", () => {
      let contentContainer: E2EElement;

      it("has the correct role and attributes", async () => {
        contentContainer = await page.find("#popover >>> .popover__content-container");
        expect(contentContainer.getAttribute("role")).toEqual("dialog");
        expect(contentContainer.getAttribute("aria-modal")).toEqual("true");
      });

      it("allows a custom role to be set", async () => {
        contentContainer = await page.find(".popover2 >>> .popover__content-container");
        expect(contentContainer.getAttribute("role")).toEqual("listbox");
      });
    });
  });

  describe("Activator Element", () => {
    describe("roles and attributes", () => {
      it("has the correct attributes if none are provided", async () => {
        expect(activatorEl.getAttribute("aria-haspopup")).toEqual("true");
        expect(activatorEl.getAttribute("aria-controls")).toEqual(popoverEl.id);
        expect(activatorEl.getAttribute("aria-owns")).toEqual(popoverEl.id);
        expect(activatorEl.getAttribute("aria-expanded")).toEqual("false");

        activatorEl.click();
        await page.waitForChanges();

        expect(activatorEl.getAttribute("aria-expanded")).toEqual("true");
      });

      it("does not overwrite attributes that have already been seet", async () => {
        activatorEl = await page.find("#popover2-activator");
        popoverEl = await page.find(".popover2");

        expect(activatorEl.getAttribute("aria-haspopup")).toEqual("listbox");
        expect(activatorEl.getAttribute("aria-controls")).toEqual("listbox-uuid");
        expect(activatorEl.getAttribute("aria-owns")).toEqual(popoverEl.id);
        expect(activatorEl.getAttribute("aria-autocomplete")).toEqual("list");
        expect(activatorEl.getAttribute("aria-expanded")).toEqual("false");
      });
    });
  });

  describe("Keyboard Interactions", () => {
    describe("when the 'Enter' key is pressed on the activator", () => {
      it("toggles the popover's visibility", async () => {
        await buttonEl.press("Enter");
        await page.waitForChanges();

        expect(await popoverEl.isVisible()).toBe(true);

        await buttonEl.press("Enter");
        await page.waitForChanges();

        expect(await popoverEl.isVisible()).toBe(false);
      });
    });

    describe("when the 'Space' key is pressed on the activator", () => {
      it("toggles the popover's visibility", async () => {
        await buttonEl.press("Space");
        await page.waitForChanges();

        expect(await popoverEl.isVisible()).toBe(true);

        await buttonEl.press("Space");
        await page.waitForChanges();

        expect(await popoverEl.isVisible()).toBe(false);
      });
    });

    describe("when the 'Esc' key is pressed on the popover", () => {
      it("closes the popover", async () => {
        await popoverEl.press("Escape");
        await page.waitForChanges();

        expect(await popoverEl.isVisible()).toBe(false);
      });
    });

    describe("when the 'Tab' key is pressed", () => {
      describe("on the first focusable element", () => {
        it("shifts focus to the next focusable element", async () => {
          await page.$eval("clio-popover", (popover: HTMLClioPopoverElement) => {
            popover.active = true;
          });
          await page.waitForChanges();

          const firstInput = await page.find(".input-1");
          await firstInput.press("Tab");

          const focusedEl = await page.find(":focus");
          expect(focusedEl).toHaveClass("input-2");
        });
      });

      describe("on the last focusable element", () => {
        it("shifts focus to the first focusable element", async () => {
          await page.$eval("clio-popover", (popover: HTMLClioPopoverElement) => {
            popover.active = true;
          });
          await page.waitForChanges();

          const lastInput = await page.find(".input-3");
          await lastInput.press("Tab");

          const focusedEl = await page.find(":focus");
          expect(focusedEl).toHaveClass("input-1");
        });
      });
    });

    describe("while the 'Shift' key is held and the 'Tab' key is pressed", () => {
      describe("on the first focusable element", () => {
        it("shifts focus to the last focusable element", async () => {
          await page.$eval("clio-popover", (popover: HTMLClioPopoverElement) => {
            popover.active = true;
          });
          await page.waitForChanges();

          const firstInput = await page.find(".input-1");
          await page.keyboard.down("Shift");
          await firstInput.press("Tab");

          const focusedEl = await page.find(":focus");
          expect(focusedEl).toHaveClass("input-3");
        });
      });

      describe("on the last focusable element", () => {
        it("shifts focus to the previous focusable element", async () => {
          await page.$eval("clio-popover", (popover: HTMLClioPopoverElement) => {
            popover.active = true;
          });
          await page.waitForChanges();

          const lastInput = await page.find(".input-3");
          await page.keyboard.down("Shift");
          await lastInput.press("Tab");

          const focusedEl = await page.find(":focus");
          expect(focusedEl).toHaveClass("input-2");
        });
      });
    });

    describe("Focus States", () => {
      describe("when popover is opened", () => {
        it("shifts the focus to the first focusable element", async () => {
          await buttonEl.press("Enter");
          await page.waitForChanges();

          const focusedEl = await page.find(":focus");
          expect(focusedEl).toHaveClass("input-1");
        });
      });

      describe("when popover is closed", () => {
        it("shifts the focus back to the activator element", async () => {
          await buttonEl.press("Enter");
          await page.waitForChanges();

          const firstInput = await page.find(".input-1");
          await firstInput.press("Escape");
          await page.waitForChanges();

          const focusedButtonEl = await page.find("clio-button >>> :focus");
          await expect(focusedButtonEl).toBeDefined();
        });
      });
    });
  });
});
