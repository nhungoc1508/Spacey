// import React, { useState } from 'react'
// import { useSpring, animated, config } from 'react-spring'

// const Text = (props) => {
//     // const [flip, toggle] = useState(false)
//     const styles = useSpring({
//         to: { opacity: 1 },
//         from: { opacity: 0 },
//         reverse: props.flip
//     })
//     return (
//         <div>
//             <animated.div style={styles} > I will fade in</animated.div >
//             {/* <button onClick={() => toggle(!flip)}>Change</button> */}
//         </div>
//     )
// }

// export default Text;

import { useSprings, animated, config } from 'react-spring'

const Text = (props) => {
    const flip = Array(props.number).fill(true)
    flip[props.flip] = !flip[props.flip]
    const [springs, api] = useSprings(props.number, index => ({
        config: config.slow,
        to: { opacity: flip[index] ? 0 : 1, height: flip[index] ? 0 : 100 },
        from: { opacity: flip[index] ? 1 : 0, height: flip[index] ? 100 : 0 },
        immediate: flip[index]
    }))

    // Update springs with new props
    api.start(index => ({ opacity: flip[index] ? 0 : 1, height: flip[index] ? 0 : 100 }))
    // // Stop all springs
    // api.stop()

    return (
        springs.map((styles, i) => (
            <div>
                <div className="text-right w-100">
                    <animated.div style={styles}>
                        <div className="text-5xl">{props.cards[i].title}</div>
                        <div className="py-5 text-cs text-sky-200">
                            <div>Date: {props.cards[i].date}</div>
                            {props.cards[i].copyright ? <div>&copy; {props.cards[i].copyright}</div> : <span></span>}
                        </div>
                        <div className="text-sm">{props.cards[i].explanation}</div>
                    </animated.div>
                </div>
                {/* <div className="text-cs text-right text-gray-300">
                    <animated.div style={styles}>Date: {props.cards[i].date}</animated.div>
                </div> */}
                {/* <div className="text-sm text-right w-100">
                    <animated.div style={styles}>{props.cards[i].explanation}</animated.div>
                </div> */}
                {/* <div className="text-sm text-right w-100 pt-0 pb-5">
                    <animated.div style={{...styles, position: "absolute"}}>{props.cards[i].explanation}</animated.div>
                </div> */}
            </div>
        ))
    )
}

export default Text;