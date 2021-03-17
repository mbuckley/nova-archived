/* Credit for this script goes to Ionic team
 * This has been taken from the Ionic Documentation open-source project on GitHub
 * https://github.com/ionic-team/ionic-docs/blob/master/scripts/build-pages/index.ts
 */

import Static, { toPage as toStaticPage } from "./page-types/static";

import API from "./page-types/api";
import Listr from "listr";
import { convertHtmlToHypertextData } from "./html-to-hypertext-data";
import { createDocument } from "@stencil/core/mock-doc";
import fs from "fs-extra";
import { resolve } from "path";
import slugify from "slugify";

interface Page {
  title: string;
  path: string;
  url: string;
  body: string;
  skipIntros?: boolean;
  [key: string]: any;
}

// allPages is eventually written as a consolidated file called "search_index.json"
let allPages = [];

const PAGES_DIR = resolve(__dirname, "../../src/pages");

const tasks = new Listr();
tasks.add(Static);
tasks.add(API);
tasks.add({
  title: "Build Search Index",
  task: () => writePages("search_index", allPages),
});

if (!module.parent) {
  tasks.run().catch(err => {
    console.error(err);
    process.exit(1);
  });
}

async function buildPages(getter: () => Promise<Page[]>) {
  const pages = await getter();
  allPages = [...allPages, ...pages];

  return Promise.all(
    pages
      .map(patchBody)
      .map(updatePageHtmlToHypertext)
      .map(writePage),
  );
}

async function buildStaticPage(path: string) {
  const page = await toStaticPage(path);
  return writePage(updatePageHtmlToHypertext(patchBody(page)));
}

function patchBody(page: Page): Page {
  const body = createDocument(page.body).body;

  const h1 = body.querySelector("h1");
  if (h1) {
    page.title = page.title || h1.textContent.trim();
    h1.remove();
  }

  if (!page.skipIntros) {
    for (let i = 0, children = [...body.children]; i < children.length; i++) {
      if (children[i].tagName === "P") {
        children[i].classList.add("intro");
      } else {
        break;
      }
    }
  }

  const headings = [...body.querySelectorAll("h2")].map(heading => ({
    text: heading.textContent.trim(),
    href: `#${heading.getAttribute("id")}`,
  }));

  const pageClass = `page-${slugify(page.path.slice(6) || "index")}`;

  return {
    ...page,
    body: body.innerHTML,
    headings,
    pageClass,
  };
}

function updatePageHtmlToHypertext(page: Page) {
  page.body = convertHtmlToHypertextData(page.body);
  if (page.docs) {
    page.docs = convertHtmlToHypertextData(page.docs);
  }
  if (page.summary) {
    page.summary = convertHtmlToHypertextData(page.summary);
  }
  if (page.codeUsage) {
    page.codeUsage = convertHtmlToHypertextData(page.codeUsage);
  }
  if (page.usage) {
    const hypertextUsage = {};
    Object.keys(page.usage).forEach(key => {
      const usageContent = page.usage[key];
      hypertextUsage[key] = convertHtmlToHypertextData(usageContent);
    });
    page.usage = hypertextUsage;
  }
  return page;
}

function writePage(page: Page): Promise<any> {
  return fs.outputJson(toFilePath(page.path), page, {
    spaces: 2,
  });
}

function writePages(filename: string, pages: Page[]): Promise<any> {
  return fs.outputJson(toFilePath(`/docs/${filename}`), pages, {
    spaces: 2,
  });
}

const toFilePath = (urlPath: string) => `${resolve(PAGES_DIR, urlPath.slice(6) || "index")}.json`;

export { Page, PAGES_DIR, tasks, buildPages, buildStaticPage };
