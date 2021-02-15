
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
    let engineController;

    let isComplete = false;
    let isPlaying = false;
    let elasped = 0;
    let progress = 0;

    const modifiedProgress;

    // Animatables are all elements with respecting aninmationOptions
    let animatables = generateAnimatables(target, transition, options);

    const play = () => {
        isPlaying = true;
        onPlay && onPlay();

        engineController = engine(update);
        engineController.start();

        console.log("Animatables:")
        console.log(animatables);
    }

    const update = (frameData) => {
        elasped += frameData.delta;
        progress = elasped / duration;

        if (!isComplete) {
            if (elasped > duration) {
                isComplete = true;
                complete();
            }
        }

        animatables.forEach(anim => {
            console.log("Updating step for: ")
            console.log(anim);
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
