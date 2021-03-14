import { useEffect, useRef } from 'react'
import { prism } from '../index'

const usePrism = (element, ...props) => {
    const prismAnimator = useRef();
    useEffect(() => {
        prismAnimator.current = prism(element, { ...props });
    })
    return prismAnimator.current;
}

export default usePrism