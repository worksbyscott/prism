const defaultTransition = {
    ease: [0.3, 0.4, 1.4],
    delay: 0,
    duration: 1000,
    staggerChildren: 0,
}

const validTransforms = [
    'translateX',
    'translateY',
    'translateZ',
    'scale',
    'scaleX',
    'scaleY',
    'scaleX',
    'rotate',
    'rotateX',
    'rotateZ',
    'rotateY',
    'skew',
    'skewX',
    'skewY',
];

export {
    defaultTransition,
    validTransforms
}