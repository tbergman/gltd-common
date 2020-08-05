import React, { useMemo } from 'react';
import * as THREE from 'three';
import { cloudEnvMap, tileTextureMaps } from './utils';
import albedo from "../assets/textures/marble-speckled-bl/marble-speckled-albedo.png";
import metallic from "../assets/textures/marble-speckled-bl/marble-speckled-metalness.png";
import normal from "../assets/textures/marble-speckled-bl/marble-speckled-normal.png";
import roughness from "../assets/textures/marble-speckled-bl/marble-speckled-roughness.png";

export default function PolishedSpeckledMarbleTop({ materialRef, useEnvMap=true, ...props }) {
    // source https://freepbr.com/materials/polished-speckled-marble-top-pbr-material/
    const [albedoMap, metallicMap, normalMap, roughnessMap, envMap] = useMemo(() => {
        const textureLoader = new THREE.TextureLoader();
        const albedoMap = textureLoader.load(albedo);
        const metallicMap = textureLoader.load(metallic);
        const normalMap = textureLoader.load(normal);
        const roughnessMap = textureLoader.load(roughness);
        const envMap = props.envMapURL ? textureLoader.load(envMapUrl) : cloudEnvMap();
        const textureMaps = [albedoMap, metallicMap, normalMap, roughnessMap, envMap];
        return tileTextureMaps(textureMaps, props);
    });
    console.log("USE ENVMAP!", props.useEnvMap)
    return <meshStandardMaterial
        ref={materialRef}
        lights
        receiveShadow
        castShadow
        map={albedoMap}
        metallicMap={metallicMap}
        normalMap={normalMap}
        metalness={1}
        roughnessMap={roughnessMap}
        roughness={1}
        skinning={props.skinning || false}
        envMap={useEnvMap ? envMap : undefined}
        side={props.side ? props.sid : THREE.FrontSide}
        {...props}
    />;
}
