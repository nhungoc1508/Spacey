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

    api.start(index => ({ opacity: flip[index] ? 0 : 1, height: flip[index] ? 0 : 100 }))

    return (
        springs.map((styles, i) => (
            <div>
                <div className="text-right w-100">
                    <animated.div style={styles}>
                        <h5 className="text-5xl">{props.cards[i].title}</h5>
                        <div className="py-5 text-sm text-sky-200">
                            <p>{props.cards[i].date}</p>
                            {props.cards[i].copyright ? <p>&copy; {props.cards[i].copyright}</p> : <span></span>}
                        </div>
                        <p className="text-base">{props.cards[i].explanation}</p>
                    </animated.div>
                </div>
            </div>
        ))
    )
}

export default Text;