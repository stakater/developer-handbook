# CSS Best Practices

CSS as simple as it seems to write can easily go out of hand if not written with taking some measures into account.

There are no hard and fast rules on how to write your CSS but there are some pointers that can help you write CSS that's more readable and maintainable. 

## CSS Reset

Browsers have different built-in styles and they effect HTML elements differently including heights, margin, padding. That brings inconsistency within your app across different browsers. To address this issue we use CSS Reset. 
You either write your own CSS Reset or use the one that everyone else is using. The most popular styles reset is probably [Eric Meyer's](https://meyerweb.com/eric/tools/css/reset/index.html) CSS Reset.

## Combining CSS Rules

Some we have to write common properties for multiple element, writing them out for each element separately is a bit tedious.

```css 
h1, h2, h3, a {
    color: #333;
    text-transform: uppercase;
}
```

And you can always add distinctive styles to these elements separately as well.

## Write your Markup first

Writing your Markup first will actually save you time, writing CSS along with your HTML seems to be more appropriate but this way you might end up having duplicate properties. 

But with Markup first approach you know how HTML is structured and what styles do you need to make it look good with maximum re-usability. 

## Readability

Most important aspect of your CSS is it's readability. And good readability means better maintainability. 

1. One liner
```css
.heading {
    font-size: 14px; background-color: #fafafa; color: #444; 
}
```

2. Multiliner
```css
.heading {
    font-size: 14px; 
    background-color: #fafafa;
    color: #444; 
}
```

Though both approaches are acceptable but clear winner is `Multiliner`. Make sure you write each rule on a separate line.


## Consistency

Apart from the few basic rules that one should consider while writing their CSS is their own CSS-Sub-Language. There are certain names one uses every now and then, that's your sub language for CSS. 
I do write some classes in nearly every new website that I create, the `hero-image` class. 
Go ahead make your own sub language that helps you name classes easily and makes it more usable across multiple apps/websites.

## CSS Frameworks
What are CSS Frameworks? How do they help us?

CSS Frameworks gives you most of the features out of the box so that you don't have to write them from scratch everytime you work on a new project. 

One of the best features of CSS Frameworks is that almost all of these frameworks have CSS defined for the layout that helps you align and structure your pages easily. Apart from the layout they have dedicated buttons, typography, lists, colors, utility classes etc. 

Some of these frameworks are full blow while some are used to help write the webpage quickly with less boiler plate code.

Some popular CSS Frameworks include 
- [Bootstrap](https://getbootstrap.com/)
- [Bulma](http://bulma.io/)
- [Foundation](http://foundation.zurb.com/)
- [Material Design Lite - MDL](http://www.getmdl.io/index.html)
- [Tailwind](https://tailwindcss.com/)
- [Basscss](http://basscss.com/)
- [Skeleton](http://getskeleton.com/)
- etc


## Multiple Classes

Though writing a single class for an element style seems more tempting but imagine there are two completely different type of elements on your page but with same border style (i.e. rounded borders). 

Multiple Classes will handle this situation elegantly all you need to do is right another class with rounded border style.

```css
.box-one {
    color: red;
}
```

```css
.box-two {
    color: blue;
}
```

```css
.rounded {
    border-radius: 1rem;
}
```

```html
<div class="box-one rounded">Box 1</div>

<div class="box-two rounded">Box 2</div>
```

## Use shorthand 

Shorthand properties let you set multiple CSS values simoultaneously. It makes your CSS concise and payload over the network is reduced.

### Values shorthand
```css
.bg {
    background-color: #000;
    background-image: url(images/bg.gif);
    background-repeat: no-repeat;
    background-position: left top;
}
```
can be shortened as: 

```css
.bg {
    background: #000 url(images/bg.gif) no-repeat left top;
}
```

### Colors shorthand
Use shorthand for hex values when possible. 

- `#fff` instead of  `#ffffff` 
- `#fc0` vs `#ffcc00`


## Comments 

Like any other language CSS also have comments. CSS uses the same "block comment" syntax as the C-like languages - you start a comment with `/*`, and end it with `*/`


Single Line
```css
/* Using `rems` instead of `px` for cross device compatibility */
```

Multiline
```css
/**
 * Layout Styles.
 * 
 * Styling the flow of the application.
 */
 ```


## Block vs Inline Elements

**Block** elements take up the whole width of the available space whereas **Inline** elements only take the space needed to fit the width of the content, they also enable elements to sit side by side or in line hence the name inline elements.

Block Elements:
```
h1-h6, div, p, ol, ul, forms, blockquote, table etc
```

Inline Elements:
```
span, a, img, b, strong, em etc
 ```

## Sort properties alphabetically

 Alphabetically sorting your CSS properties enables you to scan the styles quickly.

 ```css

 .style {
    background-color: #2943d2;
    background-image: url(/assets/images/bg-header.jpg);
    background-position: center center;
    background-size: cover;
    height: 565px;
    padding: 50px 0 0 0;
    position: relative;
    width: 100%;
 }
 ```


## Naming Conventions

To make your styles self explanatory, naming of CSS styles i.e. classes, IDs is very important.

```css

/* -------------------
|  Main Page Layout  |
--------------------*/
.container-fluid { /*...*/ }

.container { /*...*/ }


/* ----------------------
|  Application Content  |
------------------------*/
.content-wrapper { /*...*/ }

.content { /*...*/ }

.sidebar { /*...*/ }


/* -------------------
|  Call To Action    |
--------------------*/
#btn-signup {/*...*/}

#btn-login {/*...*/}

#btn-verify-password {/*...*/}

```

## Too many CSS selectors

Use of too many selectors is not advisable as it makes styling unwantedly complex. And any changes in the future will be hard to incorporate

```css

/* BAD */
#home .features .feature-item-wrapper .feature-item h1 {/*...*/}

/* GOOD */
.feature-item .heading {/*...*/}
.feature-item h1 {/*...*/}
```
## Utility Classes 

Using of utility classes helps write styles that generally used app wide like adding round border, padding, margins, making an img tag responsive for multiple layouts or floating an element right or left.

There are even frameworks built on the top utility based styles like [Tailwind CSS](https://tailwindcss.com/). 

Utility class adds more re-usability to the styles you've written. 

```css

.p-0 {
    padding: 0; /* No Padding */
}

.p-1 {
    padding: 1rem; /* Add 1rem padding to all sides */
}

.pr-1 {
    padding-right: 1rem; /* Add 1rem padding to right side */
}

.rounded {
    border-radius: 5px /* Add 5 `px` border radius to the element*/
}

.text-primary {
    color: #E02D3D; /* Adds primary color to the text element */
}
```

#### Usage:

```html
<div class="box-one rounded p-1">Box 1</div>

<div class="box-two rounded text-primary">Box 2</div>
```

## Unnecessary DIVs and SPANs

Don't wrap your content in `DIV`s & `SPAN`s for the sake of it. The more simple your markup is, the better readability it has and more manageable it becomes.


For example if a simple heading needs to be styled use class for it rather than nesting it inside a div and then applying a style onto the DIV.

```html
<!-- Bad -->
<div class="heading-container">
    <h1>My Application Heading</h1>
</div>

<!-- Good -->
<h1 class="heading">My Application Heading</h1>
```

## Multiple Files

Why prefer multiple files for managing your CSS? Having monolithic file approach is that it will easily go out of hand and will be hard to manage.

Multiple files can help you organize your CSS in a much more manageable manner. Here's what I use:

- **Global CSS** - for keeping global styles like resets and app level styles including fonts etc
- **Module CSS** - for modules that used over multiple pages like featured items, wizards etc 
- **Page CSS** - for handling page level CSS that override certain styles like creating `header` styles for home component only 
- **Component CSS** - for keeping component specific styles like buttons.css, alerts.css etc

The problem with multiple styles is that too many HTTP calls will be need to fetch all the CSS required to render the styles. Which we don't want. To avoid it we can a CSS **Pre-Processor** like [SASS](https://sass-lang.com/) etc

## CSS Pre-Processors

CSS is very primitive in nature and it doesn't have the features like functions, loops, inheritance. To be able to use these features we have CSS Pre-Processors. They compile down to CSS eventually, but helps a lot during development. Popular CSS Pre-Processor are [SASS](https://sass-lang.com/), [LESS](http://lesscss.org/), [STYLUS](http://stylus-lang.com) etc


CSS
```css
a {
  color: #0087cc;
}
a:hover {
  color: #0076b3;
}
```

SCSS
```scss
$link: #0087cc;

a {
    color: $link;
    &:hover {
      color: darken($link, 5%);
  }
}
```

