import React, { useMemo } from 'react';
import * as THREE from 'three';
import { cloudEnvMap } from './utils';

import color from "../assets/textures/foam-grip/foam-grip-albedo.png";
import normal from "../assets/textures/foam-grip/foam-grip-normal.png";
import ao from "../assets/textures/foam-grip/foam-grip-ao_GREEN.png";
import aoGreen from "../assets/textures/foam-grip/foam-grip-ao.png";
import albedo from "../assets/textures/foam-grip/foam-grip-albedo.png";
import darkEnv from "../assets/textures/env-maps/free_star_sky_hdri_spherical_map_by_kirriaa_dbw8p0w.jpg"

export default function FoamGrip({ materialRef, ...props }) {
    materialRef = materialRef ? materialRef : useRef().current;
    const [colorMap, envMapCube, normalMap, aoMap, specularMap] = useMemo(() => {
        const textureLoader = new THREE.TextureLoader();
        const envMapCube = props.useDarkEnv ? textureLoader.load(darkEnv) : cloudEnvMap();
        const colorMap = textureLoader.load(color);
        const normalMap = textureLoader.load(normal);
        const aoMap = textureLoader.load(props.useAOGreen ? aoGreen : ao);
        const specularMap = textureLoader.load(albedo);
        return [colorMap, envMapCube, normalMap, aoMap, specularMap]
    });

    return <meshPhongMaterial
        {...props}
        ref={materialRef}
        lights
        receiveShadow
        castShadow
        map={colorMap}
        color={props.color || 0xffffff}
        specular={props.specular || 0xf0f000}
        shininess={props.shininess ? props.shininess : 100}
        skinning={true}
        normalMap={normalMap}
        aoMap={aoMap}
        specularMap={specularMap}
        envMap={envMapCube}
        refractionRatio={props.refractionRatio || 1.0}
        combine={THREE.AddOperation}
    />
}
