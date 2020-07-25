/*
auto-generated with modifications by: https://github.com/react-spring/gltfjsx
*/

import { useEffect, useRef } from 'react'


export function useAnimationFadeIn({ actions, actionName }) {
    const nextAction = useRef()
    const curAction = useRef()
    const fadeInTime = 2

    useEffect(() => {
        if (!actions) return
        if (!curAction.current) {
            curAction.current = actions[actionName]
        } else {
            nextAction.current = actions[actionName]
            nextAction.current.enabled = true;
            nextAction.current.play()
            curAction.current.crossFadeTo(nextAction.current, fadeInTime);
            curAction.current = nextAction.current
        }
    }, [actionName, actions])

}
