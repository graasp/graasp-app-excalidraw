# React App with Typescript and other bells and whistles

Here you will get detailed steps on how to set up a new **ReactJS** app using **TypeScript** and best practice tools:

- linter: _eslint_
- code formatter: _prettier_
- git hooks: _husky_
- github ci workflows
- UI and E2E tests: _cypress_
- code coverage: _nyc_
- script automation and more ...

## Create the project with create-react-app (CRA)

To bootstrap the project using `create-react-app` and `yarn` do:

```bash
yarn create react-app <name_of_the_project> --template typescript
```

This will create a new project with everything you need to create a React app using typescript.

Now, navigate inside the newly created folder (using `cd`) and set the version of yarn to berry:

```bash
yarn set version stable
```

This will tell yarn to use the latest stable version.

> **Notice:**
> In this tutorial we use `yarn` because it is faster than `npm`.

Install dependencies listed in `package.json` using:

```bash
yarn
```

Launch the project:

```bash
yarn start
```

### Cleaning up the project

Remove the `src/reportWebVitals.tsx` file and its usage in `src/index.tsx`

Remove the package `web-vitals` in `package.json`

## Add ESlint

Source for this part is: [https://andrebnassis.medium.com/setting-eslint-on-a-react-typescript-project-2021-1190a43ffba](https://andrebnassis.medium.com/setting-eslint-on-a-react-typescript-project-2021-1190a43ffba)

Remove the existing React config for eslint in `package.json`:

```
{
  ...
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  ...
}
```

Install eslint as a dev dependency:

```bash
yarn add -D eslint
```

To initialize the repo with a base config use:

```bash
yarn eslint --init
```

And select these values:

> How would you like to use ESLint? **To check syntax, find problems, and enforce code style**

> What type of modules does your project use? **JavaScript modules (import/export)**

> Which framework does your project use? **React**

> Does your project use TypeScript? **Yes**

> Where does your code run? **Browser**

> How would you like to define a style for your project? **Use a popular style guide**

> Which style guide do you want to follow? **Airbnb: <https://github.com/airbnb/javascript>**

> What format do you want your config file to be in? **JSON**

> Would you like to install them now with npm? **No**

Copy and paste the packages that are required and install them as dev dependencies using `yarn add -D <package name>`

### Fixing errors

To fix the `Unable to import App without file extension` error add

```
{
  ...
  "settings": {
    "import/resolver": {
      "typescript": {}
    }
  },
  ...
}
```

to your `.eslintrc.json` file

Same for `file extensions`:

```
{
  ...
  "rules": {
    ...
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "ts": "never",
        "tsx": "never"
      }
    ]
  }
}
```

The final eslint config looks like this:

```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "airbnb",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": ["react", "react-hooks", "@typescript-eslint"],
  "rules": {
    "import/no-import-module-exports": "off",
    "import/no-extraneous-dependencies": ["error", { "devDependencies": true }],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "ts": "never",
        "tsx": "never"
      }
    ],
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      {
        "allowExpressions": true
      }
    ],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "comma-dangle": ["error", "never"],
    "react/jsx-one-expression-per-line": "off",
    "react/jsx-filename-extension": ["warn", { "extensions": [".tsx"] }],
    "react/function-component-definition": [
      2,
      { "namedComponents": "arrow-function" }
    ]
  },
  "settings": {
    "import/resolver": {
      "typescript": {}
    }
  }
}
```

## Adding Prettier

Run this command:

```bash
yarn add -D prettier
```

Create a new `.prettierrc` file with the following content:

```json
{
  "trailingComma": "all",
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true,
  "jsxSingleQuote": false,
  "importOrder": ["^react", "^@?graasp*", "^@?mui*", "^@.*", "^[./]"],
  "importOrderSeparation": true,
  "importOrderSortSpecifiers": true
}
```

Add the packages: `eslint-config-prettier`, `eslint-plugin-prettier` as dev deps. (with yarn add -D ...)

Add to `.eslintrc.json`:

```
{
 ...
 "extends": [
  ...
  "prettier"
 ],
 ...
 "plugins": [
  ...
  "prettier"
 ],
 ...
 "rules": [
  ...
  "prettier/prettier": "error",
 ]
 ...
}
```

And add this to `package.json` to auto-fix with `yarn prettier:write`:

```
{
  ...
  "scripts": {
    ...
    "prettier:write": "prettier src/**/*.{ts,tsx,js,jsx} --write",
    ...
  }
  ...
}
```

## Add Husky for hooks

We will use husky to dd git hooks to lint, build and test the code before every commit, check that commit messages comply to [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/), auto-install after checkout and print git status after commit.

For this we will need to add the following packages into `package.json`:

- `husky`
- `@commitlint/cli`
- `@commitlint/config-conventional`
- `pretty-quick`

We can add them with:

```
yarn add -D husky @commitlint/cli @commitlint/config-conventional pretty-quick
```

We can then install the git hooks with:

```bash
yarn husky install
```

To have the git hooks automatically installed after install add the following script to your `package.json`:

```
"scripts": {
 ...
 "postinstall": "husky install",
}
```

To add new hooks you can use the following syntax:

```bash
yarn husky add .husky/pre-push 'yarn test'
```

> This will launch your test script before pushing on git. If the command fails, it will abort the push.

Here are a few examples that you can add:

```bash
yarn husky add .husky/commit-msg 'yarn commitlint --edit ${1}';
yarn husky add .husky/post-checkout 'yarn install';
yarn husky add .husky/pre-commit 'yarn pretty-quick --staged && yarn lint && yarn test';
yarn husky add .husky/post-commit 'git status';
yarn husky add .husky/pre-push 'yarn lint && yarn build && yarn test';
yarn husky add .husky/post-merge 'yarn install';
```

To use `commitlint` you will have to add a file named `commitlint.config.js` in the root folder with content:

```js
module.exports = { extends: ['@commitlint/config-conventional'] };
```

For convenience you can add these scripts to `packkage.json` in order to quickly install or uninstall husky hooks:

```
"hooks:install": "husky install",
"hooks:uninstall": "husky uninstall",
```

We advise you to commit those hooks in git:

```bash
git add .husky;
git commit -m "chore: added husky hooks";
```

## Add Github workflow to run cypress in ci

Create a `.github/workflows` folder in which you should place your GitHub workflow (a `.yml` file).
See GitHub documentation for more info.

Here is an example of sucha a file:

```yml
name: cypress tests
on: [push]
jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - name: checkout
        uses: actions/checkout@v2

      - name: set up node
        uses: actions/setup-node@v2
        with:
          node-version: '16'
          cache: 'yarn'

      - name: install yarn
        # avoid checksum errors with github packages
        run: YARN_CHECKSUM_BEHAVIOR=update yarn

      - name: cypress run
        uses: cypress-io/github-action@v2
        env:
          REACT_APP_API_HOST: http://localhost:3636
          REACT_APP_GRAASP_DOMAIN: localhost
          REACT_APP_GRAASP_APP_ID: id-1234567890
          REACT_APP_MOCK_API: true
          NODE_ENV: test
        with:
          install: false
          config: baseUrl=http://localhost:3000
          start: yarn start:ci
          wait-on: 'http://localhost:3000'
          wait-on-timeout: 180
          browser: chrome
          headless: true
          quiet: true

      # after the test run completes
      # store videos and any screenshots
      # NOTE: screenshots will be generated only if E2E test failed
      # thus we store screenshots only on failures
      # Alternative: create and commit an empty cypress/screenshots folder
      # to always have something to upload
      - uses: actions/upload-artifact@v2
        if: failure()
        with:
          name: cypress-screenshots
          path: cypress/screenshots
      # Test run video was always captured, so this action uses "always()" condition
      - uses: actions/upload-artifact@v2
        if: always()
        with:
          name: cypress-videos
          path: cypress/videos

      - name: coverage report
        run: npx nyc report --reporter=text-summary
```

## Scripts to automate the testing when committing or pushing

Use the npm packages:

- `wait-on`: to wait on a page to load
- `concurrently` to run multiple commands at the same time
- `env-cmd` to provide environment variables to commands

For example:

    "test:once": "concurrently -k -s first \"yarn start:test\" \"wait-on http://localhost:3333 && yarn test:ci\"",

Here we use the `concurrently` package to run the UI with `yarn start:test` and the cypress tests with `yarn test:ci` after having loaded the page.

The `-k` (`--kill-others`) option kills all other processes when one finishes. The `-s` (`--success`) reports success based on the first process to have finished.

## Code Coverage

Source: [Cypress docs on code-coverage](https://docs.cypress.io/guides/tooling/code-coverage#What-you-ll-learn)

Setting up code-coverage is useful to measure the fraction of the code that is covered by tests.
In a React application created with CRA and using cypress tests, one cans add code-coverage by using the following package: `@cypress/code-coverage`, `@cypress/instrument-cra` and `nyc`.
Run the following command to add them to your project:

`yarn add @cypress/code-coverage @cypress/instrument-cra nyc`

Next step is to add the required flags to the start script launching the application, so it can instrument the code. Your start command should look something like this where we added the `-r @cypress/instrument-cra`:

`"start": "react-scripts -r @cypress/instrument-cra start"`

Now, in the `cypress` folder you should edit 2 files as follows:

In `cypress/plugins/index.js` add the following content:

```
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  require('@cypress/code-coverage/task')(on, config);
  // include any other plugin code...

  // It's IMPORTANT to return the config object
  // with any changed environment variables
  return config;
};
```

And in `cypress/support/index.js` add:

```
import '@cypress/code-coverage/support';
```
