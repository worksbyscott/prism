
import { useIntersection } from '../../hooks/useIntersection';

export const prismComponent = ({ triggerOnScroll, ...props }) => {
    //Proxy div element ref for oberserver and prism
    const elementRef = useRef()

    /**
     * Prism needs to be initlized during useEffect
     * as element needs to be loaded to DOM
     */
    const prism = usePrism(elementRef.current, {
        duration: 2000,
        easing: "easeOutCubic",
        width: 100,
        scale: 2,
        autoPlay: false,
    });

    //Basic react hook to detect element intersection 
    const intersection = useIntersection(elementRef, {
        root: null,
        rootMargin: "0px",
        threshold: 10
    })


    if (intersection
        && triggerOnScroll
        && intersection.intersectionRatio < 0.2) {
        prism.play();
    }


    return (
        <div ref={elementRef} {...props}>
            {props.children}
        </div>
    )
}
