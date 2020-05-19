import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from 'react-three-fiber';
import explosion from "../assets/textures/explosion/explosion.png";
import vertex from '!raw-loader!glslify-loader!../Shaders/noiseVertex.glsl';
import fragment from '!raw-loader!glslify-loader!../Shaders/noiseFragment.glsl';


// source: https://www.clicktorelease.com/blog/vertex-displacement-noise-3d-webgl-glsl-three-js/
export default function Noise({ materialRef, ...props }) {
	const start = useMemo(() => Date.now())
	const uniforms = useMemo(() => {
		const textureLoader = new THREE.TextureLoader();
		const img = textureLoader.load(props.imagePath ? props.imagePath : explosion)
		console.log("IMG", img)
		return {
			tImg: {
				type: "t",
				value: img,
			},
			time: { // float initialized to 0
				type: "f",
				value: 0.0
			},
			scale: {
				type: "f",
				value: props.scale ? props.scale : .033,
			}
		}
	})

	useFrame(() => {
		uniforms['time'].value = .0005 * (Date.now() - start);
	})

	return <shaderMaterial
		ref={materialRef}
		uniforms={uniforms}
		vertexShader={vertex}
		fragmentShader={fragment}
		{...props}
	/>;
}
