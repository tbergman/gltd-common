import React, { useMemo } from 'react';
import * as THREE from 'three';
import { tileTextureMaps } from './utils';

import albedo from "../assets/textures/lined-cement/Lined-Cement--albedo.png";
import ao from "../assets/textures/lined-cement/Lined-Cement-ao.png";
import height from "../assets/textures/lined-cement/Lined-Cement-Height.png";
import metallic from "../assets/textures/lined-cement/Lined-Cement-Metallic.png";
import normal from "../assets/textures/lined-cement/Lined-Cement-Normal-ogl.png";
import roughness from "../assets/textures/lined-cement/Lined-Cement-Roughness.png";


export function LinedCement({ materialRef, ...props }) {
    //https://freepbr.com/materials/lined-cement1/
    const [albedoMap, aoMap, heightMap, metallicMap, normalMap, roughnessMap, envMap] = useMemo(() => {
        const textureLoader = new THREE.TextureLoader();
        const albedoMap = textureLoader.load(albedo);
        const aoMap = textureLoader.load(ao);
        const heightMap = textureLoader.load(height);
        const metallicMap = textureLoader.load(metallic);
        const normalMap = textureLoader.load(normal);
        const roughnessMap = textureLoader.load(roughness);
        const envMap = props.envMapURL ? textureLoader.load(envMapUrl) : cloudEnvMap();
        const textureMaps = [albedoMap, aoMap, heightMap, metallicMap, normalMap, roughnessMap, envMap];
        return tileTextureMaps(textureMaps, props);
    })
    return <meshStandardMaterial
        {...props}
        ref={materialRef}
        map={albedoMap}
        aoMap={aoMap}
        color={props.color || "white"}
        heightMap={heightMap}
        metalnessMap={metallicMap}
        metalness={1}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
        envMap={envMap}
    />
}