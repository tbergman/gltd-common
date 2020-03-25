import React, { useMemo } from 'react';
import * as THREE from 'three';
import img from "../assets/transluscent/white.jpg";
import thick from "../assets/tranluscent/thickness.jpg";

export function Transluscent({ materialRef, ...props }) {
    var loader = new THREE.TextureLoader();
    var imgTexture = loader.load(img);
    var thicknessTexture = loader.load(thick);
    imgTexture.wrapS = imgTexture.wrapT = THREE.RepeatWrapping;

    var shader = TranslucentShader;
    var uniforms = THREE.UniformsUtils.clone(shader.uniforms);

    uniforms['map'].value = imgTexture;

    uniforms['diffuse'].value = new THREE.Vector3(1.0, 0.2, 0.2);
    uniforms['shininess'].value = 500;

    uniforms['thicknessMap'].value = thicknessTexture;
    uniforms['thicknessColor'].value = new THREE.Vector3(0.5, 0.3, 0.0);
    uniforms['thicknessDistortion'].value = 0.01;
    uniforms['thicknessAmbient'].value = 0.55;
    uniforms['thicknessAttenuation'].value = 2.6;
    uniforms['thicknessPower'].value = 8.2;
    uniforms['thicknessScale'].value = 0;


    useEffect(() => {
        materialRef.current.extensions.derivatives = true;
    })

    return <shaderMaterial
        {...props}
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={shader.vertexShader}
        fragmentShader={shader.fragmentShader}
        lights={true}
    />
}
