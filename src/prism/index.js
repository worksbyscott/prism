
import sync, { cancelSync } from 'framesync';
import { defaultTransition } from './animator/defaultSettings'
import { generateAnimatables } from './animator/progressStep';

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



        onUpdate && onUpdate()
    }


    const complete = () => {
        isPlaying = false;
        engineController.stop();
        onComplete && onComplete();
    }

    autoPlay && play();

    return {
        stop: () => onStop ?? (onStop() || engineController.stop()),
        play: () => isPlaying ? play() : console.error("Engine is already playing..."),
        to: () => { },
        from: () => { }
    }

}

export {
    prism
} 
