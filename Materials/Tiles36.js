import React, { useMemo } from 'react';
import * as THREE from 'three';
import { cloudEnvMap, tileTextureMaps } from './utils';
import color from "../assets/textures/tiles-36/Tiles36_col.jpg";
import displacement from "../assets/textures/tiles-36/Tiles36_disp.jpg";
import normal from "../assets/textures/tiles-36/Tiles36_nrm.jpg";
import roughness from "../assets/textures/tiles-36/Tiles36_rgh.jpg";

export function Tiles36({ materialRef, ...props }) {
    const [colorMap, displacementMap, normalMap, roughnessMap, envMap] = useMemo(() => {
        const textureLoader = new THREE.TextureLoader();
        const colorMap = textureLoader.load(color);
        const displacementMap = textureLoader.load(displacement);
        const normalMap = textureLoader.load(normal);
        const roughnessMap = textureLoader.load(roughness);
        const envMap = props.envMapURL ? textureLoader.load(envMapUrl) : cloudEnvMap();
        const textureMaps = [colorMap, displacementMap, normalMap, roughnessMap, envMap];
        return tileTextureMaps(textureMaps, props);
    });
    return <meshStandardMaterial ref={materialRef} map={colorMap} displacementMap={displacementMap} displacementScale={.05} roughness={0} normalMap={normalMap} roughnessMap={roughnessMap} envMap={envMap} {...props} />;
}
