import React, { useMemo } from 'react';
import * as THREE from 'three';
import { tileTextureMaps } from './utils';
import color from "../assets/textures/ground29/Ground29_col.jpg;
import normal from "../assets/textures/ground29/Ground29_nrm.jpg;
import ao from "../assets/textures/ground29/Ground29_ao.jpg;
import roughness from "../assets/textures/ground29/Ground29_rgh.jpg;
import displacement from "../assets/textures/ground29/Ground29_disp.jpg;

export function Ground29Material({ materialRef, ...props }) {
	// https://www.cc0textures.com/view.php?tex=Ground29
	const [colorMap, normalMap, aoMap, roughnessMap, displacementMap] = useMemo(() => {
		const textureLoader = new THREE.TextureLoader();
		const colorMap = textureLoader.load(color);
		const normalMap = textureLoader.load(normal);
		const aoMap = textureLoader.load(ao);
		const roughnessMap = textureLoader.load(roughness);
		const displacementMap = textureLoader.load(displacement);
		const textureMaps = [colorMap, normalMap, aoMap, roughnessMap, displacementMap];
		return tileTextureMaps(textureMaps, props);
	});
	// return <meshStandardMaterial
	return <meshStandardMaterial ref={materialRef} lights
		// wireframeLineWidth={10}
		// alphaTest={0.5}
		// transparent
		// wireframe
		receiveShadow castShadow color={props.color || 0xf0f0f0} map={colorMap} normalMap={normalMap} aoMap={aoMap} roughnessMap={roughnessMap} displacementScale={props.displacementScale || .01} // TODO play around
		displacementBias={props.displacementBias || 0} //-.01}
		displacementMap={displacementMap} {...props} />;
}
