
import React, { useEffect, useRef } from 'react'
import { prism, interpolateColour, convertPx, getElements, verifyValue } from 'prism-animation'
import 'prism-animation/dist/index.css'


const App = () => {

  let animation;

  useEffect(() => {
    animation = prism({
      target: ".prism-test",
      duration: 6000,
      backgroundColor: "#2a0aa1",
      translateX: '800px',
      scale: 2,
      rotate: "400deg",
      autoPlay: false,
      onUpdate: ({ elasped, progress }) => {
        getElements(".prism-text").forEach(element => {
          element.innerHTML = `Progress: ${Math.round(progress * 100)}%, Elapsed: ${Math.round(elasped)}ms`
        });
      }
    }, [])
  })


  const triggerAnimation = () => {
    animation.play();
  }

  const stopAnimation = () => {
    animation.stop();
  }

  const resetAnimation = () => {
    animation.reset();
  }

  const restartAnimation = () => {
    animation.restart();
  }

  return (

    <>
      <div className="app" style={{ padding: "50px" }}>
        <div className="prism-text" style={{ fontSize: "16px" }}>
          Prism Testing message
        </div>
        <div className="prism-test" style={{ width: "50px", height: "50px", backgroundColor: "#f22b1d" }}></div>
        <button onClick={triggerAnimation}>Animate</button>
        <button onClick={stopAnimation}>Stop Animation</button>
        <button onClick={resetAnimation}>Reset Animation</button>
        <button onClick={restartAnimation}>Restart Animation</button>
      </div>
    </>
  );
}

export default App
