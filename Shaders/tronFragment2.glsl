
varying vec2 vUv;

uniform vec3 colorOffset;
uniform float uTime;

void main() {
  vec2 wavyLines = vec2(sin(vUv.x * uTime ), sin(vUv.y * uTime));
  
  float x = sin(vUv.x / vUv.y) + colorOffset.g;
  float y = wavyLines.y + colorOffset.g;
  float z = colorOffset.b;
  
  
  gl_FragColor = vec4(x, y, z, 1.0);
}



