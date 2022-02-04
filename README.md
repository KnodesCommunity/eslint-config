# @knodes/eslint-config
ESLint rules &amp; presets for Knodes
---

This set of rules is released open-source for anyone to use. It is meant to be a strict, aerated configuration.

### Main features

> :white_check_mark: is always installed, :white_medium_square: is optional.

* **Languages:**
  * :white_check_mark: Javascript
  * :white_medium_square: Typescript
    * :white_medium_square: with rxjs
* **Frameworks:**
  * :white_check_mark: Bare node/browser
  * :white_medium_square: [Nest](https://nestjs.com/)<!-- ([:information_source: more infos]()) -->
  * :white_medium_square: [Angular](https://angular.io/) ([:information_source: more infos](#angular))
* **Plugins:** (checked are always used)
  * :white_check_mark: [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import)
  * :white_check_mark: [eslint-plugin-jsdoc](https://www.npmjs.com/package/eslint-plugin-jsdoc)
  * :white_check_mark: [eslint-plugin-prefer-arrow](https://www.npmjs.com/package/eslint-plugin-prefer-arrow)
  * :white_check_mark: [eslint-plugin-sort-export-all](https://www.npmjs.com/package/eslint-plugin-sort-export-all)
  * :white_check_mark: [eslint-plugin-eslint-comments](https://www.npmjs.com/package/eslint-plugin-eslint-comments)
  * :white_medium_square: [@angular-eslint](https://www.npmjs.com/package/@angular-eslint/eslint-plugin)
  * :white_medium_square: [@typescript-eslint](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin)

### Configurations quick outline:

* Angular:
  * `@knodes/eslint-config/angular`
  * `@knodes/eslint-config/angular/jest`
  * For libs:
    * `@knodes/eslint-config/angular/lib`
    * `@knodes/eslint-config/angular/lib/jest`
* Nest: `@knodes/eslint-config/nest`
* Bare:
  * Pure JS: `@knodes/eslint-config/js`
  * JS + TS: `@knodes/eslint-config/ts`
  * JS + TS + rxjs: `@knodes/eslint-config/ts-rxjs`

You can also use configuration fragments from `@knodes/eslint-config/config-fragments/*`. See [the directory on GitHub](https://github.com/KnodesCommunity/eslint-config/tree/main/src/config-fragments).

### Installation & configuration

For any preset, you must at least install base dependencies.

```sh
npm install --save-dev @knodes/eslint-config eslint eslint-plugin-import eslint-plugin-jsdoc eslint-plugin-prefer-arrow eslint-plugin-sort-export-all eslint-plugin-eslint-comments
```

If you're using **Typescript**, install also `@typescript-eslint` related dependencies.

```sh
npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

#### Angular

```sh
npm install --save-dev @knodes/eslint-config eslint \
  eslint-plugin-import eslint-plugin-jsdoc eslint-plugin-prefer-arrow eslint-plugin-sort-export-all eslint-plugin-eslint-comments \
  @typescript-eslint/eslint-plugin @typescript-eslint/parser \
  @angular-eslint/eslint-plugin @angular-eslint/eslint-plugin-template @angular-eslint/template-parser
```

#### Without/other framework

<blockquote>
<details>
<summary>See sample <code>.eslintrc.js</code> for Typescript</summary>

```js
module.exports = {
	env: { /* See https://eslint.org/docs/user-guide/configuring#specifying-environments. es2020 is enabled by default */ },
	extends: '@knodes/eslint-config/ts',
	parserOptions: {
		project: './tsconfig.json',
	},
};
```

</details>
</blockquote>

<blockquote>
<details>
<summary>See sample <code>.eslintrc.js</code> for Javascript</summary>

```js
module.exports = {
	env: { /* See https://eslint.org/docs/user-guide/configuring#specifying-environments. es2020 is enabled by default */ },
	extends: '@knodes/eslint-config/js',
};
```

</details>
</blockquote>

##### Assumed directory structure

* `*.{j,t}s`: Project configuration files. Light lint rules are applied. It includes `.eslintrc.js`.
* `**`
  * `index.[jt]s{x,}`: Barrel files, only exporting other source files
  * `*.[jt]s{x,}`: Source files
  * `*.{spec,test}.[jt]s{x,}`: Unit test files. Configured for *jest* by default, unless framework use a different test runner
  * `__mocks__/**/*.[jt]s{x,}`: Module mocks for unit tests
  * `test-utils/**/*.[jt]s{x,}`: Various testing utilities
