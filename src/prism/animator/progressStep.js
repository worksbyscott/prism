import { validTransforms } from './defaultSettings';
import { getElements } from '../../utils/getElements';
import { interpolateColour, is } from '../colour/interpolator';
import { interpolate } from '../../utils/interpolator'

const generateAnimatables = (target, transition, options) => {
    return getElements(target).map((value, index) => {
        const animationTransitions = generateAnimationTransitions(value, options);
        return {
            element: value,
            id: index,
            transition: {
                ...transition,
                delay: index * transition.delay
            },
            transforms: getElementTransforms(value),
            animations: animationTransitions,
            progressStep: (progress) => progressAnimatable(this, progress)
        }
    });
}

const generateAnimationTransitions = (target, options) => {
    return Object.entries(options)
        .filter(([key, value]) => detectAnimationTransition(target, key))
        .map(([key, value]) => {
            const transitionType = detectTransitionType(target, key);
            const initValue = getInitialValue(target, key, transitionType);
            return {
                transition: key,
                transitionType: transitionType,
                transitionUnit: getUnit(value),
                initValue: initValue,
                finalValue: value
            }
        });
}

const detectAnimationTransition = (target, option) => detectTransitionType(target, option);

const detectTransitionType = (target, option) => {
    if (validTransforms.includes(option)) return 'transform';
    if (option in target.style) return "css";
    return false
}

const getInitialValue = (target, option, type) => {
    return type == "css" ? getCSSValue(target, option)
        : type == "transform" ? getTransformValue(target, option)
            : "0"
}

function stringToHyphens(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

const getCSSValue = (target, option) => {
    if (option in target.style) {
        let val = getComputedStyle(target).getPropertyValue(stringToHyphens(option)) || '0'
        if (!is.col(val)) val = getValueForCSS(val);
        return val;
    }
}

const progressTransform

const getTransformValue = (target, option) => {
    const defaultVal = option.includes('scale') ? 1 : 0 + "px"
    return 0;
}

function getElementTransforms(el) {
    const str = el.style.transform || '';
    const reg = /(\w+)\(([^)]*)\)/g;
    const transforms = new Map();
    let m; while (m = reg.exec(str)) transforms.set(m[1], m[2]);
    return transforms;
}

const getTransitionUnit = (transform) => {
    const perspective = String.includes("perspective")
    const skew = String.includes("skew")
    return
}

const getTransforms = (el) => {
    const str = el.style.transform || '';
    const reg = /(\w+)\(([^)]*)\)/g;
    const transforms = new Map();
    let m; while (m = reg.exec(str)) transforms.set(m[1], m[2]);
    return transforms;
}


const getUnit = (val) => {
    const split = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(val);
    return split && split[1];
}

const getValueForCSS = (val) => {
    const split = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(val);
    return split && split[0];
}

const progressAnimatable = (animatable, progress) => {
    const animationTransitions = animatable.animations;
    const element = animatable.element;
    const transition = animatable.transition;

    //Updating all transitations for animation
    animationTransitions.forEach((animation) => {

        //Short values for animation
        const initValue = animation.initValue
        const endValue = animation.finalValue
        const unit = animation.transitionUnit
        const transforms = animation.transforms;

        //CSS output string 
        let newValue = ""
        //Is the animation transistion an colour interpolation
        let isColour = is.col(initValue || endValue);

        //TODO: Possible to add object values?

        switch (animation.transitionType) {
            case "css": {

                // Interpolate start and end value depending on the values
                // Interpolate supports Numbers, HEX, HSL, RGBA, RGB 

                newValue = interpolate(initValue, endValue, progress);

                //Apply styles to the element for rAF on update
                element.style[animation.transition] = `${newValue}${!isColour ? unit : ""}`
            }
            case "transform": {

                // New Interpolated Value without Unit!
                newValue = interpolate(initValue, endValue, progress);

                // Output value of the transforms in single line string for transforms on CSS
                let str = '';

                //Updating transform in animatable transform map
                transforms.list.set(animation.transition, newValue);

                //Concatanating string for input to CSS
                transforms.list.forEach((value, prop) => { str += `${prop}(${value}) `; });

                //Applying affect
                t.style.transform = str;

            }
        }


    })


}

export {
    progressAnimatable,
    generateAnimatables,
    getTransforms
}