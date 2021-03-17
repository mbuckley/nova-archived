export const debounce = (func: (...args: any[]) => void, wait = 0) => {
  let timer: any;
  return (...args: any[]): any => {
    clearTimeout(timer);
    timer = setTimeout(func, wait, ...args);
  };
};

// Adapted from https://gist.github.com/jcxplorer/823878
export const uuid = () => {
  let uuid = "",
    i: number,
    random: number;
  for (i = 0; i < 32; i++) {
    random = (Math.random() * 16) | 0;

    if (i == 8 || i == 12 || i == 16 || i == 20) {
      uuid += "-";
    }
    uuid += (i == 12 ? 4 : i == 16 ? (random & 3) | 8 : random).toString(16);
  }
  return uuid;
};

export const uuidWithPrefix = (prefix = "item") => {
  return `${prefix}-${uuid()}`;
};
