
import React, { useEffect, useRef } from 'react'
import { prism, interpolateColour } from 'prism-animation'
import 'prism-animation/dist/index.css'


const App = () => {

  let animation;

  useEffect(() => {
    animation = prism({
      target: ".prism-test",
      duration: 7000,
      onPlay: () => console.log("testing message on example"),
      color: "#f2af1d",
      autoPlay: false
    })
  })


  const triggerAnimation = () => {
    animation.play();
  }

  const stopAnimation = () => {
    animation.stop();
  }

  return (
    <div className="prism-test" style={{ color: "#f22b1d" }}>
      <h1>Prism Testing message</h1>
      <button onClick={triggerAnimation}>Animate</button>
      <button onClick={stopAnimation}>Stop Animation</button>
    </div>
  );
}

export default App
