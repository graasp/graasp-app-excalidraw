# Using Material

This guide teaches how to use [Material UI](https://mui.com/material-ui/getting-started/installation/) for design in your app.

## Installation

Run this:

```
yarn add @mui/material @emotion/react @emotion/styled
```

Load the roboto font, add in your `public/index.html`:

```
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
```

And if you wish to use Material UI icons you can install:

```
yarn add @mui/icons-material
```

## Usage

The v5 of MUI can be used with React18 and does not make use of `makeStyles`
(this way of doing is considered legacy and will be removed at some point)

We encourage you to use the new style which is described bellow:

### Styling with `styled` utility

Styling with the `styled` utility is the recommended way of styling re-usable components.
It is efficient in renders and supports the use of theme values.

> Using it to style a stock HTML Tag. Notice the quotes used to reference the name of the tag

```tsx
import { FC } from 'react';

import { styled } from '@mui/material';

const StyledDiv = styled('div')({
  margin: '8px',
});

export const SomeComponent: FC = () => <StyledDiv>Some content</StyledDiv>;
```

> Using it with theme values and a stock HTML Tag

```tsx
import { FC } from 'react';

import { styled } from '@mui/material';

const StyledDiv = styled('div')(({ theme }) => ({
  margin: theme.spacing(2),
}));

export const SomeComponent: FC = () => <StyledDiv>Some content</StyledDiv>;
```

> Using it with A MUI component. Notice that the MUI component is used as is in the parenthesis of `styled`

```tsx
import { FC } from 'react';

import { Stack, styled } from '@mui/material';

const StyledStack = styled(Stack)(({ theme }) => ({
  margin: theme.spacing(2), // use the theme values here
}));

export const SomeComponent: FC = () => <StyledStack>Some content</StyledStack>;
```

### Styling with the `sx` prop

If you need to make one-off customizations you can use the `sx` prop that is available on _all_ MUI Components.
You can even add it to your own components with the `SxProp` type (for TS users).

> ⚠️ the `sx` prop has a rendering drawback, it is less efficient than using the `styled utility

For reference see [this page about the `sx` prop](https://mui.com/system/the-sx-prop/)
which goes over details of the shorthands that can be used

## Doing conditional styling

You can do conditional styling by utilizing the spread operator and the short-circuit evaluation of the `&&` operator.

```tsx
const ConditionalyStyled = styled(Comp)({
  margin: '8px',
  ...(someCondition && {
    color: 'red', // set foreground color to red
    margin: '0px', // overwrite the margin value
  }),
});
```

# Using i18n

Add the `react-i18next` and `i18next` package as a dependency.
Add the `@types/i18n` package as dev dependency.

Use the Provider with a config.
