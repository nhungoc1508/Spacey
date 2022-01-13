import React from 'react';
import { useSpring, animated } from 'react-spring'

const LoopingCard = () => {

    /**
    * Define the style for the animation
    * using the useSpring hook
    */
    const styles = useSpring({
        loop: true,
        from: { rotateZ: 0 },
        to: { rotateZ: 360 },
        duration: 2000,
    });

    /**
    * Animated div is the extended version of div that
    * accepts the properties defined above.
    */
    return (<animated.div
        style={{
            width: 80,
            height: 80,
            backgroundColor: 'd6d6d6',
            borderRadius: 16,
            boxShadow: 'rgb(0,0,0,0.44) 0px 5px 5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'green',
            margin: 250,
            ...styles,
        }} >GFG</animated.div>
    );
}

export default LoopingCard;
