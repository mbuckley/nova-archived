import { uuidWithPrefix } from "../utils/helpers";

export const linkLabelComponents = (
  inputElement: HTMLElement,
  clioLabelElement?: HTMLClioLabelElement,
  clioSubLabelElement?: HTMLClioLabelElement,
) => {
  if (clioLabelElement) {
    clioLabelElement.setAttribute("id", uuidWithPrefix("clio-label"));
    clioLabelElement.setAttribute("for", inputElement.id);
    inputElement.setAttribute("aria-labelledby", clioLabelElement.id);
  }

  if (clioSubLabelElement) {
    clioSubLabelElement.setAttribute("id", uuidWithPrefix("clio-sub-label"));
    inputElement.setAttribute("aria-describedby", clioSubLabelElement.id);
  }
};
