
import useIntersection from '../../hooks/useIntersection';
import { prism } from '../index'
import React, { useRef, useEffect } from 'react'

//Intersection Trigger Settings
//Can be changed in PrismComponent

//ADD TO PRISM DOCUMENTATION!!!!
const defaultTriggerSettings = {
    threshold: 0.2,
    root: null,
    rootMargin: "0px"
}

export const PrismComponent = ({
    triggerOnScroll,
    triggerSettings,
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
    //Merge the default setting with additional settings
    const intersection = useIntersection(elementRef, { defaultTriggerSettings, ...triggerSettings });

    //Add the animation once the component is mounted
    useEffect(() => {
        prismRef.current = prism(elementRef.current, { ...animation, autoPlay: (triggerOnScroll ? false : true) })
    }, [elementRef])


    //Implement triggerOnScroll 
    if (triggerOnScroll && intersection && intersection.intersectionRatio > 0.2) {
        prismRef.current.play();
    }

    return (
        <div ref={elementRef} {...props}>
            {props.children}
        </div>
    )
}
