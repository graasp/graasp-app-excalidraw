# Graasp App Template Typescript

This repository hosts a template for a Graasp app using Typescript, React, MUI and the Graasp API.

## Installation

### Local Env Files

To pass different configurations to the app when running locally, we advise to create:

- A _development_ configuration file: This file will be used when you **work** on the app.
  It will be called `.env.development`.
- A _test_ configuration file: This file will be used when you want to **perform automated tests**.
  It will be called `.env.test`.
- A _local_ configuration file: This file will be used to **test the app with the graasp frontend** (no mocked API).
  It will be called `.env.local`.

The required variables to put inside the configuration file are:

| variable name             | description                                                                                                                                                  |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `REACT_APP_GRAASP_APP_ID` | Id of the app. Should be unique and can be generated [here](https://www.uuidgenerator.net/version4)                                                          |
| `REACT_APP_MOCK_API`      | Whether to use the mocked API (lighter development environnement)                                                                                            |
| `REACT_APP_API_HOST`      | URL of the graasp backend. When using the mock api this can be any url                                                                                       |
| `REACT_APP_GRAASP_DOMAIN` | Domain where the app will be hosted. When working locally, this should be `localhost`                                                                        |
| `PORT`                    | Specify the port to be used, when not set the app will run on port 3000 by default, so you can access it at [`http://localhost:3000`](http://localhost:3000) |

Following these instructions we recommend using the following files (adapt to your need):

`.env.development`:

```sh
# id of the app (generate one yourself)
REACT_APP_GRAASP_APP_ID=25c25f3f-ce4a-4f08-a7d5-61eb5be8778c

# whether to use the mock api
# (fakes the db so you don't need the graasp backend running)
REACT_APP_MOCK_API=true

# the url of the api backend
# when using the mock api this can be any url
REACT_APP_API_HOST=http://localhost:3636

# domain of the app
REACT_APP_GRAASP_DOMAIN=localhost

# port to use when running the app
PORT=3005
```

`env.local`:

```sh
PORT=3008
CYPRESS_BASE_URL=http://localhost:3008

# do not use fake api
REACT_APP_MOCK_API=false

REACT_APP_GRAASP_APP_ID=147e89b5-7760-48b3-81ef-10c4a2dcc786

# this is the url of the graasp api listening on port 3000 (default)
REACT_APP_API_HOST=http://localhost:3000
REACT_APP_GRAASP_DOMAIN=localhost

# set the environment to production to replicate as closely as possible the real world
NODE_ENV=production
```

### Sentry

Add the `SENTRY_DSN` secret to the GitHub repo secrets to track errors using Sentry.  
See the [Sentry Docs](https://docs.sentry.io/platforms/javascript/guides/react/).

## Running the app

Run the app with:

```bash
yarn start:dev
```

## Testing the app

### Test-driven development (TDD)

To develop your app following the [test-driven development](https://en.wikipedia.org/wiki/Test-driven_development) methodology you should:

1. Open 2 terminals (or 2 tabs)
2. Run `yarn start:dev` in your first terminal to **launch the app**
3. Run `yarn cypress:open` in your second terminal to **open the cypress runner** and execute the test you want

### Run all tests

To run all the tests on your app and get a coverage report you should:

1. Open a terminal
2. Run `yarn test`, which will start your app _and_ run all the cypress tests you wrote

When the tests finish you will get a report of your code coverage. If some tests fail, try to run the independently using the TDD method above.

## Documentation

### More info on the tools

Please have a look at the documentation to [start your app and setup all necessary tools](docs/SETUP.md).

Also have a look at the [MUI quick guide](docs/MUI.md).
