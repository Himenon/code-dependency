import * as path from "path";

// This is a custom Jest transformer turning file imports into filenames.
// http://facebook.github.io/jest/docs/en/webpack.html

export const process = (src, filename) => {
  const assetFilename = JSON.stringify(path.basename(filename));

  if (filename.match(/\.svg$/)) {
    return `const React = require('react');
      module.exports = {
        __esModule: true,
        default: ${assetFilename},
        ReactComponent: React.forwardRef((props, ref) => ({
          $$typeof: Symbol.for('react.element'),
          type: 'svg',
          ref: ref,
          key: null,
          props: Object.assign({}, props, {
            children: ${assetFilename}
          })
        })),
      };`;
  }

  return `module.exports = ${assetFilename};`;
};
