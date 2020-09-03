import React, { useMemo } from 'react';
import * as THREE from 'three';
import { cloudEnvMap, tileTextureMaps } from './utils';
import albedo from "../assets/textures/marble-speckled-bl/marble-speckled-albedo_GREEN.png";
import albedoGreen from "../assets/textures/marble-speckled-bl/marble-speckled-albedo.png";
import metallicLight from "../assets/textures/marble-speckled-bl/marble-speckled-metalness_LIGHT.png";
import metallicDark from "../assets/textures/marble-speckled-bl/marble-speckled-metalness.png";
import normal from "../assets/textures/marble-speckled-bl/marble-speckled-normal.png";
import roughness from "../assets/textures/marble-speckled-bl/marble-speckled-roughness.png";
import env from "../assets/textures/env-maps/free_star_sky_hdri_spherical_map_by_kirriaa_dbw8p0w.jpg"
// import env from "../assets/textures/env-maps/free_star_sky_hdri_spherical_map_by_kirriaa_dbw8p0w_LIGHT.jpg"
// import env from "../assets/textures/env-maps/office-space1.jpg"

export default function PolishedSpeckledMarbleTop({ materialRef, useEnvMap=true, ...props }) {
    // source https://freepbr.com/materials/polished-speckled-marble-top-pbr-material/
    const [albedoMap, metallicMap, normalMap, roughnessMap, envMap] = useMemo(() => {
        const textureLoader = new THREE.TextureLoader();
        const albedoMap = textureLoader.load(props.useAlbedoGren ? albedoGreen : albedo);
        const metallicMap = textureLoader.load(props.useMetallicLight ? metallicLight : metallicDark)
        const normalMap = textureLoader.load(normal);
        const roughnessMap = textureLoader.load(roughness);
        const envMap = textureLoader.load(env);
        // const envMap = props.envMapURL ? textureLoader.load(envMapUrl) : cloudEnvMap();
        const textureMaps = [albedoMap, metallicMap, normalMap, roughnessMap, envMap];
        return tileTextureMaps(textureMaps, props);
    });
    return <meshStandardMaterial
        ref={materialRef}
        lights
        receiveShadow
        castShadow
        map={albedoMap}
        metallicMap={metallicMap}
        normalMap={normalMap}
        metalness={props.useMetallicLight ? .91 : 1.}
        roughnessMap={roughnessMap}
        roughness={1}
        skinning={props.skinning || false}
        envMap={useEnvMap ? envMap : undefined}
        side={props.side ? props.sid : THREE.FrontSide}
        {...props}
    />;
}
