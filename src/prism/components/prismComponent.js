
import useIntersection from '../../hooks/useIntersection';
import { prism } from '../index'
import React, { useRef, useEffect } from 'react'

export const PrismComponent = ({
    triggerOnScroll,
    animation,
    ...props 
}) => {
    //Proxy div element ref for oberserver and prism
    const elementRef = useRef(null)

    /**
     * Prism needs to be initlized during useEffect
     * as element needs to be loaded to DOM
     */
    let prismRef = useRef(null)

    //Basic react hook to detect element intersection 
    const intersection = useIntersection(elementRef, {
        root: null,
        rootMargin: "0px",
        threshold: 0.2
    });

    //Add the animation once the component is mounted
    useEffect(() => {
        prismRef.current = prism(elementRef.current, { ...animation, autoPlay: (triggerOnScroll ? false : true) })
    }, [elementRef])


    //Implement triggerOnScroll 
    if (triggerOnScroll && intersection && intersection.intersectionRatio > 0.2) {
        console.log("Shoudl play animation");
        prismRef.current.play();
    }

    return (
        <div ref={elementRef} {...props}>
            {props.children}
        </div>
    )
}
