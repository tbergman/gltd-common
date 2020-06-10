import React, { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from 'react-three-fiber';
import explosion from "../assets/textures/explosion/explosion.png";
import vertex from '!raw-loader!glslify-loader!../Shaders/noiseVertex.glsl';
import fragment from '!raw-loader!glslify-loader!../Shaders/noiseFragment.glsl';


// source: https://www.clicktorelease.com/blog/vertex-displacement-noise-3d-webgl-glsl-three-js/
export default function Noise({ materialRef, ...props }) {
	const { mouse } = useThree();
	// const timeScale = useMemo(() => props.timeScale ? props.timeScale : .0001);
	const noiseScale = useMemo(() => props.noiseScale ? props.noiseScale : .033);
	const alpha = useMemo(() => props.alpha ? props.alpha : 1.)
	const start = useMemo(() => Date.now())
	const uniforms = useRef();
	useEffect(() => {
		const textureLoader = new THREE.TextureLoader();
		const texMap = textureLoader.load(props.imagePath ? props.imagePath : explosion)
		uniforms.current = {
			map: {
				value: texMap,
			},
			time: {
				value: 0.0,
			},
			noiseScale: {
				value: noiseScale,
			},
			alpha: {
				value: alpha,
			}
		}
	}, [])
	


	useFrame(() => {
		const timeScale = .00009;
		uniforms.current.time.value = timeScale * (Date.now() - start);
	})

	useFrame(() => {
		// TODO this was stupid - think of something else
		// const delta = .01;
		// const minNoiseScale = .0001;
		// const maxNoiseScale = .0005;
		// if (Math.abs(mouse.x) < .75 && Math.abs(mouse.y) < .75) {
		// if (uniforms.current.noiseScale.value < maxNoiseScale) {
				// console.log("INCREMENTING THE NOSISCALE, NOW IT'S", uniforms.current.noiseScale)
				// uniforms.current.noiseScale.value += delta;
			// }
		// } else if (uniforms.current.noiseScale.value > minNoiseScale) {
			// uniforms.current.noiseScale.value -= delta;
			// console.log("DIMINUATING THE NOISE SCALE, NOW IT's", uniforms.current.noiseScale)
		// }
	})

	return <shaderMaterial
		ref={materialRef}
		uniforms={uniforms.current}
		transparent={alpha < 1. ? true : false}
		wireframe={props.wireframe ? props.wireframe : false}
		vertexShader={vertex}
		fragmentShader={fragment}
		{...props}
	/>;
}
