
import React, { useEffect, useRef } from 'react'
import { prism } from 'prism-animation'



const App = () => {

  let animation = useRef();

  useEffect(() => {
    animation.current = prism(".prism-test", {
      duration: 2000,
      easing: "easeOutCubic",
      width: 100,
      scale: 2,

      autoPlay: false,
    })

    prism(".prism-test2", {
      duration: 2000,
      easing: "easeOutCubic",
      width: "100%",
      delay: 1000
    })
  })


  const triggerAnimation = () => {
    animation.current.play();
  }

  const stopAnimation = () => {
    animation.current.stop();
  }

  const resetAnimation = () => {
    animation.current.reset();
  }

  const restartAnimation = () => {
    animation.current.restart();
  }

  return (
    <>
      <div className="app" style={{ padding: "50px" }}>
        <div className="prism-text" style={{ fontSize: "16px" }}>
          Prism Testing message
        </div>
        <div className="prism-test" style={{ width: "50px", height: "50px", backgroundColor: "#f22b1d" }}></div>
        <div className="prism-test2" style={{ width: "50px", height: "50px", backgroundColor: "#f22b1d" }}></div>

        <button onClick={triggerAnimation}>Animate</button>
        <button onClick={stopAnimation}>Stop Animation</button>
        <button onClick={resetAnimation}>Reset Animation</button>
        <button onClick={restartAnimation}>Restart Animation</button>
      </div>
    </>
  );
}

export default App
