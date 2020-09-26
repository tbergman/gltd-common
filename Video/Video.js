import React, { useMemo, useRef, useResource } from "react";
import * as THREE from "three";

export function createVideoTexture({src, play}) {
  const video = document.createElement("video");
  document.body.appendChild(video);
  video.src = src;
  // play video
  if (play) {
    video.play();
  }
  // create material from video texture
  let texture = new THREE.VideoTexture(video);
  texture.minFilter = THREE.LinearFilter;
  texture.format = THREE.RGBFormat;
  return texture;
};