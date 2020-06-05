/* eslint import/no-webpack-loader-syntax: off */
import simpleVertex from '!raw-loader!glslify-loader!../Shaders/simpleVertex.glsl';
/* eslint import/no-webpack-loader-syntax: off */
import tronFragmentShader from '!raw-loader!glslify-loader!../Shaders/tronFragment.glsl';
import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import { hexToRgb } from '../Utils/colors';

export function TronMaterial({ materialRef, side, color }) {
	color = color || 0xffffff;
	materialRef = materialRef ? materialRef : useRef().current;
	const { clock, size } = useThree();
	const uniforms = useRef();
	useEffect(() => {
		const baseColor = hexToRgb(color.toString(16));
		uniforms.current = {
			uTime: { value: 0 },
			uResolution: { value: new THREE.Vector2(size.width, size.length) },
			uBPM: { value: 120 },
			uBaseColor: { value: new THREE.Vector3(baseColor.r, baseColor.g, baseColor.g) },
		}
	}, []);

	useFrame(() => {
		if (!uniforms.current.uTime) return; // avoid re-initialization async issues (e.g. if tiling)
		uniforms.current.uTime.value = clock.oldTime;
	});

	// useEffect(() => {
	// 	if (uniforms.current.uBPM) uniforms.current.uBPM.value = bpm;
	// }, [bpm])

	return <shaderMaterial
		ref={materialRef}
		uniforms={uniforms.current}
		side={side ? side : THREE.FrontSide}
		vertexShader={simpleVertex}
		fragmentShader={tronFragmentShader}
	/>;
}
