import * as ghpages from "gh-pages";
import * as path from "path";

const packageJson = require(path.join(__dirname, "../package.json"));

export const publish = async (distPath: string) => {
  console.log("Start deploy to github pages.");
  const url = packageJson.repository.url;
  const homepage = packageJson.homepage;
  ghpages.publish(distPath, {
    repo: url,
    branch: "gh-pages",
    dotfiles: true,
    silent: false,
  });
  console.log(`Release Site: ${homepage}`);
};

publish(path.resolve(__dirname, "../dist")).catch(console.error);
