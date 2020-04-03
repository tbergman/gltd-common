import React, { useMemo } from 'react';
import * as THREE from 'three';
import { tileTextureMaps } from './utils';
import color from "../assets/textures/plant1/Plant_12_baseColor.png";
import normal from "../assets/textures/plant1/Plant_12_normal.png";
import { cloudEnvMap } from './utils';

// source: https://sketchfab.com/3d-models/tropical-plant-5d3ae0c92f0f4b98b17b1400b0d8cf74
export default function Plant1({ materialRef, ...props }) {
    const [colorMap, normalMap, envMap] = useMemo(() => {
        const textureLoader = new THREE.TextureLoader();
        const colorMap = textureLoader.load(color);
        const normalMap = textureLoader.load(normal)
        const envMap = cloudEnvMap();
        const textureMaps = [colorMap, normalMap, envMap];
        return tileTextureMaps(textureMaps, props);
    });
    
    return <meshStandardMaterial
        ref={materialRef}
        side={THREE.DoubleSide}
        transparent={true}
        alphaTest = {0.5}
        map={colorMap}
        normalMap={normalMap}
        envMap={envMap}
        {...props} />;
}
