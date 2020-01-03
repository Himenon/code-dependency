module.exports = {
  hooks: {
    "pre-commit": "lint-staged --config .lintstagedrc",
    "commit-msg": "commitlint --config commitlint.config.json -E HUSKY_GIT_PARAMS",
  },
};
