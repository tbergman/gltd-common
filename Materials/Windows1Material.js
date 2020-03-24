import React, { useMemo } from 'react';
import * as THREE from 'three';
import { cloudEnvMap } from './utils';
import color from "../assets//windows/windows1.png;

export function Windows1Material({ materialRef, ...props }) {
	const [colorMap, envMap] = useMemo(() => {
		const textureLoader = new THREE.TextureLoader();
		const colorMap = textureLoader.load(color);
		colorMap.wrapS = colorMap.wrapT = THREE.RepeatWrapping;
		colorMap.offset.set(0, 0);
		colorMap.repeat.set(16, 16);
		const envMap = cloudEnvMap();
		return [colorMap, envMap];
	});
	return <meshStandardMaterial ref={materialRef} lights receiveShadow castShadow shininess={100} map={colorMap} envMap={envMap} {...props} />;
}
