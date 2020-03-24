import React, { useMemo } from 'react';
import * as THREE from 'three';
import { cloudEnvMap, tileTextureMaps } from './utils';
import albedo from "../assets/textures/ornate-brass2/ornate-brass2_albedo.png";
import ao from "../assets/textures/ornate-brass2/ornate-brass2_ao.png";
import height from "../assets/textures/ornate-brass2/ornate-brass2_height.png";
import metallic from "../assets/textures/ornate-brass2/ornate-brass2_metallic.png";
import normal from "../assets/textures/ornate-brass2/ornate-brass2_normal-dx.png";
import roughness from "../assets/textures/ornate-brass2/ornate-brass2_roughness.png";

export function OrnateBrass2({ materialRef, ...props }) {
    // https://freepbr.com/materials/ornate-brass-2/
    const [albedoMap, aoMap, heightMap, metallicMap, normalMap, roughnessMap, envMap] = useMemo(() => {
        const textureLoader = new THREE.TextureLoader();
        const albedoMap = textureLoader.load(albedo);
        const aoMap = textureLoader.load(ao);
        const heightMap = textureLoader.load(height);
        const metallicMap = textureLoader.load(metallic);
        const normalMap = textureLoader.load(normal);
        const roughnessMap = textureLoader.load(roughness);
        const envMap = props.envMapURL ? textureLoader.load(envMapUrl) : cloudEnvMap();
        const textureMaps = [albedoMap, aoMap, heightMap, metallicMap, normalMap, roughnessMap, envMap];
        return tileTextureMaps(textureMaps, props);
    });
    return <meshStandardMaterial ref={materialRef} map={albedoMap} aoMap={aoMap} color={props.color || "white"}
        // specular={0xf0f000}
        shininess={1} heightMap={heightMap} metallicMap={metallicMap}
        // displacementScale={.2}
        normalMap={normalMap} roughnessMap={roughnessMap} envMap={envMap} />;
}
