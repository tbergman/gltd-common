import React, { useMemo } from 'react';
import * as THREE from 'three';
import { cloudEnvMap, tileTextureMaps } from './utils';
import color from "../assets/textures/metal03/Metal03_col.jpg";
import normal from "../assets/textures/metal03/Metal03_nrm.jpg";
import metal from "../assets/textures/metal03/Metal03_met.jpg";
import roughness from "../assets/textures/metal03/Metal03_rgh.jpg";
import displacement from "../assets/textures/metal03/Metal03_disp.jpg";


export function Metal03Material({ materialRef, ...props }) {
    // https://www.cc0textures.com/view.php?tex=Metal03
    const [envMap, colorMap, normalMap, metalMap, roughnessMap, displacementMap] = useMemo(() => {
        const textureLoader = new THREE.TextureLoader();
        const envMap = props.envMapURL ? textureLoader.load(envMapUrl) : cloudEnvMap();
        const colorMap = textureLoader.load(color);
        const normalMap = textureLoader.load(normal);
        const metalMap = textureLoader.load(metal);
        const roughnessMap = textureLoader.load(roughness);
        const displacementMap = textureLoader.load(displacement);
        const textureMaps = [envMap, colorMap, normalMap, metalMap, roughnessMap, displacementMap];
        return tileTextureMaps(textureMaps, props);
    });
    return <meshStandardMaterial {...props} ref={materialRef} lights receiveShadow castShadow envMap={envMap} map={colorMap} color={props.color || "white"} normalMap={normalMap} metalMap={metalMap} roughness={props.roughness || 0.5} roughnessMap={roughnessMap} displacementScale={props.displacementScale || 0} // TODO play around
        displacementBias={props.displacementBias || 0} displacementMap={displacementMap} />;
}
