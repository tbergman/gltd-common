import React, { useMemo, useRef, useResource } from "react";
import * as THREE from "three";
import Hls from 'hls.js';

export function createLiveStreamTexture({src, play, width, height}) {
  const video = document.createElement("video");
  video.crossOrigin = "anonymous"; // CORS
  document.body.appendChild(video);
  // Add support for HLS stream 
  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(src);
    hls.attachMedia(video);
    // play video
    if (play) {
      video.play();
    }
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    // hls.js is not supported on platforms that do not have Media Source Extensions (MSE) enabled.
    // When the browser has built-in HLS support (check using `canPlayType`), we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video element throught the `src` property.
    // This is using the built-in support of the plain video element, without using hls.js.
    video.src = src;
    console.log(video)
    video.addEventListener('canplay', function () {
      if (play) {
        video.play();
      }
    });
  }
  // create material from video texture
  let texture = new THREE.VideoTexture(video);
  
  texture.minFilter = THREE.LinearFilter;
  texture.format = THREE.RGBFormat;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set( 2,4 );
  texture.offset = new THREE.Vector2(0.15, 1.35)
  texture.rotation = THREE.Math.degToRad(90)
  return texture;
}

// TODO (jeremy) validate that we can delete sizeX and sizeY
export default function LiveStreamScreen({ src, sizeX, sizeY, position, play}) {
  // Create video element
  const [material, geometry] = useMemo(() => {
    const texture = createLiveStreamTexture({src,play });
    let material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
    let geometry = new THREE.PlaneBufferGeometry(sizeX, sizeY);
    return [material, geometry];
  })

  return (
    <mesh material={material} position={position}>
      <bufferGeometry attach="geometry" {...geometry} />
    </mesh>
  );
}
