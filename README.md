# Graasp App Excalidraw

This repository hosts the code for Excalidraw's integration into the Graasp ecosystem.

Excalidraw is an open-source web drawing application. Find out more on the [Excalidraw website]()!

## Awesome! How does it work?

## Development

### Local setup

To work with Graasp apps locally, follow the official Graasp documentation.

To get started with this app, clone this repo. You will need to add a dotenv file `.env.development`.

```dotenv

GRAASP_DEVELOPER_ID=6505fd8e-9762-49a3-9906-4cbabbb81130 # Your developer UUID in your local Graasp instance.

VITE_PORT=3335 # The port on which you would like to serve the app.
VITE_API_HOST=localhost # The hostname (localhost for local dev)
VITE_MOCK_API=false # Mock the API by default (overriden by yarn dev:mock)
VITE_GRAASP_APP_KEY=82582612-92aa-408f-bfe9-0d202414a3b6 # The app key in your local Graasp instance.
VITE_VERSION=latest # The version of your app (not important for development)
```

Install the dependencies by running [yarn]():

```bash
yarn
```

And finally start the app. To serve it within your local Graasp instance:

```bash
yarn dev
```

And to serve it with a mocked API (see [the documentation]()):

```bash
yarn dev:mock
```

## How to use

To use this app, you can either run it locally which will give you direct access to an excalidraw canvas or fit it inside a Graasp activity as it is already deployed.
Excalidraw's documentation can be found [here](https://github.com/excalidraw/excalidraw#documentation), and a description of the tools is available on canvas by clicking on the ? button.

## Example

Below you can find a screenshot of the app inside the Graasp Builder view.

![image](AppGraasp.png)

## What's next?

For future versions, here is a list of features to be implemented and points to be optimized:

- Enabling collaboration and saving state (tool selected, etc...)
- Creating admin view allowing access to a table of submissions linked to the corresponding Excalidraw canvas
- Choosing method to handle changes so that the list of current elements is checked for equality before treating the change.
