import React, { useMemo } from 'react';
import * as THREE from 'three';
import { tileTextureMaps } from './utils';
import color from "../assets/textures/facade04/Facade04_col.jpg";
import normal from "../assets/textures/facade04/Facade04_nrm.jpg";
import emissive from "../assets/textures/facade04/Facade04_emi.jpg";
import roughness from "../assets/textures/facade04/Facade04_rgh.jpg";
import metalness from "../assets/textures/facade04/Facade04_met.jpg";
import mask from "../assets/textures/facade04/Facade04_mask.jpg";
import displacement from "../assets/textures/facade04/Facade04_disp.jpg";

export function Facade04Material({ materialRef, ...props }) {
	// https://www.cc0textures.com/view.php?tex=Facade12
	const [colorMap, normalMap, emissiveMap, roughnessMap, metalnessMap, maskMap, displacementMap] = useMemo(() => {
		const textureLoader = new THREE.TextureLoader();
		const colorMap = textureLoader.load(color);
		const normalMap = textureLoader.load(normal);
		const emissiveMap = textureLoader.load(emissive);
		const roughnessMap = textureLoader.load(roughness);
		const metalnessMap = textureLoader.load(metalness);
		const maskMap = textureLoader.load(mask);
		const displacementMap = textureLoader.load(displacement);
		const textureMaps = [colorMap, normalMap, emissiveMap, roughnessMap, metalnessMap, maskMap, displacementMap];
		return tileTextureMaps(textureMaps, props);
	});
	return <meshStandardMaterial ref={materialRef} lights receiveShadow castShadow map={colorMap} maskMap={maskMap} normalMap={normalMap} emissiveMap={emissiveMap} metalnessMap={metalnessMap} roughnessMap={roughnessMap} {...props} />;
}
