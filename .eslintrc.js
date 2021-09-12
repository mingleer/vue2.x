// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parserOptions: {
        parser: 'babel-eslint'
    },
    env: {
        browser: true,
    },
    extends: [
        // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
        // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
        'plugin:vue/essential',
        // https://github.com/standard/standard/blob/master/docs/RULES-en.md
        'standard'
    ],
    // required to lint *.vue files
    plugins: [
        'vue'
    ],
    // add your custom rules here
    rules: {
        // allow async-await
        'generator-star-spacing': 'off',
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        // 结束语句后添加分号
        'semi': ['error', 'always'],
        // 函数声明时括号与函数名间加空格
        'space-before-function-paren': ['error', {
            // 匿名函数表达式
            'anonymous': 'always',
            // 命名函数表达式
            'named': 'never',
            // 异步箭头函数表达式
            'asyncArrow': 'always'
        }],
        // 忽略自闭和标签添加闭合标签
        'vue/no-parsing-error': [2, {
            "x-invalid-end-tag": false
        }],
        "indent": ['error', 4, {
            "SwitchCase": 1
        }]
    }
}
