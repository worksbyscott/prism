
import { getElements } from '../../utils/getElements';
import { interpolate, is } from '../../utils/interpolator'

import { getUnit, detectTransitionType, getInitialValue, verifyValue, getTransforms, convertPx } from '../../utils/transforms'

/**
 * Generate the animatable from all options provided
 * 
 * @param {element} target Target element to animate
 * @param {Object} transistion Transistion object with easing
 * @param {Object} options Animation transition options
 * @returns {Object} Returns Animatble object to be iterated over
 */
const generateAnimatables = (target, transition, options) => {
    return getElements(target).map((value, index) => {
        const elementTransforms = getTransforms(value)

        const animationTransitions = generateAnimationTransitions(value, options, elementTransforms);
        return {
            element: value,
            id: index,
            transition: {
                ...transition,
                delay: index * transition.delay
            },
            transforms: elementTransforms,
            animations: animationTransitions,
            progressStep: (progress) => progressAnimatable(this, progress)
        }
    });
}

/**
 * Generate all option transition for the Animatable
 * 
 * @param {element} target Target element to animate
 * @param {Object} options Options objects
 * @param {Object} transforms Element transforms
 * @returns {Object} Returns animatable tranistion object
 */
const generateAnimationTransitions = (target, options, transforms) => {
    return Object.entries(options)
        .filter(([key, value]) => detectTransitionType(target, key))
        .map(([key, value]) => {

            //100px = px, 100% = % 
            //If the value has no unit get default unit for animation type
            //This accounts for all Transform values deg, rad, px

            // Getting option type = "CSS" || "transform"
            const transitionType = detectTransitionType(target, key);

            //CSS or Transform intial value
            let initValue = getInitialValue(target, key, transitionType, transforms);

            const finalValue = verifyValue(value)
            //Unit for the transition (Transform default to px)
            let unit = getUnit(value) || getUnit(initValue);

            initValue = verifyValue(unit ? convertPx(target, initValue, unit) : initValue)

            // Inital value if CSS/Transform (without unit

            return {
                transition: key,
                transitionType: transitionType,
                transitionUnit: unit,
                initValue: initValue,
                finalValue: finalValue
            }
        });
}

const progressAnimatable = (animatable, progress) => {
    const animationTransitions = animatable.animations;
    const element = animatable.element;
    const transition = animatable.transition;
    const transforms = animatable.transforms;

    //Updating all transitations for animation
    animationTransitions.forEach((animation) => {

        //Short values for animation
        const initValue = animation.initValue
        const endValue = animation.finalValue
        const unit = animation.transitionUnit

        //CSS output string 
        let newValue = ""
        //Is the animation transistion an colour interpolation
        let isColour = is.col(initValue || endValue);

        //TODO: Possible to add object values?

        switch (animation.transitionType) {
            case "css": {
                // Interpolate start and end value depending on the values
                // Interpolate supports Numbers, HEX, HSL, RGBA, RGB 

                newValue = interpolate(initValue, endValue, progress).toFixed(2);

                const newStr = `${newValue}${!isColour && unit ? unit : ""}`;
                //Apply styles to the element for rAF on update
                element.style[animation.transition] = newStr

                return;
            }
            case "transform": {
                // New Interpolated Value without Unit!
                newValue = interpolate(initValue, endValue, progress).toFixed(2);

                // Output value of the transforms in single line string for transforms on CSS
                let str = '';


                transforms.set(animation.transition, newValue + (unit ? unit : 0));


                transforms.forEach((value, key) => {
                    str += `${key}(${value}) `;
                });

                //Applying affect
                element.style.transform = str;
            }
        }


    })


}

export {
    progressAnimatable,
    generateAnimatables,
    getTransforms
}