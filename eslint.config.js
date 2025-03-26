import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      "no-var": "error",
      "no-undef": "off",
      // 禁止出现console
      "no-console": "off",
      // 禁用debugger
      "no-debugger": "warn",
      // 禁止出现重复的 case 标签
      "no-duplicate-case": "warn",
      // 禁止出现空语句块
      "no-empty": "warn",
      // 禁止不必要的括号
      "no-extra-parens": "off",
      // 禁止对 function 声明重新赋值
      "no-func-assign": "warn",
      // 禁止在 return、throw、continue 和 break 语句之后出现不可达代码
      "no-unreachable": "warn",
      // 强制所有控制语句使用一致的括号风格
      "curly": "off",
      // 要求 switch 语句中有 default 分支
      "default-case": "warn",
      // 强制尽可能地使用点号
      "dot-notation": "warn",
      // 要求使用 === 和 !==
      "eqeqeq": "warn",
      // 禁止 if 语句中 return 语句之后有 else 块
      "no-else-return": "warn",
      // 禁止出现空函数
      "no-empty-function": "warn",
      // 禁用不必要的嵌套块
      "no-lone-blocks": "warn",
      // 禁止使用多个空格
      "no-multi-spaces": "warn",
      // 禁止多次声明同一变量
      "no-redeclare": "warn",
      // 禁止在 return 语句中使用赋值语句
      "no-return-assign": "warn",
      // 禁用不必要的 return await
      "no-return-await": "warn",
      // 禁止自我赋值
      "no-self-assign": "warn",
      // 禁止自身比较
      "no-self-compare": "warn",
      // 禁止不必要的 catch 子句
      "no-useless-catch": "warn",
      // 禁止多余的 return 语句
      "no-useless-return": "warn",
      // 禁止变量声明与外层作用域的变量同名
      "no-shadow": "off",
      // 允许delete变量
      "no-delete-var": "off",
      // 强制数组方括号中使用一致的空格
      "array-bracket-spacing": "warn",
      // 强制在代码块中使用一致的大括号风格
      "brace-style": "warn",
      // 强制使用骆驼拼写法命名约定
      "camelcase": "off",
      // 强制使用一致的缩进
      "indent": "off",
    },
  },
)
