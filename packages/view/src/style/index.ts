const styles = require("@primer/css/utilities/index.scss");

export const classNames = (name: string | undefined | string[]) => {
  if (typeof name === "string") {
    return name
      .split(" ")
      .map(n => styles[n])
      .join(" ");
  }
  if (!name) {
    return "";
  }
  if (typeof name === "string") {
    return name;
  }
  return name.map(n => styles[n]).join(" ");
};
