export const defaultTimestep = (1 / 60) * 1000

export const onNextFrame =
      typeof window !== "undefined"
            ? (callback) =>
                  window.requestAnimationFrame(callback)
            : (callback) =>
                  setTimeout(() => callback(performance.now()), defaultTimestep)