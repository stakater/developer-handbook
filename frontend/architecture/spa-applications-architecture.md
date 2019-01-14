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

Lazy loading or on-demand loading of files/components/modules is a methodology to improve your application's performance. YES! Lazy sounds not so fast but what it actually means that if you application has 10 modules, all of those are not going to be fetched on initial app load but lazily. SPA frameworks today offer this feature out of the box.

How does it work?
Bundler splits your code into multiple files these files are then fetched according to the routes they are associated with.

Do I need lazy loading?
Off course, it will boost your applications performance like crazy. Imagine have 100 different components across the application whereas the page the user is requesting only uses 5 of these components. With a lazy loaded app you'll only need to fetch those 5 components and not 100. It's clear win-win situation, you are not only boosting the performance of your application but saving a lot of bandwidth as well.

## Maintainable CSS

SPA frameworks enable you to write CSS that can be scoped only to the component it is associated with. It makes the component fully independent and can be exported as a plugin easily which makes it re-usable. The idea of using scoped CSS looks amazing for creating external plugins but there are some pitfalls of using this approach thoughout the application. Designers should be responsible for writing CSS, and not developers.

If there are new changes in a page, to incorporate those changes designer will either have to understand the underlying framework used or have to constantly interact with developer to incorporate the new styles into that page/component. Since both approaches might not be feasible in every case it's better to keep your application level CSS apart from the underlying framework. And a designer should have full control over styling of the application.

## Multiple entities/components in a single file

Having components separated out in their own files is the recommended approach. It helps you follow the Single Responsibility Priciple easily, code is manageble and maintenance becomes easier. However there might be case where you want to keep similar looking components in a single file or any other reason of the sort, like in alert-component file you may want to export info, danger and warning component etc.

## State Management

State Management is the `Single Source of Truth` in your application. Changes in your application not occur because of AJAX requests but there are states for indicating whether the spinner is running or the modal is opened etc. all of these has nothing to do with the API your app is connected with. So how do manage state changes within the application? Since data is changing over the time efficiently and these changes in state of SPA application can cause re-rendering, which is expensive.

To make the state predictable and change only when needed you have take out the state from the components and bind it with universal store across your SPA application that listens to the actions triggered and mutate the state only where needed.

There are number for solutions for every SPA framework out there but one of the most popular solution for state management is [Redux](https://redux.js.org/). One of the benefit of using it is that it's framework agnostic.

## Server Side Rendering

SEO in Single Page Applications comes as an afterthought. A frontend architecture should it make SEO easier rather than hinder it. The developer should not go for third party solutions or create a completely separate application in order to handle SEO. Server Side Rendered application is often referred to as `Isomorphic` or `Universal` application. SPA frameworks in 2019 are evolving very fast and support SSR.

There are three main reasons to create a Universal version of your app.

1. Facilitate web crawlers (SEO)
2. Improve performance on mobile and low-powered devices
3. Show the first page quickly

Universal or Server Side Rendered solutions for most popular frameworks are listed below:

- Angular :point_right: [Angular Universal](https://angular.io/guide/universal)
- ReactJS :point_right: [Next JS](https://nextjs.org/)
- VueJS :point_right: [Nuxt JS](https://nuxtjs.org/)
