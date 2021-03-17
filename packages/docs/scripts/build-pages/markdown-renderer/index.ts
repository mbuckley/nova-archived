/* Credit for this and other scripts in the folder goes to Ionic team
 * This has been taken from the Ionic Documentation open-source project on GitHub
 * https://github.com/ionic-team/ionic-docs/tree/master/scripts/build-pages/markdown-renderer
 */

import code from "./code";
import heading from "./heading";
import link from "./link";
import marked from "marked";

const renderer = new marked.Renderer();
renderer.heading = heading;
renderer.code = code;
renderer.link = link;

export default (markdown: string, baseUrl?: string) => {
  return marked(markdown, { baseUrl, renderer });
};
