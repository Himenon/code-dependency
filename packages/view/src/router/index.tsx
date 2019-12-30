import React from "react";
import Viz from "viz.js";
import { Module, render } from "viz.js/full.render.js";

const src = ``;

export const AppRouter = () => {
  const viz = new Viz({ Module, render });
  const [element, updateElement] = React.useState("");
  React.useEffect(() => {
    const f = async () => {
      const elem: string = await viz.renderString(src);
      updateElement(elem);
    };
    f().catch(console.error);
  });
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: element,
      }}
    ></div>
  );
};
