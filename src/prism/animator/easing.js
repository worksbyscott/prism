const parseEasing = (easing) => {

    if (typeof easing === 'function') return easing;

    //Default easing if undefined or not found
    const defaultEase = "easeInQuad";
    const defaultEaseFunction = easingFunctions[defaultEase];
    //Setting default easing

    let easeFunction = defaultEaseFunction;

    if (typeof easing === 'string') {
        const easing = easeFunction[easing];
        easeFunction = easing ? easing : defaultEaseFunction;
    }

    if (typeof ease === 'array') {
        easeFunction = easing.lenght() === 4 ? bezier(easing) : defaultEaseFunction
    }

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
    easeInQuad: t => t * t,
    easeOutQuad: t => t * (2 - t),
    easeInOutQuad: t => t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    easeInCubic: t => t * t * t,
    easeOutCubic: t => (--t) * t * t + 1,
    easeInOutCubic: t => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    easeInQuart: t => t * t * t * t,
    easeOutQuart: t => 1 - (--t) * t * t * t,
    easeInOutQuart: t => t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t,
    easeInQuint: t => t * t * t * t * t,
    easeOutQuint: t => 1 + (--t) * t * t * t * t,
    easeInOutQuint: t => t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t
}