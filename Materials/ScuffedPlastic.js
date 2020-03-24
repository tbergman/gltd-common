import React, { useMemo } from 'react';
import * as THREE from 'three';
import { cloudEnvMap, tileTextureMaps } from './utils';

import metalness from "../assets/textures/plastic-pattern1/plasticpattern1-metalness.png";
import normal from "../assets/textures/plastic-pattern1/plasticpattern1-normal2b.png";
import roughness from "../assets/textures/plastic-pattern1/plasticpattern1-roughness2.png";

export default function ScuffedPlastic({ materialRef, ...props }) {
    const [metalnessMap, normalMap, roughnessMap, envMap] = useMemo(() => {
        const textureLoader = new THREE.TextureLoader();
        const metalnessMap = textureLoader.load(metalness);
        const normalMap = textureLoader.load(normal);
        const roughnessMap = textureLoader.load(roughness);
        const envMap = props.envMapURL ? textureLoader.load(envMapUrl) : cloudEnvMap();
        const textureMaps = [metalnessMap, normalMap, roughnessMap, envMap];
        return tileTextureMaps(textureMaps, props)
    });
    return <meshStandardMaterial
        ref={materialRef}
        lights
        receiveShadow
        emissive={props.emissive || "black"}
        emissiveIntensity={props.emissiveIntensity || 10}
        color={props.color || "red"}
        metalnessMap={metalnessMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
        envMap={envMap}
        {...props}
    />
}