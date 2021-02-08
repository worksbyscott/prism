
import React, { useEffect } from 'react'
import { prism, getTransforms } from 'prism-animation'
import 'prism-animation/dist/index.css'


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
    <div className="prism-test" style={{ transform: 'translateX(100px) ' }}>
      <h1>Prism Testing message</h1>
    </div>
  );
}

export default App
