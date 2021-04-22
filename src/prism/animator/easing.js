const parseEasing = (easing) => {

    if (typeof easing === 'function') return easing;

    //Default easing if undefined or not found
    const defaultEase = "inOutCubic";
    const defaultEaseFunction = easingFunctions[defaultEase];
    //Setting default easing

    //console.log("EASING FOUND: " + easing);

    let easeFunction = defaultEaseFunction;

    if (typeof easing === 'string') {
        const easefunc = easingFunctions[easing];
        //console.log("String found " + easefunc);
        easeFunction = easefunc ? easefunc : defaultEaseFunction;
    }

    if (typeof ease === 'array')
        easeFunction = easing.lenght() === 4 ? bezier(easing) : defaultEaseFunction

    return easeFunction;
}

const bezier = () => {

}

/*

CREDIT to author of these easinging funcation based of penners funcations by gre

Github to Funcations
https://gist.github.com/gre/1650294

*/

const easingFunctions = {
    linear: t => t,
    inQuad: t => t * t,
    outQuad: t => t * (2 - t),
    inOutQuad: t => t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    inCubic: t => t * t * t,
    outCubic: t => (--t) * t * t + 1,
    inOutCubic: t => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    inQuart: t => t * t * t * t,
    outQuart: t => 1 - (--t) * t * t * t,
    inOutQuart: t => t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t,
    inQuint: t => t * t * t * t * t,
    outQuint: t => 1 + (--t) * t * t * t * t,
    inOutQuint: t => t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t
}

export {
    parseEasing
}