# prism-animation

> Javascript animation library with React support

[![NPM](https://img.shields.io/npm/v/prism-animation.svg)](https://www.npmjs.com/package/prism-animation) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save prism-animation
```

## Usage

```jsx
import React, { useEffect, Component } from 'react'

import { prism } from 'prism-animation'

const App = () => {

  useEffect(() => {
    prism({
      target: ".prism-test",
      duration: 15000,
      onPlay: () => console.log("testing message on example"),
      translateX: 1000,
    })

  })

  return (
    <div className="prism-test">
      <h1>Prism Testing message</h1>
    </div>
  );
}

const 
```

## License

MIT © [worksbyscott](https://github.com/worksbyscott)
