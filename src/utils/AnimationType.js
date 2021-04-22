
/**
 * No enums is Javascipt but this way works fine
 * maybe use typescript 
 */
const Type = {
    CSS: "css",
    TRANSFORM: "transform",
}

//Prevent it from being altered later
Object.freeze(Type)

export default Type;