const styles = require("./style.scss");

export const getClassNames = (className: string): string => {
  return className
    .split(" ")
    .map(name => styles[name])
    .join(" ");
};
