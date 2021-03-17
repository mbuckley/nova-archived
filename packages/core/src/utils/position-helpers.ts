export const positionElement = (
  contentEl: HTMLElement,
  targetEl: HTMLElement,
  alignX: string,
  alignY: string,
): void => {
  const contentRect = contentEl.getBoundingClientRect();
  const contentWidth = contentRect.width;
  const contentHeight = contentRect.height;

  const targetRect = targetEl.getBoundingClientRect();
  let targetTop;
  let targetLeft;

  if (alignY === "top") {
    targetTop = targetRect.bottom - contentHeight - targetRect.height;
  } else if (alignY === "middle") {
    targetTop = targetRect.bottom - (contentHeight + targetRect.height) / 2;
  } else {
    targetTop = targetRect.bottom;
  }

  if (alignX === "left") {
    if (alignY === "middle") {
      targetLeft = targetRect.left - contentWidth;
    } else {
      targetLeft = targetRect.left;
    }
  } else if (alignX === "middle") {
    targetLeft = targetRect.left - (contentWidth - targetRect.width) / 2;
  } else {
    if (alignY === "middle") {
      targetLeft = targetRect.right;
    } else {
      targetLeft = targetRect.left - contentWidth + targetRect.width;
    }
  }

  const popoverCSS: { top: string; left: string } = {
    top: targetTop,
    left: targetLeft,
  };

  contentEl.style.top = `${popoverCSS.top}px`;
  contentEl.style.left = `${popoverCSS.left}px`;
};
