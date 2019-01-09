# Architecture of SPA (Single Page Applications)

This particular guide focus on what to keep in mind while designing the architecture of the new Single Page Application that you are going to develop.

## Use of LIFT pattern

This pattern is listed on Angular's Official [Guide](https://angular.io/guide/styleguide#lift)

LIFT is an acronym for **L**ocate, **I**dentify, **F**lat, **T**-DRY.

**Locate**: should be able to locate files quickly. Keep relative files near each other. For example `PassengerDetails` component should be placed near `PassengerList`.

**Identify**: should be able to identify files based on their name and what it contains or does. For example adding `.spec` isn't a requirement in naming your test files but helps developer in identifying that it contains test logic.

**Flat**: should be able navigate to easily, avoid nesting directories needlessly. Rule of thumb is to create a sub-directory when files count reaches 7.

**T-DRY** (Try to be Don't Repeat Yourself): should not repeat yourself. It makes sense to be DRY but in some cases you should avoid being DRY. For example instead of naming `user-details-test.spec.js` can be written as `user-details.spec.js`, because we already know that .spec is a test file and we don't need to repeat that in the name of the file.

## File Imports
Sort imports alphabetically (destructered imports as well), leave a space between imports so that you might able to distinguish between 3rd Party and Application imports. Increases readability when imports become large in number.


**Not Recommended**
```js
import React from 'react';
import App, { Container } from 'next/app';
import { registerSuccess, loginSuccess } from '../redux/actions';
import BookingDetails from '../components/bookingDetails';
```

**Recommended**
```js
import App, { Container } from 'next/app';
import React from 'react';

import BookingDetails from '../components/bookingDetails';
import { loginSuccess, registerSuccess } from '../redux/actions';
```

## Lazy Loading

## Maintainable CSS

## Multiple entities/components in single file

## State Management

## Server Side Rendering

## Best architecture is independent of the framework

