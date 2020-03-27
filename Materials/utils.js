import * as THREE from 'three';
import bk from "../assets/textures/env-maps/bluecloud/bluecloud_bk.jpg"
import dn from "../assets/textures/env-maps/bluecloud/bluecloud_dn.jpg"
import ft from "../assets/textures/env-maps/bluecloud/bluecloud_ft.jpg"
import lf from "../assets/textures/env-maps/bluecloud/bluecloud_lf.jpg"
import rt from "../assets/textures/env-maps/bluecloud/bluecloud_rt.jpg"
import up from "../assets/textures/env-maps/bluecloud/bluecloud_up.jpg"

function cloudEnvMap() {
    const cube = new THREE.CubeTextureLoader()
        .load([bk, dn, ft, lf, rt, up]);
    return cube;
}


function tileTextureMaps(textureMaps, props) {
    return textureMaps.map(textureMap => {
        const repeat = props.textureRepeat || { x: 1, y: 1 };
		textureMap.wrapT = THREE.RepeatWrapping;
        textureMap.wrapS = THREE.RepeatWrapping;
        textureMap.offset.set(0, 0);
        textureMap.repeat.set(repeat.x, repeat.y);
        return textureMap;
    });
}

export { cloudEnvMap, tileTextureMaps }