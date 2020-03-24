import React, { useMemo } from 'react';
import * as THREE from 'three';
import { cloudEnvMap, tileTextureMaps } from './utils';
import ao from "../assets/textures/rock-19/Rock19_AO.jpg";
import color from "../assets/textures/rock-19/Rock19_col.jpg";
import displacement from "../assets/textures/rock-19/Rock19_disp.jpg";
import normal from "../assets/textures/rock-19/Rock19_nrm.jpg";
import roughness from "../assets/textures/rock-19/Rock19_rgh.jpg";

export function Rock19({ materialRef, ...props }) {
    // https://cc0textures.com/view.php?tex=Rock19
    const [aoMap, colorMap, displacementMap, normalMap, roughnessMap, envMap] = useMemo(() => {
        const textureLoader = new THREE.TextureLoader();
        const aoMap = textureLoader.load(ao);
        const colorMap = textureLoader.load(color);
        const displacementMap = textureLoader.load(displacement);
        const normalMap = textureLoader.load(normal);
        const roughnessMap = textureLoader.load(roughness);
        const envMap = props.envMapURL ? textureLoader.load(envMapUrl) : cloudEnvMap();
        const textureMaps = [aoMap, colorMap, displacementMap, normalMap, roughnessMap, envMap];
        return tileTextureMaps(textureMaps, props);
    });
    return <meshStandardMaterial ref={materialRef} map={colorMap} aoMap={aoMap} displacementMap={displacementMap}
        // displacementScale={1}
        specular={0x00ff00} normalMap={normalMap} roughnessMap={roughnessMap} envMap={envMap} {...props} />;
}
