import React, { useMemo } from 'react';
import { createLiveStreamTexture } from '../LiveStream/LiveStreamScreen'

export default function LiveStream({ materialRef, src, play, ...props }) {

    if (!src) {
        console.error("src a required prop for LiveStream texture.")
    }
    if (!play) {
        console.error("play is a required prop for LiveStream texture.")
    }

    const videoTexture = useMemo(() => { return createLiveStreamTexture({ src, play }) })

    return <meshBasicMaterial
        ref={materialRef}
        map={videoTexture}
        {...props}
    />
}