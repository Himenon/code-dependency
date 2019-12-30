const styles = require("@primer/css/utilities/index.scss");

export const classNames = (name: string | string[]) => {
  if (typeof name === "string") {
    return name
      .split(" ")
      .map(n => styles[n])
      .join(" ");
  }
  return name.map(n => styles[n]).join(" ");
};
