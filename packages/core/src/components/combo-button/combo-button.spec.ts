import { ComboButton } from "./combo-button";
import { newSpecPage } from "@stencil/core/testing";

describe("combo-button", () => {
  describe("render", () => {
    it("renders with default props if none specified", async () => {
      const page = await newSpecPage({
        components: [ComboButton],
        html: `<clio-combo-button></clio-combo-button>`,
        supportsShadowDom: false,
      });
      expect(page.root).toEqualHtml(`
        <clio-combo-button>
          <clio-button button-style="secondary" class="combo-button--primary" size="default"></clio-button>
          <clio-button aria-label="More options" button-style="secondary" class="combo-button--secondary" size="default">
          <clio-icon color="#263238" aria-hidden="true" name="caret-down" class="icon--container__auto"></clio-icon>
          </clio-button>
          <clio-popover align-x="right" align-y="bottom" padding="none" autofocus></clio-popover>
        </clio-combo-button>
      `);
    });

    it("renders small combo button when size specified as small", async () => {
      const page = await newSpecPage({
        components: [ComboButton],
        html: `<clio-combo-button size="small"></clio-combo-button>`,
        supportsShadowDom: false,
      });
      expect(page.root).toEqualHtml(`
        <clio-combo-button size="small">
          <clio-button button-style="secondary" class="combo-button--primary" size="small"></clio-button>
          <clio-button aria-label="More options" button-style="secondary" class="combo-button--secondary" size="small">
          <clio-icon color="#263238" aria-hidden="true" name="caret-down" class="icon--container__auto"></clio-icon>
          </clio-button>
          <clio-popover align-x="right" align-y="bottom" padding="none" autofocus></clio-popover>
        </clio-combo-button>
      `);
    });

    it("renders combo button with danger button when buttonStyle is specified as danger", async () => {
      const page = await newSpecPage({
        components: [ComboButton],
        html: `<clio-combo-button button-style="danger"></clio-combo-button>`,
        supportsShadowDom: false,
      });
      expect(page.root).toEqualHtml(`
        <clio-combo-button button-style="danger">
          <clio-button button-style="danger" class="combo-button--primary" size="default"></clio-button>
          <clio-button aria-label="More options" button-style="danger" class="combo-button--secondary" size="default">
          <clio-icon color="#ffffff" aria-hidden="true" name="caret-down" class="icon--container__auto"></clio-icon>
          </clio-button>
          <clio-popover align-x="right" align-y="bottom" padding="none" autofocus></clio-popover>
        </clio-combo-button>
      `);
    });
  });
});
