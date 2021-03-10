import { createRenderStep } from './frames/preFrame'
import { onNextFrame, defaultTimestep } from './frames/nextFrame'

let maxElapsed = 40;
let useDefaultElapsed = true;
let runNextFrame = false;
let isProcessing = false;

let frame = {
    delta: 0,
    timestamp: 0,
}

const renderStages = [
    "read",
    "update",
    "render",
];

const stages = renderStages.reduce((accumulator, key) => {
    accumulator[key] = createRenderStep(() => (runNextFrame = true))
    return accumulator
}, {});

const sync = renderStages.reduce((accumulator, key) => {
    const step = stages[key]
    accumulator[key] = (process, keepAlive = false, immediate = false) => {
        if (!runNextFrame) startLoop()
        return step.schedule(process, keepAlive, immediate)
    }
    return accumulator
}, {});


const cancelSync = renderStages.reduce((accumulator, key) => {
    accumulator[key] = stages[key].cancel
    return accumulator
}, {});

const processStep = (stepId) => stages[stepId].process(frame)

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
        onNextFrame(processFrame);
    }

}

const startLoop = () => {
    runNextFrame = true
    useDefaultElapsed = true
    if (!isProcessing)
        onNextFrame(processFrame)
}

const getFrameData = () => frame

export { getFrameData, cancelSync }
export default sync
