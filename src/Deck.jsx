import React, { useState } from 'react'
import { useSprings, animated, to as interpolate } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'

import styles from './styles.module.css'

const tarotCards = [
    'https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/3/3a/TheLovers.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/RWS_Tarot_02_High_Priestess.jpg/690px-RWS_Tarot_02_High_Priestess.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg',
]
const spaceCards = [
    "https://apod.nasa.gov/apod/image/distant_hst.gif",
    "https://www.youtube.com/embed/uHhQrplIm8g?rel=0",
    "https://apod.nasa.gov/apod/image/1902/EtaCarinae_HubbleSchmidt_960.jpg",
    "https://apod.nasa.gov/apod/image/2110/Bat6995_Trottier_960.jpg",
    "https://apod.nasa.gov/apod/image/skylab.gif"
]

const spaceData = [
    {
        copyright: "Miloslav Druckmüller",
        date: "2015-03-31",
        explanation: "During a total solar eclipse, the Sun's extensive outer atmosphere, or corona, is an inspirational sight. Streamers and shimmering features that engage the eye span a brightness range of over 10,000 to 1, making them notoriously difficult to capture in a single photograph. But this composite of 29 telescopic images covers a wide range of exposure times to reveal the crown of the Sun in all its glory. The aligned and stacked digital frames were recorded in the cold, clear skies above the Arctic archipelago of Svalbard, Norway during the Sun's total eclipse on March 20 and also show solar prominences extending just beyond the edge of the solar disk. Remarkably, even small details on the dark night side of the New Moon can be made out, illuminated by sunlight reflected from a Full Earth. Of course, fortunes will be reversed on April 4 as a Full Moon plunges into the shadow of a New Earth, during a total lunar eclipse.",
        hdurl: "https://apod.nasa.gov/apod/image/1503/Tse_2015_Svalbard_800mm_Nikon_D810-small.png",
        media_type: "image",
        service_version: "v1",
        title: "Corona from Svalbard",
        url: "https://apod.nasa.gov/apod/image/1503/Tse_2015_Svalbard_800mm_Nikon_D810-small.jpg"
    },
    {
        copyright: "H�kan HammarVemdalen Ski ResortSkiStar",
        date: "2018-01-01",
        explanation: "What's happened to the Sun?  Sometimes it looks like the Sun is being viewed through a giant  lens.  In the featured video, however, there are actually millions of tiny lenses: ice crystals.  Water may freeze in the  atmosphere into small, flat, six-sided, ice crystals.  As these crystals flutter to the ground, much time is spent with their faces flat and parallel to the ground.  An observer may find themselves in the same plane as many of the falling ice crystals near sunrise or sunset.  During this alignment, each crystal can act like a miniature lens, refracting sunlight into our view and creating phenomena like parhelia, the technical term for sundogs.  The featured video was taken a month ago on the side of a ski hill at the Vemdalen Ski Resort in central  Sweden. Visible in the center is the most direct image of the Sun, while two bright sundogs glow prominently from both the left and the right.  Also visible is the bright 22 degree halo -- as well as the rarer and much fainter 46 degree halo -- also created by sunlight refracting through atmospheric ice crystals.",
        media_type: "video",
        service_version: "v1",
        title: "Sun Halo over Sweden",
        url: "https://www.youtube.com/embed/6c0wTtq4xDM?rel=0"
    },
    {
        copyright: "Roberto Colombari",
        date: "2016-02-28",
        explanation: "Stars are forming in the Soul of the Queen of Aethopia. More specifically, a large star forming region called the Soul Nebula can be found in the direction of the constellation Cassiopeia, who Greek mythology credits as the vain wife of a King who long ago ruled lands surrounding the upper Nile river. The Soul Nebula houses several open clusters of stars, a large radio source known as W5, and huge evacuated bubbles formed by the winds of young massive stars. Located about 6,500 light years away, the Soul Nebula spans about 100 light years and is usually imaged next to its celestial neighbor the Heart Nebula (IC 1805). The featured image appears mostly red due to the emission of a specific color of light emitted by excited hydrogen gas.   Follow APOD on: Facebook,  Google Plus,  Twitter, or Instagram",
        hdurl: "https://apod.nasa.gov/apod/image/1602/Soul_Colombari_1824.jpg",
        media_type: "image",
        service_version: "v1",
        title: "IC 1848: The Soul Nebula",
        url: "https://apod.nasa.gov/apod/image/1602/Soul_Colombari_960.jpg"
    },
    {
        copyright: "Dave Lane Rollover Annotation: Judy Schmidt",
        date: "2019-02-03",
        explanation: "Why would the sky look like a giant fan? Airglow. The featured intermittent green glow appeared to rise from a lake through the arch of our Milky Way Galaxy, as captured during 2015 next to Bryce Canyon in Utah, USA.  The unusual pattern was created by atmospheric gravity waves, ripples of alternating air pressure that can grow with height as the air thins, in this case about 90 kilometers up.  Unlike auroras powered by collisions with energetic charged particles and seen at high latitudes, airglow is due to chemiluminescence, the production of light in a chemical reaction.  More typically seen near the horizon, airglow keeps the night sky from ever being completely dark.   Follow APOD on: Instagram, Facebook,  Reddit, or Twitter",
        hdurl: "https://apod.nasa.gov/apod/image/1601/AirglowFan_Lane_2400.jpg",
        media_type: "image",
        service_version: "v1",
        title: "An Airglow Fan from Lake to Sky",
        url: "https://apod.nasa.gov/apod/image/1601/AirglowFan_Lane_960.jpg"
    },
    {
        date: "1997-08-23",
        explanation: "Stars sometimes form in colorful ways.  Pictured above is a small region in the nearby LMC galaxy where stars are forming. After a star is born, it may do several things to energize its immediate neighborhood. It may develop a strong wind which pushes away nearby gas; it may be so hot and intense that emitted light boils away nearby dust and gas, and it may be so massive that it soon goes supernova and catapults its elements back to the interstellar medium. Astronomers study regions like this - named DEM192 - to better understand how these and other processes proceed. This picture is a composite of three separate photographs, each sensitive to only one specific color of light - a color that distinguishes a specific chemical element.",
        hdurl: "https://apod.nasa.gov/apod/image/dem192_umich_big.jpg",
        media_type: "image",
        service_version: "v1",
        title: "A Star Forming Region in the LMC",
        url: "https://apod.nasa.gov/apod/image/dem192_umich.gif"
    }
]

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = (i) => ({
    x: 0,
    y: i * -4,
    scale: 1,
    rot: -10 + Math.random() * 20,
    delay: i * 100,
})
const from = (_i) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r, s) =>
    `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`

const Deck = (myProps) => {
    const cards = myProps.cards
    // const cards = spaceData
    const [gone] = useState(() => new Set()) // The set flags all the cards that are flicked out
    const [props, api] = useSprings(cards.length, i => ({
        ...to(i),
        from: from(i),
    })) // Create a bunch of springs using the helpers above
    const title = gone.size == 0 ? cards[cards.length - 1].title : myProps.cardTitle
    const explanation = gone.size == 0 ? cards[cards.length - 1].explanation : myProps.explanation

    // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
    const bind = useDrag(({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
        const trigger = velocity[0] > 0.1 || velocity[1] > 0.1 // If you flick hard enough it should trigger the card to fly out
        const dir = xDir < 0 ? -1 : 1 // Direction should either point left or right
        if (!down && trigger) {
            gone.add(index)
            // myProps.handleNewCard(cards[index > 0 ? index - 1 : cards.length - 1].title)
            // myProps.handleNewCard(index > 0 ? index - 1 : cards.length - 1)
            myProps.minusOne()
        } // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
        api.start(i => {
            if (index !== i) return // We're only interested in changing spring-data for the current spring
            const isGone = gone.has(index)
            const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
            const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0) // How much the card tilts, flicking it harder makes it rotate faster
            const scale = down ? 1.1 : 1 // Active cards lift up a bit
            return {
                x,
                rot,
                scale,
                delay: undefined,
                config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
            }
        })
        if (!down && gone.size === cards.length)
            setTimeout(() => {
                gone.clear()
                api.start(i => to(i))
            }, 600)
    })
    // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
    return (
        <>
            <div className="min-h-screen flex flex-col justify-center">
                {props.map(({ x, y, rot, scale }, i) => (
                    // cardTitle = cards[i],
                    <animated.div className={styles.deck} key={i} style={{ x, y }}>
                        {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
                        <animated.div
                            {...bind(i)}
                            style={{
                                transform: interpolate([rot, scale], trans),
                                // backgroundImage: `url(${cards[i].hdurl ? cards[i].hdurl : cards[i].url})`,
                                backgroundImage: `url(${cards[i].url})`
                            }}
                        />
                    </animated.div>
                ))}
            </div>
            {/* <div className="py-6">
                <p className="text-6xl text-right w-100 py-10">{title}</p>
                <p className="text-right w-100 pb-10">{explanation}</p>
            </div> */}
        </>
    )
}

export default Deck;