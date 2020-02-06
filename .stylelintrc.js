module.exports = {
  "extends": [
    "stylelint-config-standard"
  ],
  "rules": {
    "indentation": null,
    "no-missing-end-of-source-newline": null,
    "rule-empty-line-before": null,
    "no-eol-whitespace": null,
    "media-feature-name-no-unknown": null,
    "string-quotes": "double",
    "no-invalid-double-slash-comments": true,
    "declaration-empty-line-before": ["always", {
      except: [
        "first-nested",
      ],
      ignore: [
        "after-declaration",
        "after-comment",
        "inside-single-line-block",
      ],
    }],
    "no-empty-source": true,
    "function-whitespace-after": "always",
    "color-named": 'never', // 不可以使用颜色的名字
    "block-closing-brace-newline-after": "always-single-line", // 闭合括号后一空行
    "number-leading-zero": "never" // 清楚开始的0
  }
};