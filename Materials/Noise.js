import React, { useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from 'react-three-fiber';
import explosion from "../assets/textures/explosion/explosion.png";
import vertex from '!raw-loader!glslify-loader!../Shaders/noiseVertex.glsl';
import fragment from '!raw-loader!glslify-loader!../Shaders/noiseFragment.glsl';


// source: https://www.clicktorelease.com/blog/vertex-displacement-noise-3d-webgl-glsl-three-js/
export default function Noise({ materialRef, ...props }) {
	const timeScale = props.timeScale ? props.timeScale : .0001
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
				value: props.noiseScale ? props.noiseScale : .033,
			}
		}
	})

	useFrame(() => {
		uniforms['time'].value = timeScale * (Date.now() - start);
	})

	return <shaderMaterial
		ref={materialRef}
		uniforms={uniforms}
		wireframe={props.wireframe ? props.wireframe : false}
		vertexShader={vertex}
		fragmentShader={fragment}
		{...props}
	/>;
}
