## 样式校验

基于[stylelint](https://stylelint.io/)进行样式校验，支持校验 `.css` `.scss` `.vue`，结合[vscode-stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)插件在[vscode](https://code.visualstudio.com/)中实时对样式错误或警告进行提示

下述命令行可对所有样式文件（忽略的排除在外）进行校验并对错误及警告尝试修复

```sh
npm run stylelint
```

## 脚本校验

基于[eslint](https://eslint.org/)进行代码校验，结合[vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)插件在[vscode](https://code.visualstudio.com/)中实时对脚本错误或警告进行提示

下述命令行可对所有脚本（忽略的排除在外）进行校验并对错误及警告尝试修复

```sh
npm run lint
```

## 代码美化

基于[prettier](https://prettier.io/)进行代码美化，结合[prettier-vscode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)插件在[vscode](https://code.visualstudio.com/)中对文件进行保存时自动美化代码

下述命令行可对所有文件（忽略的排除在外）进行代码美化

```sh
npm run format
```

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```
