import React, {useMemo, useRef, useEffect} from 'react';
import * as THREE from 'three';

export function useObjectAlongTubeGeometry({ object, tubeGeometry, ...props }) {
    const [normal, binormal] = useMemo(() => {
        return [
            new THREE.Vector3(),
            new THREE.Vector3(),
        ]
    });
    // driving units
    const offset = useRef();
    const delta = useRef();
    const speed = useRef();
    function getCurTrajectory({
        tubeGeometry,
        offset,
        delta,
        t,
    }) {
        const pos = tubeGeometry.parameters.path.getPointAt(t);
        offset.current += delta.current;
        // interpolation
        const segments = tubeGeometry.tangents.length;
        const pickt = t * segments;
        const pick = Math.floor(pickt);
        const pickNext = (pick + 1) % segments;
        binormal.subVectors(tubeGeometry.binormals[pickNext], tubeGeometry.binormals[pick]);
        binormal.multiplyScalar(pickt - pick).add(tubeGeometry.binormals[pick]);//.add(up);
        const dir = tubeGeometry.parameters.path.getTangentAt(t);
        normal.copy(binormal); // most examples have .cross(dir) here but this will rotate the normal to the 'side' of the orientation we want to achieve 
        // We move on a offset on its binormal
        pos.add(normal.clone());
        return { pos, dir };
    }
    useEffect(() => {
        if (!speed.current) speed.current = 20;
        if (!delta.current) delta.current = .005;
        if (!offset.current) offset.current = 0;
    })

    return {
        offset,
        delta,
        speed,
        normal,
        binormal,
        getCurTrajectory,

    }
}





export const updateCurTrajectory = ({t, pos, dir, normal, object, tubeGeometry}) => {
    object.position.copy(pos);
    // Using arclength for stablization in look ahead.
    const lookAt = tubeGeometry.parameters.path.getPointAt((t + 30 / tubeGeometry.parameters.path.getLength()) % 1);
    // Camera Orientation 2 - up orientation via normal
    lookAt.copy(pos).add(dir);
    object.matrix.lookAt(object.position, lookAt, normal);
    object.rotation.setFromRotationMatrix(object.matrix);
    // car.rotation.z += Math.PI / 12; // TODO added code - can it be baked into matrix rotation?
}
