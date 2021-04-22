

/**
 * 
 * Prism Animation Engine 
 *
 *  
 */
let maxElapsed = 40;
let useDefaultElapsed = true;
let runNextFrame = false;
let isProcessing = false;

const defaultTimestep = (1 / 60) * 1000;

/**
 * Frame data passed to prism funcation
 * Delta = Time since last frame
 * Timestap current frame in system time
 */
let frame = {
    delta: 0,
    timestamp: 0,
}

/**
 * Render stages 
 * Stages for methods for update and write 
 * Prevents layout problems
 */
const renderStages = [
    "read",
    "update"
];

const stages = renderStages.reduce((accumulator, key) => {
    accumulator[key] = render(() => (runNextFrame = true))
    return accumulator
}, {});

/**
 * Core engine funcation 
 */
const engine = renderStages.reduce((accumulator, key) => {
    const step = stages[key]

    //DEFAULT KEEPALIVE LAGGGING OUT ALL THE TIME...
    accumulator[key] = (process, keepAlive = false, immediate = false) => {
        if (!runNextFrame) startLoop()
        return step.schedule(process, keepAlive, immediate)
    }
    return accumulator
}, {});

/**
 * Removes from buffer stage
 */
const stopEngine = renderStages.reduce((accumulator, key) => {
    accumulator[key] = stages[key].cancel
    return accumulator
}, {});

const processStep = (stepId) => stages[stepId].process(frame)

/**
 * Process render stage
 * 
 * Calls each stages read and update
 */
const processFrame = (timestamp) => {

    runNextFrame = false;

    frame.delta = useDefaultElapsed
        ? defaultTimestep
        : Math.max(Math.min(timestamp - frame.timestamp, maxElapsed), 1)

    frame.timestamp = timestamp
    isProcessing = true
    renderStages.forEach(processStep)
    isProcessing = false

    if (runNextFrame) {
        useDefaultElapsed = false;
        requestBrowserAnimation(processFrame);
    }

}


/**
 * Start the engine
 */
const startLoop = () => {
    runNextFrame = true
    useDefaultElapsed = true
    if (!isProcessing)
        requestBrowserAnimation(processFrame)
}



const getFrameData = () => frame

/**
 * All raF calls are handled on the next frame
 * Pauses if the window is tabed out so the delta should not be affected 
 */
const requestBrowserAnimation =
    typeof window !== "undefined"
        ? (callback) => window.requestAnimationFrame(callback)
        : (callback) => setTimeout(() => callback(performance.now()), defaultTimestep)


function render(updateFrame) {

    //Updates to run this frame
    //Remove from to run when canceling the process
    let toRun = []

    //Updates to run next frame
    let toRunNextFrame = []
    let numToRun = 0


    //Boolean is the DOM being updated
    //PREVENT READ AND WRITE ERRORS
    let isProcessing = false
    let toKeepAlive = new WeakSet()

    let engineStep = {

        /**
         * Add callback to the engine 
         * Once added the stage this process will run until it is removed
         * 
         * TODO: 
         * KeepAlive should be changed and mandatory might be to performance heavy?
         *  */
        schedule: (
            callback,
            keepAlive = false,
            immediate = false
        ) => {
            const addToCurrentFrame = immediate && isProcessing;
            const idialFrame = addToCurrentFrame ? toRun : toRunNextFrame;

            if (keepAlive) toKeepAlive.add(callback)

            if (idialFrame.indexOf(callback) === -1) {

                idialFrame.push(callback)

                if (addToCurrentFrame && isProcessing) numToRun = toRun.length
            }

            return callback
        },

        cancel: (callback) => {

            const index = toRunNextFrame.indexOf(callback)

            if (index !== -1) toRunNextFrame.splice(index, 1)

            toKeepAlive.delete(callback)

        },


        process: (frameData) => {

            isProcessing = true;

            /**
             * Swap the previos process with the next one
             * Remove from the array if canceled...
             *  */
            [toRun, toRunNextFrame] = [toRunNextFrame, toRun]
            // Clear the next frame list
            toRunNextFrame.length = 0

            // Execute this frame
            numToRun = toRun.length

            if (numToRun) {
                for (let i = 0; i < numToRun; i++) {

                    const callback = toRun[i]

                    callback(frameData)

                    if (toKeepAlive.has(callback)) {
                        engineStep.schedule(callback)
                        updateFrame()
                    }
                }
            }
            isProcessing = false
        }


    }
    return engineStep
}


export { getFrameData, stopEngine }
export default engine
