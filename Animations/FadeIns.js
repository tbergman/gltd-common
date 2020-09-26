/*
auto-generated with modifications by: https://github.com/react-spring/gltfjsx
*/

import { useEffect, useRef } from 'react'


export function useAnimationFadeIn({ actions, actionName, fadeInTime = 2 }) {
    const nextAction = useRef()
    const action = useRef()

    useEffect(() => {
        if (!actions) return
        if (!action.current) {
            action.current = actions[actionName]
            action.current.play()
        } else {
            nextAction.current = actions[actionName]
            nextAction.current.enabled = true;
            nextAction.current.play()
            action.current.crossFadeTo(nextAction.current, fadeInTime);
            action.current = nextAction.current
        }
    }, [actionName, actions])

}
