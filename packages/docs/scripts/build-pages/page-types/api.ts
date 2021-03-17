/* Credit for this script goes to Ionic team
 * This has been taken from the Ionic Documentation open-source project on GitHub
 * https://github.com/ionic-team/ionic-docs/blob/master/scripts/build-pages/page-types/api.ts
 */

import { Page, buildPages } from "../index";
import { join, resolve } from "path";

import { components } from "@clio/nova-core/dist/docs/core.json";
import fs from "fs-extra";
import markdownRenderer from "../markdown-renderer";

export default {
  title: "Build API pages",
  task: () => buildPages(getAPIPages),
};

async function getAPIPages(): Promise<Page[]> {
  const pages = components.map(async component => {
    const title = component.tag;
    const path = `/docs/api/${title}`;
    const url = `/api/${title}`;
    const demoUrl = await getDemoUrl(component);
    const { readme, usage, props, methods, ...contents } = component;

    return {
      title,
      path,
      url,
      ...demoUrl,
      body: markdownRenderer(readme, path),
      usage: renderUsage(usage, path),
      props: renderDocsKey(props, path),
      methods: renderDocsKey(methods, path),
      template: "api",
      ...contents,
    };
  });
  return Promise.all(pages);
}

const renderUsage = (usage, baseUrl) =>
  Object.keys(usage).reduce((out, key) => {
    out[key] = markdownRenderer(usage[key], baseUrl);
    return out;
  }, {});

const renderDocsKey = (items, baseUrl) =>
  items.map(item => ({
    ...item,
    docs: markdownRenderer(item.docs, baseUrl),
  }));

const DEMOS_PATH = resolve(__dirname, "../../../src/demos");

const getDemoUrl = async component => {
  const demoPath = `api/${component.tag}/index.html`;
  const hasDemo = await fs.pathExists(join(DEMOS_PATH, demoPath));
  if (hasDemo) {
    return {
      demoUrl: `/demos/${demoPath}`,
      demoSourceUrl: `https://github.com/clio/design_system/tree/master/packages/docs/src/demos/${demoPath}`,
    };
  }
};
