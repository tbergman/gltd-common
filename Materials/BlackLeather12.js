import React, { useMemo } from 'react';
import * as THREE from 'three';
import { tileTextureMaps } from './utils';
import diffuse from "../assets/textures/black-leather-12/black_leather_12_diffuse.png";
import glossiness from "../assets/textures/black-leather-12/black_leather_12_glossiness.png";
import height from "../assets/textures/black-leather-12/black_leather_12_height.png";
import normal from "../assets/textures/black-leather-12/black_leather_12_normal.png";
import reflection from "../assets/textures/black-leather-12/black_leather_12_reflection.png";

export function BlackLeather12({ materialRef, ...props }) {
    const [diffuseMap, glossinessMap, heightMap, normalMap, reflectionMap] = useMemo(() => {
        const textureLoader = new THREE.TextureLoader();
        const diffuseMap = textureLoader.load(diffuse);
        const glossinessMap = textureLoader.load(glossiness);
        const heightMap = textureLoader.load(height);
        const normalMap = textureLoader.load(normal);
        const reflectionMap = textureLoader.load(reflection);
        const textureMaps = [diffuseMap, glossinessMap, heightMap, normalMap, reflectionMap];
        return tileTextureMaps(textureMaps, props);
    });
    return <meshStandardMaterial ref={materialRef} map={diffuseMap} roughnessMap={glossinessMap} roughness={0.1} heightMap={heightMap}
        // displacementMap={!props.skipDisplacement && heightMap}
        // displacementScale={props.displacementScale || .01}
        normalMap={normalMap} envMap={reflectionMap} roughness={-1} // invert roughness to get glossiness
        {...props} />;
}
