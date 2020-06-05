/* eslint import/no-webpack-loader-syntax: off */
import simpleVertex from '!raw-loader!glslify-loader!../Shaders/simpleVertex.glsl';
/* eslint import/no-webpack-loader-syntax: off */
import tronFragmentShader from '!raw-loader!glslify-loader!../Shaders/tronFragment2.glsl';
import React, { useEffect, useRef, useMemo } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import { hexToRgb } from '../Utils/colors';

export default function TronMaterial2({ materialRef, side, colorOffset, ...props }) {
	colorOffset = colorOffset ? colorOffset : new THREE.Vector3(0., .9, .6);
	materialRef = materialRef ? materialRef : useRef().current;
	const { clock, size } = useThree();
	const uniforms = useRef();
	useEffect(() => {
		uniforms.current = {
				colorOffset: new THREE.Uniform(colorOffset),
				uTime: { value: 0 },
			}
	}, [])


	useFrame(() => {
		if (!uniforms.current.uTime) return;
		uniforms.current.uTime.value = clock.oldTime;
	});

	return <shaderMaterial
		ref={materialRef}
		uniforms={uniforms.current}
		side={side ? side : THREE.FrontSide}
		vertexShader={simpleVertex}
		fragmentShader={tronFragmentShader}
	/>;
}
