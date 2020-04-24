import React, { useMemo } from 'react';
import * as THREE from 'three';
import { tileTextureMaps } from './utils';
import roughness from "../assets/textures/disco-ball-01/Disco_Ball_001_roughness.jpg"
import normal from "../assets/textures/disco-ball-01/Disco_Ball_001_normal.jpg"
import height from "../assets/textures/disco-ball-01/Disco_Ball_001_height.png"
import basecolor from "../assets/textures/disco-ball-01/Disco_Ball_001_basecolor.jpg"
import ambientOcclusion from "../assets/textures/disco-ball-01/Disco_Ball_001_ambientOcclusion.jpg"
import { cloudEnvMap } from './utils';

// source: https://3dtextures.me/2019/03/18/disco-ball-001/
export default function DiscoBall01({ materialRef, ...props }) {
    const [roughnessMap, normalMap, heightMap, basecolorMap, ambientOcclusionMap, envMap] = useMemo(() => {
        const textureLoader = new THREE.TextureLoader();
        const roughnessMap = textureLoader.load(roughness)
        const normalMap = textureLoader.load(normal)
        const heightMap = textureLoader.load(height)
        const basecolorMap = textureLoader.load(basecolor)
        const ambientOcclusionMap = textureLoader.load(ambientOcclusion)
        const envMap = cloudEnvMap();
        const textureMaps = [roughnessMap, normalMap, heightMap, basecolorMap, ambientOcclusionMap, envMap];
        return tileTextureMaps(textureMaps, props);
    });
    return <meshStandardMaterial
        ref={materialRef}
        map={basecolorMap}
        roughnessMap={roughnessMap}
        bumpMap={heightMap}
        normalMap={normalMap}
        aoMap={ambientOcclusionMap}
        envMap={envMap}
        roughness={-1} // invert roughness to get glossiness
        {...props} />;
}
