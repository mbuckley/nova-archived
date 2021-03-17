import { E2EPage, newE2EPage, E2EElement } from "@stencil/core/testing";

describe("clio-popover", () => {
  let page: E2EPage;

  describe("popover visibility", () => {
    let popoverActivatorScript: string;
    let popoverTemplate: string;
    let activator: E2EElement;
    let popover: E2EElement;

    beforeEach(async () => {
      page = await newE2EPage();
      popoverActivatorScript = `
        <!-- Popover js for initializing components -->
        <script type="text/javascript">
          const handleActivatorClick = popoverId => {
            const popover = document.getElementById(popoverId);
            popover.active = !popover.active;
          };
          const initializePopover = () => {
            const popover = document.getElementById("popover");
            const popoverActivator = document.getElementById("popover-activator");

            window.onload = () => {
              popover.activator = popoverActivator;
            };
          };
          initializePopover();
        </script>`;

      popoverTemplate = `
        <div>
          <p id="popover-activator" onclick="handleActivatorClick('popover')">Hello</p>
          <clio-popover id="popover">
            <div slot="content">
              <p>Vel</p>
            </div>
          </clio-popover>
        </div>
        ${popoverActivatorScript}
      `;

      await page.setContent(popoverTemplate);

      activator = await page.find("#popover-activator");
      popover = await page.find("#popover");
    });

    it("emits event when active", async () => {
      const clioPopoverVisibilityToggled = await page.spyOnEvent("clioPopoverVisibilityToggled");
      await page.$eval("clio-popover", (popover: HTMLClioPopoverElement) => {
        popover.active = true;
      });
      await page.waitForChanges();

      expect(clioPopoverVisibilityToggled).toHaveReceivedEvent();
    });

    it("sets the min-width of the popover to match the width of its activator", async () => {
      const contentContainer = await page.find("clio-popover >>> .popover__content-container");
      expect((await contentContainer.getComputedStyle()).minWidth).toEqual((await activator.getComputedStyle()).width);
    });

    describe("when clicked on activator element", () => {
      it("toggles the visibility of the popover", async () => {
        // The initial, default state of "active" on the popover is false, so it should not be visible.
        expect(await popover.isVisible()).toBe(false);

        await activator.click();

        expect(await popover.isVisible()).toBe(true);

        await activator.click();

        expect(await popover.isVisible()).toBe(false);
      });
    });

    describe("when the popover has focusable elements as its contents", () => {
      beforeEach(async () => {
        popoverTemplate = `
            <div>
              <clio-button id="popover-activator" onclick="handleActivatorClick('popover')">
                Activate Popover
              </clio-button>
              <clio-popover id="popover">
                <div slot="content">
                  <input />
                </div>
              </clio-popover>
            </div>
            ${popoverActivatorScript}
          `;
        page = await newE2EPage();
        await page.setContent(popoverTemplate);
        popover = await page.find("#popover");
      });

      describe("when the popover is active and the 'Escape' key is pressed", () => {
        beforeEach(async () => {
          await page.$eval("clio-popover", (popover: HTMLClioPopoverElement) => {
            popover.active = true;
          });
        });

        it("hides the visibility of the popover and focuses the popover activator element", async () => {
          expect(await popover.isVisible()).toBe(true);
          await popover.press("Escape");
          await page.waitForChanges();
          expect(await popover.isVisible()).toBe(false);
        });
      });
    });

    describe("when clicked on element outside of popover", () => {
      it("closes the popover", async () => {
        await activator.click();
        await page.click("body");

        expect(await popover.isVisible()).toBe(false);
      });
    });

    describe("when clicked on an element inside the popover", () => {
      describe("and target element is direct child of popover", () => {
        it("does not close the popover", async () => {
          await activator.click();
          await popover.click();

          expect(await popover.isVisible()).toBe(true);
        });
      });

      describe("and target element is a child of nested slots within popover", () => {
        it("does not close the popover", async () => {
          popoverTemplate = `
            <div>
              <clio-button id="popover-activator" onclick="handleActivatorClick('popover')">
                Activate Popover
              </clio-button>
              <clio-popover id="popover">
                <div slot="content">
                  <slot><div id="nested-child">Nested child</div></slot>
                </div>
              </clio-popover>
            </div>
            ${popoverActivatorScript}
          `;
          page = await newE2EPage();
          await page.setContent(popoverTemplate);

          const popover = await page.find("#popover");

          await page.$eval("clio-popover", (popover: HTMLClioPopoverElement) => {
            popover.active = true;
          });
          await page.waitForChanges();

          const targetElement = await page.evaluateHandle(`document.querySelector("#nested-child")`);

          await targetElement.asElement().click();

          expect(await popover.isVisible()).toBe(true);
        });
      });
    });
  });
});
