// source: https://codesandbox.io/embed/r3f-train-l900i
import { useCallback, useEffect } from 'react'
import { useSpring, config } from '@react-spring/core'
import { useGesture } from 'react-use-gesture'
import clamp from 'lodash/clamp'

export default function useYScroll(bounds, props) {
  const [{ x }, set] = useSpring(() => ({ x: 0, config: config.slow }))
  const fn = useCallback(
    ({ xy: [, cy], previous: [, py], memo = x.getValue() }) => {
      const newX = clamp(memo + cy - py, ...bounds)
      set({ x: newX })
      return newX
    },
    [bounds, x, set]
  )
  const bind = useGesture({ onWheel: fn, onDrag: fn }, props)
  useEffect(() => props && props.domTarget && bind(), [props, bind])
  return [x, bind]
}
