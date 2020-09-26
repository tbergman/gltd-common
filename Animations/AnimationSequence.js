
import * as THREE from 'three'
import React, { useRef, useState, useEffect } from 'react'
import { useFrame } from 'react-three-fiber'

export function useAnimationSequence({ animationName, animationTimeScale }) {
    const actions = useRef()
    const [prevAction, setPrevAction] = useState()
    const [curAction, setCurAction] = useState()
    const [animationsHaveLoaded, setAnimationsHaveLoaded] = useState(false)
    const [mixer] = useState(() => new THREE.AnimationMixer())

    useFrame((state, delta) => mixer.update(delta))

    useEffect(() => {
        if (!animationTimeScale) return
        mixer.timeScale = animationTimeScale
    }, [animationTimeScale])

    useEffect(() => {
        if (!actions.current || !animationName) return
        setPrevAction(curAction)
        setCurAction(actions.current[animationName])
    }, [animationName])

    // allow for slow-loading files to alert the component when it's ready and
    // loaded
    useEffect(() => {
        if (!actions.current) return
        if (!curAction) setCurAction(actions.current[animationName])
    }, [animationsHaveLoaded])

    useEffect(() => {
        if (!curAction) return
        if (prevAction) prevAction.stop()
        curAction.play()
    }, [curAction])
    return { actions, mixer, setAnimationsHaveLoaded }
}
