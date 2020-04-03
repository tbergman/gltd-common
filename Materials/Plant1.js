import React, { useMemo } from 'react';
import * as THREE from 'three';
import { tileTextureMaps } from './utils';
import roughness from "../assets/textures/disco-ball-01/Disco_Ball_001_roughness.jpg"
import normal from "../assets/textures/disco-ball-01/Disco_Ball_001_normal.jpg"
import height from "../assets/textures/disco-ball-01/Disco_Ball_001_height.png"
import basecolor from "../assets/textures/disco-ball-01/Disco_Ball_001_basecolor.jpg"
import ambientOcclusion from "../assets/textures/disco-ball-01/Disco_Ball_001_ambientOcclusion.jpg"
import { cloudEnvMap } from './utils';

// source: https://sketchfab.com/3d-models/tropical-plant-5d3ae0c92f0f4b98b17b1400b0d8cf74
export default function Plant1({ materialRef, ...props }) {
    const [colorMap, normalMap, specularMap, envMap] = useMemo(() => {
        const textureLoader = new THREE.TextureLoader();
        const colorMap = textureLoader.load(roughness)
        const normalMap = textureLoader.load(normal)
        const specularMap = textureLoader.load(height)
        const envMap = cloudEnvMap();
        const textureMaps = [colorMap, normalMap, specularMap, envMap];
        return tileTextureMaps(textureMaps, props);
    });
    return <meshStandardMaterial
        ref={materialRef}
        colorMap={colorMap}
        normalMap={normalMap}
        specularMap={specularMap}
        envMap={envMap}
        {...props} />;
}
