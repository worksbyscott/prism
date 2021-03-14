# Prism Animation Library - React 

> Prism is an lightweight (Under 20kb) yet powerful Javascript library created for React To allow developers to produce tween animations on elements with any CSS and transform value.  

[![NPM](https://img.shields.io/npm/v/prism-animation.svg)](https://www.npmjs.com/package/prism-animation) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

### Docs

Check out [documentation](https://prism.worksbyscott.uk) for guides and a full API reference.

This project is open source and licensed under the MIT license. Check out the project on [github](https://github.com/worksbyscott/prism-animation)

## Install & Usage

```bash
npm install --save prism-animation
```

One function thats it. Simple isn’t it

```js

prism(“.prism-test”, {
    translateX: 1000
    duration: 2000
})

```

## Supported Props

Prism supports animation of all CSS attributes, transforms and colours.

```js

prism(“.prism-test”, {
    translateX: 1000
    duration: 2000
})

```

## React implementation 

Prism also takes advantage of reacts use of JXS to provide an 
PrismComponent and inline Component version of the Prism
Function. 

This component creates an div element to incase all the child elements
You wish to animate. This Component can also pass all default HTMLElement
Props like onClick, Styles, className.


```jsx

    <PrismComponent
    animation={{
      duration: 2000,
      easing: “easeOutCubic”,
      fontSize: “50px”,
      opacity: 1
    }}>
    <h1>Hello World</h1>
  </PrismComponent>

```

For all API references check out our documentation. 

## License

MIT © [worksbyscott](https://github.com/worksbyscott)

Made by [Worksbyscott](https://worksbyscott.uk)
