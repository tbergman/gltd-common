import React, { useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from 'react-three-fiber';
import explosion from "../assets/textures/explosion/explosion.png";
import vertex from '!raw-loader!glslify-loader!../Shaders/noiseVertex.glsl';
import fragment from '!raw-loader!glslify-loader!../Shaders/noiseFragment.glsl';


// source: https://www.clicktorelease.com/blog/vertex-displacement-noise-3d-webgl-glsl-three-js/
export default function Noise({ materialRef, ...props }) {
	const { mouse } = useThree();
	const timeScale = useMemo(() => props.timeScale ? props.timeScale : .0001);
	const noiseScale = useMemo(() => props.noiseScale ? props.noiseScale : .033);
	const alpha = useMemo(() => props.alpha ? props.alpha : 1.)
	const start = useMemo(() => Date.now())
	const uniforms = useMemo(() => {
		const textureLoader = new THREE.TextureLoader();
		const texMap = textureLoader.load(props.imagePath ? props.imagePath : explosion)
		return {
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
	})

	useFrame(() => {
		uniforms.time.value = timeScale * (Date.now() - start);
	})

	useFrame(() => {
		const delta = .01;
		const minNoiseScale = .0001;
		if (Math.abs(mouse.x) < .75 && Math.abs(mouse.y) < .75) {
			if (uniforms.noiseScale.value < noiseScale) {
				uniforms.noiseScale.value += delta;
			}
		} else if (uniforms.noiseScale.value > minNoiseScale) {
			uniforms.noiseScale.value -= delta;
		}
	})

	return <shaderMaterial
		ref={materialRef}
		uniforms={uniforms}
		transparent={alpha < 1. ? true : false}
		wireframe={props.wireframe ? props.wireframe : false}
		vertexShader={vertex}
		fragmentShader={fragment}
		{...props}
	/>;
}
