import React, { useRef } from 'react';
import { extend, useFrame, useThree } from 'react-three-fiber';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

extend({ OrbitControls, FlyControls });


export default function Orbit({ curCamera, ...props }) {
    curCamera = curCamera || useThree().camera;
    const controls = useRef();
    const { gl } = useThree();
    const delta = props.delta ? props.delta : .1;
    useFrame(() => { controls.current && controls.current.update(delta) });
    return (
        <orbitControls
            ref={controls}
            args={[curCamera, gl.domElement]}
            enableKeys={props.enableKeys ? props.enableKeys : true}
            enableZoom={props.enableZoom ? props.enableZoom : true}
            maxDistance={props.maxDistance ? props.maxDistance : Infinity}
            minPolarAngle={props.minPolarAngle ? props.minPolarAngle : 0}
            maxPolarAngle={props.maxPolarAngle ? props.maxPolarAngle : Math.PI}
            minAzimuthAngle={props.minAzimuthAngle ? props.minAzimuthAngle : -Math.PI}
            maxAzimuthAngle={props.maxAzimuthAngle ? props.maxAzimuthAngle : Math.PI}
            {...props}
        />
    );
}
