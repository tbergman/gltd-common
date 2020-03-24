import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useThree } from 'react-three-fiber';
import { cloudEnvMap, tileTextureMaps } from './utils';
import color from "../assets/textures/aluminum-scuffed/Aluminum-Scuffed_basecolor.png";
import normal from "../assets/textures/aluminum-scuffed/Aluminum-Scuffed_normal.png";
import metalness from "../assets/textures/aluminum-scuffed/Aluminum-Scuffed_metallic.png";

// Shader built in the style of: https://medium.com/@pailhead011/extending-three-js-materials-with-glsl-78ea7bbb9270
// seems fun: https://www.clicktorelease.com/blog/creating-spherical-environment-mapping-shader/
export function CloudMaterial({ materialRef, ...props }) {
    materialRef = materialRef ? materialRef : useRef().current;
    const { camera, canvas } = useThree();
    const [colorMap, normalMap, metalnessMap, envMap] = useMemo(() => {
        const textureLoader = new THREE.TextureLoader();
        const colorMap = textureLoader.load(color);
        const normalMap = textureLoader.load(normal);
        const metalnessMap = textureLoader.load(metalness);
        const envMap = cloudEnvMap();
        const textureMaps = [colorMap, normalMap, metalnessMap, envMap];
        return tileTextureMaps(textureMaps, props);
    });
    return <meshPhongMaterial {...props} ref={materialRef} lights receiveShadow castShadow map={colorMap} shininess={props.shininess || 100} envMapIntensity={0.3} color={props.color || 0x0000c0} emissive={props.emissive || 0xfffb00} opacity={props.opacity || 1.0} reflectivity={props.reflectivity || 0.8} // env map uses this
        envMap={envMap} side={props.side || THREE.FrontSide} normalMap={normalMap} metalnessMap={metalnessMap} />;
}
