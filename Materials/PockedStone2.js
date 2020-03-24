import React, { useMemo } from 'react';
import * as THREE from 'three';
import { cloudEnvMap, tileTextureMaps } from './utils';
import ao from "../assets/textures/pocked-stone2/Pocked-stone2_Ambient_Occlusion.png";
import albedo from "../assets/textures/pocked-stone2/Pocked-stone2-albedo.png";
import height from "../assets/textures/pocked-stone2/Pocked-stone2-height.png";
import metalnessl from "../assets/textures/pocked-stone2/Pocked-stone2-metalness.png";
import normal from "../assets/textures/pocked-stone2/Pocked-stone2-normal.png";
import roughness from "../assets/textures/pocked-stone2/Pocked-stone2-roughness.png";


export function PockedStone2({ materialRef, ...props }) {
    // https://freepbr.com/materials/pocked-stone-pbr-material/
    const [aoMap, albedoMap, heightMap, metalnesslMap, normalMap, roughnessMap, envMap] = useMemo(() => {
        const textureLoader = new THREE.TextureLoader();
        const aoMap = textureLoader.load(ao);
        const albedoMap = textureLoader.load(albedo);
        const heightMap = textureLoader.load(height);
        const metalnesslMap = textureLoader.load(metalnessl);
        const normalMap = textureLoader.load(normal);
        const roughnessMap = textureLoader.load(roughness);
        const envMap = props.envMapURL ? textureLoader.load(envMapUrl) : cloudEnvMap();
        const textureMaps = [aoMap, albedoMap, heightMap, metalnesslMap, normalMap, roughnessMap, envMap];
        return tileTextureMaps(textureMaps, props);
    });
    return <meshStandardMaterial ref={materialRef} colorMap={albedoMap} aoMap={aoMap} bumpMap={heightMap}
        // displacementMap={heightMap}
        // displacementBias={1}
        // displacementScale={3}
        normalMap={normalMap} roughnessMap={roughnessMap}
        // roughness={10}
        metalnessMap={metalnesslMap} envMap={envMap} {...props} />;
}
