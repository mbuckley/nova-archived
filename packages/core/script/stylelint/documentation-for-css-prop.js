const stylelint = require("stylelint");

const ruleName = "plugin/no-documentation-for-css-prop";
const messages = stylelint.utils.ruleMessages(ruleName, {
  expected: function(value) {
    return "Documentation missing for custom property: " + value;
  },
});

/* Read through all the comments from the file,
 * filter those starting with @prop indicating documentation for custom property.
 */
function findDocumentedProperties(root) {
  let comments = "";
  root.walkComments(function(comm) {
    if (comm.text.indexOf("@prop") !== -1) {
      comments = comments.concat(comm.text);
    }
  });
  return comments;
}

/* A file can define new custom props as well as modify the custom props for child elements
 * We use convention of name starting with --[<component-name>/<file-name] to validate
 * if the declaration defines a new custom property.
 */
function isValidCustomPropForComponent(path, prop) {
  const filePathArray = path.split("/");
  const fileNameWithoutExtn = filePathArray[filePathArray.length - 1].split(".");

  return prop.startsWith(`--${fileNameWithoutExtn[0]}`);
}

module.exports = stylelint.createPlugin(ruleName, function(enabled) {
  if (!enabled) {
    return;
  }
  return function(postcssRoot, postcssResult) {
    const sourceFilePath = postcssResult.root.source.input.file;

    // Find documented properties by reading comments in the file
    const propertiesDescComments = findDocumentedProperties(postcssRoot);

    /* Walk through each declaration and for custom properties declaration,
     * check if related documentation exists
     */
    postcssRoot.walkDecls(function(decl) {
      if (isValidCustomPropForComponent(sourceFilePath, decl.prop)) {
        if (!(propertiesDescComments.indexOf(decl.prop) !== -1)) {
          stylelint.utils.report({
            result: postcssResult,
            ruleName,
            message: messages.expected(decl.prop),
            node: decl,
            word: decl.value,
          });
        }
      }
    });
  };
});

module.exports.ruleName = ruleName;
module.exports.messages = messages;
