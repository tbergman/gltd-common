import React, { useMemo } from 'react';
import * as THREE from 'three';
import { tileTextureMaps } from './utils';
import color from "../assets/textures/facade12/Facade12_col.jpg;
import normal from "../assets/textures/facade12/Facade12_nrm.jpg;
import emissive from "../assets/textures/facade12/Facade12_emi.jpg;
import roughness from "../assets/textures/facade12/Facade12_rgh.jpg;
import displacement from "../assets/textures/facade12/Facade12_disp.jpg;

export function Facade12Material({ materialRef, ...props }) {
	// https://www.cc0textures.com/view.php?tex=Facade12
	const [colorMap, normalMap, emissiveMap, roughnessMap, displacementMap] = useMemo(() => {
		const textureLoader = new THREE.TextureLoader();
		const colorMap = textureLoader.load(color);
		const normalMap = textureLoader.load(normal);
		const emissiveMap = textureLoader.load(emissive);
		const roughnessMap = textureLoader.load(roughness);
		const displacementMap = textureLoader.load(displacement);
		const textureMaps = [colorMap, normalMap, emissiveMap, roughnessMap, displacementMap];
		return tileTextureMaps(textureMaps, props);
	});
	return <meshStandardMaterial {...props} ref={materialRef} lights receiveShadow castShadow map={colorMap} normalMap={normalMap} emissiveMap={emissiveMap} roughnessMap={roughnessMap} />;
}
