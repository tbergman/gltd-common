export function getCurTrajectory(t) {
    const pos = road.parameters.path.getPointAt(t);
    offset.current += delta.current;
    // interpolation
    const segments = road.tangents.length;
    const pickt = t * segments;
    const pick = Math.floor(pickt);
    const pickNext = (pick + 1) % segments;
    binormal.subVectors(road.binormals[pickNext], road.binormals[pick]);
    binormal.multiplyScalar(pickt - pick).add(road.binormals[pick]);//.add(up);
    const dir = road.parameters.path.getTangentAt(t);
    normal.copy(binormal); // most examples have .cross(dir) here but this will rotate the normal to the 'side' of the orientation we want to achieve 
    // We move on a offset on its binormal
    pos.add(normal.clone());
    return [pos, dir];
}
