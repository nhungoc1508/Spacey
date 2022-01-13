import React, { useEffect } from 'react'
import { useSpring, animated } from 'react-spring'

const TextNew = (props) => {
    // let flip = props.flip
    const styles = useSpring({
        config: { duration: 500 },
        from: { opacity: 0 },
        to: { opacity: 1 },
        enter: { opacity: 1 },
        leave: { opacity: 0 }
    })

    useEffect(() => {
        console.log("Inside useEffect")
    })

    return (
        <div className="text-6xl text-right w-100 pt-5 pb-0">
            <animated.div style={styles}>{props.card.title}</animated.div>
        </div>
    )
}

export default TextNew;