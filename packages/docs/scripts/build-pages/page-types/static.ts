/* Credit for this script goes to Ionic team
 * This has been taken from the Ionic Documentation open-source project on GitHub
 * https://github.com/ionic-team/ionic-docs/blob/master/scripts/build-pages/page-types/static.ts
 */

import { PAGES_DIR, Page, buildPages } from "../index";

import frontMatter from "front-matter";
import fs from "fs-extra";
import glob from "fast-glob";
import markdownRenderer from "../markdown-renderer";

export default {
  title: "Build static pages",
  task: () => buildPages(getStaticPages),
};

async function getStaticPages(): Promise<Page[]> {
  const paths = await getMarkdownPaths(PAGES_DIR);

  return Promise.all(paths.map(toPage));
}

const getMarkdownPaths = (cwd: string): Promise<string[]> =>
  glob("**/*.md", {
    absolute: true,
    cwd,
  });

export const toPage = async (path: string) => {
  return {
    url: path.replace(PAGES_DIR, "").replace(/(\/index)?\.md$/i, ""),
    path: path.replace(PAGES_DIR, "/docs").replace(/(\/index)?\.md$/i, ""),
    ...renderMarkdown(await readMarkdown(path)),
  };
};

const renderMarkdown = (markdown: string) => {
  const { body, attributes } = frontMatter(markdown);
  return {
    ...attributes,
    body: markdownRenderer(body),
  };
};

const readMarkdown = (path: string): Promise<string> =>
  fs.readFile(path, {
    encoding: "utf8",
  });
