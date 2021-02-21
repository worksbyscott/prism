
import sync, { cancelSync } from 'framesync';
import { defaultTransition } from './animator/defaultSettings'
import { generateAnimatables, progressAnimatable } from './animator/progressStep';

const prismSync = (update) => {
    const timeStamp = (delta) => update(delta);
    return {
        start: () => sync.update(timeStamp, true, true),
        stop: () => cancelSync.update(timeStamp)
    }
}

/**
 * Activates the prism animation core funcations
 *
 * @param {number} x The number to raise.
 * @param {number} x The number to raise.
 * @param {number} x The number to raise.
 * @param {number} x The number to raise.
 * @param {number} x The number to raise.
 * @param {number} x The number to raise.
 * @param {number} x The number to raise.
 * @param {number} x The number to raise.
 * @param {number} n The power, must be a natural number.
 * @return {number} x raised to the n-th power.
 */
const prism = ({
    target,                             //target: Called if the animation is canceled
    autoPlay = true,                    //autoPlay: Called if the animation is canceled
    duration = 1000,                    //duration: Called if the animation is canceled
    transition = defaultTransition,     //transition: Called if the animation is canceled
    onPlay,                             //onPlay: Called if the animation is canceled
    onComplete,                         //onComplete: Called if the animation is canceled
    onUpdate,                           //onUpdate: Called if the animation is canceled
    onStop,                             //onStop: Called if the animation is canceled                        //elasped: Called if the animation is canceled
    ...options
}) => {

    const engine = prismSync;
    const validatedEasing = (progress) => progress;

    let engineController;

    let isComplete = false;
    let isPlaying = false;
    let elasped = 0;
    let progress = 0;

    let easedProgressed = validatedEasing(progress);

    // Animatables are all elements with respecting aninmationOptions
    let animatables = generateAnimatables(target, transition, options);

    const play = () => {

        if (isComplete) return;

        isPlaying = true;
        onPlay && onPlay();


        console.log("Animatables:")
        console.log(animatables);
        engineController = engine(update);
        engineController.start();

    }

    const update = (frameData) => {
        elasped += frameData.delta;
        progress = elasped / duration;

        if (!isComplete) {
            if (elasped >= duration) {
                isComplete = true;
                complete();
                return;
            }
        }

        animatables.forEach(anim => {
            progressAnimatable(anim, progress)
        });

        onUpdate && onUpdate()
    }


    const complete = () => {
        isPlaying = false;
        engineController.stop();
        onComplete && onComplete();
    }

    const reset = () => {
        isPlaying = false;
        progress = 0;
        elasped = 0;
        isComplete = false;
    }

    const restart = () => {
        engineController.stop();
        reset();
        play();
    }

    autoPlay && play();

    return {
        stop: () => {
            onStop && onStop()
            engineController.stop()
        },
        play: () => play(),
        restart: () => restart(),
        to: () => { },
        from: () => { }
    }

}

export {
    prism
} 
