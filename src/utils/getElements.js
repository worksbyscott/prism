export const getElements = (target) => {
    if (Array.isArray(target)) return target;
    if (!target || target.nodeType) return [target];
    return Array.from(typeof target == "string" ? document.querySelectorAll(target) : target)
}