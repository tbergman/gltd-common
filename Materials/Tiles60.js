import React, { useMemo } from 'react';
import * as THREE from 'three';
import { cloudEnvMap, tileTextureMaps } from './utils';
import color from "../assets/tiles-60/Tiles60_col.jpg";
import displacement from "../assets/textures/tiles-60/Tiles60_disp.jpg";
import metal from "../assets/tiles-60/Tiles60_met.jpg";
import normal from "../assets/tiles-60/Tiles60_nrm.jpg";
import roughness from "../assets/textures/tiles-60/Tiles60_rgh.jpg";

export function Tiles60({ materialRef, ...props }) {
    const [colorMap, displacementMap, metalMap, normalMap, roughnessMap, envMap] = useMemo(() => {
        const textureLoader = new THREE.TextureLoader();
        const colorMap = textureLoader.load(color);
        const displacementMap = textureLoader.load(displacement);
        const metalMap = textureLoader.load(metal);
        const normalMap = textureLoader.load(normal);
        const roughnessMap = textureLoader.load(roughness);
        const envMap = props.envMapURL ? textureLoader.load(envMapUrl) : cloudEnvMap();
        const textureMaps = [colorMap, displacementMap, metalMap, normalMap, roughnessMap, envMap];
        return tileTextureMaps(textureMaps, props);
    });
    return <meshStandardMaterial ref={materialRef} map={colorMap} displacementMap={displacementMap} displacementScale={0.1} metalMap={metalMap} normalMap={normalMap}
        // roughnessMap={roughnessMap}
        envMap={envMap} roughness={-1} // invert roughness to get glossiness
    />;
}
