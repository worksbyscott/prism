import { is } from './interpolator'
import { stringToHyphens, stringContains } from './stringUtils'
import { validTransforms } from '../prism/animator/defaultSettings';
import Type from "../utils/AnimationType"

// Caching premade values
// GetComputedStyle can be performance heavy 
const cache = {
    CSS: {}
}


/**
 * 
 * Converts PX to any Unit accepted by Transform and CSS
 * 
 * Solution was found on stack overflow:
 * CREDIT: https://stackoverflow.com/questions/30272486/converting-percent-value-to-pixel-in-javascript-or-jquery
 * 
 * @param {*} el 
 * @param {*} value 
 * @param {*} unit 
 */
function convertPx(el, value, unit) {

    //Value of the initial value
    const valueUnit = getUnit(value);

    //Checking if the value is rotate or skrew 
    //Returning if unit also matches the final

    const preUnits = [unit, 'deg', 'rad', 'turn'];

    if (preUnits.some(a => a === valueUnit)) return value;

    //To prevent DOM thrashing if the calculation has already been done
    const cached = cache.CSS[value + unit];

    if (!(cached === undefined)) return cached;

    const baseline = 100;
    const tempEl = document.createElement(el.tagName);
    const parentEl = (el.parentNode && (el.parentNode !== document)) ? el.parentNode : document.body;

    parentEl.appendChild(tempEl);
    tempEl.style.position = 'absolute';
    tempEl.style.width = baseline + unit;

    const factor = baseline / tempEl.offsetWidth;
    const convertedUnit = factor * parseFloat(value);

    parentEl.removeChild(tempEl);

    cache.CSS[value + unit] = convertedUnit;
    return convertedUnit;
}

/**
 * 
 * Returns the initla css or transform value of an element preanimation
 * 
 * @param {*} target 
 * @param {*} option 
 * @param {*} type 
 */
const getInitialValue = (target, option, type) => {
    return type == Type.CSS ? getInitialCSSValue(target, option)
        : type == Type.TRANSFORM ? getInitialTransformValue(target, option)
            : "0"
}

/**
 * 
 * Returns the initial CSS value for an element pre-animation
 * 
 * @param {*} target 
 * @param {*} option 
 * @param {*} type 
 */
const getInitialCSSValue = (target, option) => {
    if (option in target.style)
        return target.style[option] || getComputedStyle(target).getPropertyValue(stringToHyphens(option)) || '0'
}

/**
 * 
 * Returns the initial transform value for an element pre-animation
 * 
 * @param {*} target 
 * @param {*} option 
 * @param {*} type 
 */
const getInitialTransformValue = (el, propName, transforms) => {
    const defaultUnit = getTransformUnit(propName);
    const defaultVal = stringContains(propName, 'scale') ? 1 : 0 + defaultUnit;
    const str = el.style.transform;
    if (!str) return defaultVal;
    let match = [];
    let props = [];
    let values = [];
    const rgx = /(\w+)\((.+?)\)/g;
    while (match = rgx.exec(str)) {
        props.push(match[1]);
        values.push(match[2]);
    }
    const value = values.filter((val, i) => props[i] === propName);
    return value.lenght ? value[0] : defaultVal;
}



/*

    Splits the value and Unit 
    If no split returns inital value
    
    30% -> %
    100px -> px
    100 -> undefined
    
*/
const getUnit = (val) => {
    const split = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(val);
    return split && split[1];
}

/*

    Checks for transition type:

    Only current valid transition type: CSS, Transforms
    Possible for JS values 

    translateX = transform
    color = CSS

*/

const detectTransitionType = (target, option) => {
    if (validTransforms.includes(option)) return Type.TRANSFORM;
    if (option in target.style) return Type.CSS;
}

/*

    Gets current value of a CSS attribute of an element
    defaults = 0

*/

const getCSSValue = (target, option) => {
    if (option in target.style) {
        let val = getComputedStyle(target).getPropertyValue(stringToHyphens(option)) || '0'
        return !is.col(val) ? getValue(val) : val;
    }
}

/*

    Funcation for getting the transform value for an element

    defaults = 0 (If no transform has been found)

*/

const getTransformValue = (target, option) => {

    const defaultTransformUnit = getTransformUnit(option);
    const defaultValue = stringContains(option, 'scale') ? 1 : 0 + defaultTransformUnit;
    const transforms = target.style.transform;

    if (!transform) return defaultValue;
}

/*

    Returns Map of tranforms applied to element on the DOM

*/
const getElementTransforms = (element) => {
    const str = element.style.transform || '';
    const reg = /(\w+)\(([^)]*)\)/g;
    const transforms = new Map();

    let m;

    while (m = reg.exec(str)) transforms.set(m[1], m[2]);

    return transforms;
}

/**
 *     
 * Quick funcation for getting the unit type for each transform type
 * Input: skew -> deg
 * Input: translateX -> px
 * Input: scale -> 
 * 
 * @param {Object || String} propName 
 */
function getTransformUnit(propName) {
    if (stringContains(propName, 'translate') || propName === 'perspective') return 'px';
    if (stringContains(propName, 'rotate') || stringContains(propName, 'skew')) return 'deg';
}

/**
 * Funcations for creating an map of Transforms
 * 
 * @param {*} el Element you want to get the transforms
 */
const getTransforms = (el) => {
    const str = el.style.transform || '';
    const reg = /(\w+)\(([^)]*)\)/g;
    const transforms = new Map();
    let m; while (m = reg.exec(str)) transforms.set(m[1], m[2]);
    return transforms;
}




/**
 * Removes all unit from the value
 * If Unitless returns value
 * 
 * @param {String} value 
 * @returns {String} Returns strings of value with Unit
 */
const verifyValue = (value) => {
    if (is.col(value)) return value;
    const unit = getUnit(value);
    const noUnit = unit ? value.substr(0, value.length - unit.length) : value;
    return noUnit;
}

export {
    getTransforms,
    verifyValue,
    getUnit,
    getCSSValue,
    getTransformUnit,
    getInitialValue,
    getElementTransforms,
    getTransformValue,
    detectTransitionType,
    convertPx
}