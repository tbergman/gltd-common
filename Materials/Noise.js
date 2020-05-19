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
	const [uniforms, texMap] = useMemo(() => {
		const textureLoader = new THREE.TextureLoader();
		const texMap = textureLoader.load(props.imagePath ? props.imagePath : explosion)
		// console.log("IMG", img)
		const uniforms = {
			// map: {
			// 	type: "t",
			// 	value: texMap,
			// },
			time: { // float initialized to 0
				type: "f",
				value: 0.0
			},
			scale: {
				type: "f",
				value: props.scale ? props.scale : .033,
			}
		}
		return [uniforms, texMap]
	})

	useFrame(() => {
		uniforms['time'].value = timeScale * (Date.now() - start);
	})

	return <shaderMaterial
		ref={materialRef}
		uniforms={uniforms}
		vertexShader={vertex}
		// fragmentShader={THREE.MaterialsShader.fragmentShader}
		fragmentShader={fragment}
		// map={texMap}
		// defines={
		// 	{ USE_MAP: true }
		// }
		{...props}
	/>;
}
