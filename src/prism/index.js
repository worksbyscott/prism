
import sync, { cancelSync } from '../engine';
import { defaultTransition } from './animator/defaultSettings'
import { generateAnimatables, progressAnimatable } from './animator/progressStep';
import { parseEasing } from './animator/easing'

/**
 * Link to the framesync updater engine 
 * 
 * @param {void} update Target element to animate
 */
const prismSync = (update) => {
    const timeStamp = (delta) => update(delta);
    return {
        start: () => sync.update(timeStamp, true, true),
        stop: () => cancelSync.update(timeStamp)
    }
}

/**
 * Prism is the core funcation for triggering animations
 * 
 *
 * @param {String || element} target Target element to animate
 * @param {boolean} autoPlay Boolean if animation should start on call
 * @param {number} duration Duration of the animation in seconds
 * @param {Object} transition Easing and Delay of the animation
 * @param {void} onPlay callback funcation when animation is played (Start or Restart)
 * @param {void} onComplete callback when animation is complete
 * @param {void} onStop callback when animation is stoped
 * @param {void} onUpdate callback funcation called on each frame update
 * @param {objects} options... all modified CSS and Transforms to animate
 */
const prism = (
    target, {                           //target: Called if the animation is canceled
        autoPlay = true,                    //autoPlay: Called if the animation is canceled
        duration = 1000,                    //duration: Called if the animation is canceled
        transition = defaultTransition,     //transition: Called if the animation is canceled
        delay = 0,
        easing,
        onPlay,                             //onPlay: Called if the animation is canceled
        onComplete,                         //onComplete: Called if the animation is canceled
        onUpdate,                           //onUpdate: Called if the animation is canceled
        onStop,                             //onStop: Called if the animation is canceled                        //elasped: Called if the animation is canceled
        ...options
    }) => {

    const engine = prismSync
    const parsedEasing = parseEasing(easing)

    let engineController

    let isComplete = false
    let isPlaying = false
    let elasped = 0
    let progress = 0

    // Animatables are all elements with respecting aninmationOptions
    let animatables = generateAnimatables(target, transition, options)


    const play = () => {
        if (isComplete || isPlaying) return

        isPlaying = true;
        onPlay && onPlay()

        //Start request Loop 
        engineController = engine(update)
        engineController.start()

        updateAnimatables()
    }

    //Called on each frame update
    const update = (frameData) => {
        elasped += frameData.delta

        if (elasped < delay) return; //Stop updating if the delay peroid hasn't passed
        progress = (elasped - delay) / duration

        if (progress >= 1) {
            isComplete = true
            complete()
            return
        }

        updateAnimatables()

        onUpdate && onUpdate({ elasped, progress })
    }

    const updateAnimatables = () => {
        animatables.forEach(anim => progressAnimatable(anim, parsedEasing(progress)));
    }

    const stop = () => {
        isPlaying = false;
        engineController && engineController.stop()
    }

    const complete = () => {
        isPlaying = false
        engineController.stop()
        onComplete && onComplete()
        updateAnimatables()
    }

    const reset = () => {
        isPlaying = false
        progress = 0
        elasped = 0
        isComplete = false
        updateAnimatables()
    }

    const restart = () => {
        stop()
        reset()
        play()
    }

    autoPlay && play();

    return {
        info: {
            elasped: elasped,
            progress: progress,
            isComplete: isComplete,
            isPlaying: isPlaying,
            elasped: elasped
        },
        stop: () => stop(),
        reset: () => reset(),
        play: () => play(),
        restart: () => restart()
    }

}

export {
    prism
}
