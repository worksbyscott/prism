const defaultTimestep = (1 / 60) * 1000;

const onNextFrame =
    typeof window !== "undefined"
        ? (callback) => window.requestAnimationFrame(callback)
        : (callback) => setTimeout(() => callback(performance.now()), defaultTimestep)

export {
    defaultTimestep,
    onNextFrame
}
