
import React, { useEffect, useRef } from 'react'
import { prism, interpolateColour, convertPx, getElements, verifyValue } from 'prism-animation'
import 'prism-animation/dist/index.css'


const App = () => {

  let animation;

  useEffect(() => {
    animation = prism({
      target: ".prism-test",
      duration: 2000,
      backgroundColor: "#2a0aa1",
      rotate: "20deg",
      autoPlay: false,
    })
  })


  const triggerAnimation = () => {
    animation.play();
  }

  const stopAnimation = () => {
    animation.stop();
  }

  return (

    <div className="prism-test" style={{ width: "100%", backgroundColor: "#f22b1d" }}>
      <h1>Prism Testing message</h1>
      <button onClick={triggerAnimation}>Animate</button>
      <button onClick={stopAnimation}>Stop Animation</button>
    </div>
  );
}

export default App
