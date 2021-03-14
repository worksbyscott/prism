
import React, { useEffect, useRef } from 'react'
import { prism, PrismComponent } from 'prism-animation'



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
      fontSize: "50px",
      opacity: 1
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
        <div className="prism-test2">
          <h1>Hello World</h1>
        </div>

        <button onClick={triggerAnimation}>Animate</button>
        <button onClick={stopAnimation}>Stop Animation</button>
        <button onClick={resetAnimation}>Reset Animation</button>
        <button onClick={restartAnimation}>Restart Animation</button>

        <PrismComponent
          animation={{
            duration: 2000,
            easing: "easeOutCubic",
            fontSize: "50px",
            autoPlay: false,
            opacity: 1
          }}>
          <h1>Test</h1>
        </PrismComponent>
      </div>
    </>
  );
}

export default App
