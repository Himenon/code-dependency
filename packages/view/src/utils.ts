export const getClassNames = (styles: {}, className: string): string => {
  return className
    .split(" ")
    .map(name => styles[name])
    .join(" ");
};
