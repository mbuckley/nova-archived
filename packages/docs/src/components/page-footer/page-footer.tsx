import { Component, Prop, h } from "@stencil/core";
import { Page } from "../../definitions";

@Component({
  tag: "docs-page-footer",
  styleUrl: "page-footer.css",
})
export class DocsPageFooter {
  @Prop() page: Page;

  hostData() {
    return {
      role: "contentinfo",
    };
  }

  render() {
    const { page } = this;

    if (page == null) {
      return null;
    }

    const paggination =
      (page.previousText && page.previousUrl) || (page.nextText && page.nextUrl) ? <docs-pagination page={page} /> : "";

    return paggination;
  }
}
