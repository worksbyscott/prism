
import React, { useEffect, useRef } from 'react'
import { prism } from 'prism-animation'



const App = () => {
  let animation;

  useEffect(() => {
      prism({
        target: ".prism-test",
        duration: 4000,
        easing: "easeOutCubic",
        autoPlay: false,
      })
  })

  const animator = prism({
    target: ".prism-test",
    duration: 4000,
    translateX: "1000px",
    autoPlay: false,
    onUpdate: () => {},      //Every frame of the animation 60fps
    onPlay: () => {},       //On animation start
    onStop: () => {},       //When .stop is called
    onComplete: () => {},   //When the animation completes
  })

  animator.play();

  animator.stop();

  animator.reset();

  animator.restart();

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
