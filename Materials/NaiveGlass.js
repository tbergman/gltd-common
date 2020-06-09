import React, { useMemo } from 'react';
import * as THREE from 'three';
import env from "../assets/textures/env-maps/tree.jpg";

export default function NaiveGlass({ materialRef, ...props }) {
    const envMap = useMemo(() => {
        const textureLoader = new THREE.TextureLoader();
        const envMap = props.envMapURL ? textureLoader.load(props.envMapURL) : textureLoader.load(env);
        envMap.mapping = THREE.EquirectangularRefractionMapping;
        envMap.encoding = THREE.sRGBEncoding;
        return envMap;
    })
    return <meshPhongMaterial
        ref={materialRef}
        side={THREE.DoubleSide}
        color={props.color || "white"}
        shininess={props.shininess || 30}
        opacity={props.opacity || .5}
        envMap={envMap}
        transparent={true}
        combine={THREE.MixOperation}
    />
}
