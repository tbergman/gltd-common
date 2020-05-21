/* eslint import/no-webpack-loader-syntax: off */
import simpleVertex from '!raw-loader!glslify-loader!../Shaders/simpleVertex.glsl';
/* eslint import/no-webpack-loader-syntax: off */
import tronFragmentShader from '!raw-loader!glslify-loader!../Shaders/tronFragment2.glsl';
import React, { useEffect, useRef, useMemo } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import { hexToRgb } from '../Utils/colors';

export default function TronMaterial2({ materialRef, bpm, side, colorOffset, ...props }) {
	colorOffset = colorOffset ? colorOffset : new THREE.Vector3(0., .9, .6);
	materialRef = materialRef ? materialRef : useRef().current;
	const { clock, size } = useThree();
	const uniforms = useMemo(() => {
		return {
			colorOffset: new THREE.Uniform(colorOffset),
			uTime: { value: 0 },
			uResolution: { value: new THREE.Vector2(size.width, size.length) },
			uBPM: { value: props.bpm ? props.pbm : 120 },
		}
	});

	useFrame(() => {
		if (!uniforms.uTime) return;
		uniforms.uTime.value = clock.oldTime;
	});

	useEffect(() => {
		if (uniforms.uBPM) uniforms.uBPM.value = bpm;
	}, [bpm])

	return <shaderMaterial
		ref={materialRef}
		uniforms={uniforms}
		side={side}
		vertexShader={simpleVertex}
		fragmentShader={tronFragmentShader}
	/>;
}
