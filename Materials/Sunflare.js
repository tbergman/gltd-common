/* eslint import/no-webpack-loader-syntax: off */
import simpleVertex from '!raw-loader!glslify-loader!../Shaders/simpleVertex.glsl';
/* eslint import/no-webpack-loader-syntax: off */
import tronFragmentShader from '!raw-loader!glslify-loader!../Shaders/sunflareFragment.glsl';
import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import * as THREE from 'three';

export function Sunflare({ materialRef, side, ...props }) {

    materialRef = materialRef ? materialRef : useRef().current;
    const { clock, size } = useThree();
    const uniforms = useRef();
    useEffect(() => {
        uniforms.current = {
            uTime: { value: 0 },
        }
    }, []);

    useFrame(() => {
        if (!uniforms.current.uTime) return; // avoid re-initialization async issues (e.g. if tiling)
        uniforms.current.uTime.value = clock.oldTime;
    });

    return <shaderMaterial
        ref={materialRef}
        uniforms={uniforms.current}
        side={side ? side : THREE.FrontSide}
        vertexShader={simpleVertex}
        fragmentShader={tronFragmentShader}
        {...props}
    />;
}
