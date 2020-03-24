/* eslint import/no-webpack-loader-syntax: off */
import riverFragmentShader from '!raw-loader!glslify-loader!../Shaders/riverFragment.glsl';
/* eslint import/no-webpack-loader-syntax: off */
import skinningVertexShader from '!raw-loader!glslify-loader!../Shaders/skinningVertex.glsl';
/* eslint import/no-webpack-loader-syntax: off */
import tronFragmentShader from '!raw-loader!glslify-loader!../Shaders/tronFragment.glsl';
/* eslint import/no-webpack-loader-syntax: off */
import vsDepthVertex from '!raw-loader!glslify-loader!../Shaders/vsDepthVertex.glsl';

import { useEffect, useRef } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import { hexToRgb } from '../Utils/colors';

import foamGripNormal from "../assets/textures/foam-grip/foam-grip-normal.png"
import foamGripAo from "../assets/textures/foam-grip/foam-grip-ao.png"
import foamGripAlbedo from "../assets/textures/foam-grip/foam-grip-albedo.png"
import pinkRockAlbedo from "../assets/textures/copper-rock/copper-rock1-alb-pink.png"

import rockNormal from "../assets/textures/copper-rock/copper-rock1-normal.png"
import rockRoughness from "../assets/textures/copper-rock/copper-rock1-rough.png"
import rockMetalness from "../assets/textures/copper-rock/copper-rock1-metal.png"
import rockAo from "../assets/textures/copper-rock/copper-rock1-ao.png"
import rockDisplacement from "../assets/textures/copper-rock/copper-rock1-height.png"
import rockAlbedo from "../assets/textures/copper-rock/copper-rock1-alb.png";


import officeSpaceEnv from "../assets/textures/env-maps/office-space1.jpg";

export function initFoamGripMaterial(textureLoader) {
	var envMapCube = new THREE.CubeTextureLoader()
		.setPath('../assets/textures/env-maps/barc-rooftop/')
		.load([
			'px.png',
			'nx.png',
			'py.png',
			'ny.png',
			'pz.png',
			'nz.png',
		]);

	// const textureCube = loader.load(Array(6).fill('Barce_Rooftop.png'));
	return new THREE.MeshPhongMaterial({
		color: 0xC0C0C0,
		specular: 0xC0C0C0,// 0x4c4c4c,
		shininess: 100,
		skinning: true,
		normalMap: textureLoader.load(foamGripNormal),
		aoMap: textureLoader.load(foamGripAo),
		specularMap: textureLoader.load(foamGripAlbedo),
		envMap: envMapCube,
		refractionRatio: 1.0,
		combine: THREE.AddOperation
	})
}


export function initPinkRockMaterial(textureLoader) {
	const mat = initRockMaterial(textureLoader, 0xFF0FFF);
	const albedoMap = textureLoader.load(pinkRockAlbedo);
	mat.map = albedoMap;
	return mat;
}


export function initRockMaterial(textureLoader, color, props) {
	const loader = new THREE.CubeTextureLoader();
	const textureCube = loader.load(Array(6).fill(officeSpaceEnv));
	const normalMap = textureLoader.load(rockNormal);
	const roughnessMap = textureLoader.load(rockRoughness);
	const metalnessMap = textureLoader.load(rockMetalness);
	const aoMap = textureLoader.load(rockAo);
	const displacementMap = textureLoader.load(rockDisplacement);
	const albedoMap = textureLoader.load(rockAlbedo);
	albedoMap.repeat.set(3, 3);
	albedoMap.wrapS = THREE.RepeatWrapping;
	albedoMap.wrapT = THREE.RepeatWrapping;
	normalMap.wrapS = THREE.RepeatWrapping;
	normalMap.wrapT = THREE.RepeatWrapping;
	const mat = new THREE.MeshStandardMaterial({
		color: color,
		roughness: .4,
		metalness: .5,
		skinning: true,
		map: albedoMap,
		normalMap: normalMap,
		roughnessMap: roughnessMap,
		metalnessMap: metalnessMap,
		aoMap: aoMap,
		displacementMap: props.displacementScale ? displacementMap : null,
		displacementScale: props.dispacementScale || 1,
		envMap: textureCube
	});
	return mat;
}

export function initTransluscentMaterial(opacity) {
	return new THREE.MeshStandardMaterial({
		opacity: opacity,
		premultipliedAlpha: true,
		transparent: true,
		skinning: true
	});
}

export function initPinkShinyMaterial() {
	return new THREE.MeshStandardMaterial({
		color: 0xFB0082,
		metalness: 0.5,
		roughness: 0.0,
		skinning: true,
		needsUpdate: true,
		transparent: true,
		opacity: 0.5
	});
}




