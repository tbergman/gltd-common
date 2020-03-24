import React, { useMemo } from 'react';
import * as THREE from 'three';
import { tileTextureMaps } from './utils';
import color from "../assets/textures/facade10/Facade10_col.jpg";
import normal from "../assets/textures/facade10/Facade10_nrm.jpg";
import emissive from "../assets/textures/facade10/Facade10_emi.jpg";
import roughness from "../assets/textures/facade10/Facade10_rgh.jpg";
import metalness from "../assets/textures/facade10/Facade10_met.jpg";
import displacement from "../assets/textures/facade10/Facade10_disp.jpg";

export function Facade10Material({ materialRef, ...props }) {
	// https://www.cc0textures.com/view.php?tex=Facade12
	const [colorMap, normalMap, emissiveMap, roughnessMap, metalnessMap, displacementMap] = useMemo(() => {
		const textureLoader = new THREE.TextureLoader();
		const colorMap = textureLoader.load(color);
		const normalMap = textureLoader.load(normal);
		const emissiveMap = textureLoader.load(emissive);
		const roughnessMap = textureLoader.load(roughness);
		const metalnessMap = textureLoader.load(metalness);
		const displacementMap = textureLoader.load(displacement);
		const textureMaps = [colorMap, normalMap, emissiveMap, roughnessMap, metalnessMap, displacementMap];
		return tileTextureMaps(textureMaps, props);
	});
	return <meshStandardMaterial ref={materialRef} lights receiveShadow castShadow map={colorMap} normalMap={normalMap} emissiveMap={emissiveMap} metalnessMap={metalnessMap} roughnessMap={roughnessMap} {...props} />;
}
