import { validTransforms } from './defaultSettings';
import { getElements } from '../../utils/getElements';
import { interpolateColour, is } from '../colour/interpolator';

const generateAnimatables = (target, transition, options) => {
    return getElements(target).map((value, index) => {
        const animationTransitions = generateAnimationTransitions(value, options);
        return {
            element: value,
            id: index,
            transition: {
                delay: index * transition.delay,
                ...transition
            },
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
                transitionUnit: getUnit(target),
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

const getCSSValue = (target, option) => {
    if (option in target.style) return getComputedStyle(target).getPropertyValue(option) || '0'
}

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
    return String.includes()
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

const progressAnimatable = (animatable, progress) => {
    const animationTransitions = animatable.animations;
    const element = animatable.element;
    const transition = animatable.transition;

    animationTransitions.forEach((transform) => {

        const newValue = ""
        const initValue = transform.initValue
        const endValue = transform.endValue
        const unit = transform.transitionUnit

        let isColour = false

        if (transform.type === "css") {
            if (is.col(transform.initValue)) {
                isColour = true;
                newValue = interpolateColour(initValue, endValue, progress)
            } else {
                newValue = (initValue + endValue) * progress
            }
            element.style[transform.transition] = `${newValue}${!isColour ?? unit}`
            return;
        }
        if (transform.type == "transform") {
            newValue = (initValue + endValue) * progress;
            element.style
        }
    })


}

export {
    generateAnimatables,
    getTransforms
}