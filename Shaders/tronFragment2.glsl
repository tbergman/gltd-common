
varying vec2 vUv;

uniform vec3 colorOffset;
uniform float uTime;
uniform float uBPM;

void main() {
  // float beatsPerSecond = uBPM / 60.;
  // float curBeat = (uTime * 1000.) / beatsPerSecond
  float wavyLines = sin(vUv.x * uTime / .5);
  vec3 wavyColor = vec3(sin(wavyLines * .25) - colorOffset.r, wavyLines - colorOffset.g, cos(wavyLines) - colorOffset.b);
  gl_FragColor = vec4(wavyColor, 1.0);
}



