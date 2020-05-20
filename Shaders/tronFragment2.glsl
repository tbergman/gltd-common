
varying vec2 vUv;

uniform float uTime;
uniform float uBPM;
uniform vec3 uBaseColor;
const int NUM_LINES = 1;

float plotX(vec2 st, float pct) {
  return smoothstep(pct - 0.001, pct, st.x) -
         smoothstep(pct, pct + 0.001, st.x);
}

float plotY(vec2 st, float pct) {
  return smoothstep(pct - 0.001, pct, st.y) -
         smoothstep(pct, pct + 0.001, st.y);
}

// TODO maybe can implement a map function ?
// https://gist.github.com/companje/29408948f1e8be54dd5733a74ca49bb9
void main() {
  float beatsPerSecond = 2.;// uBPM / 60.;
  float wavyLines = sin(vUv.x * uTime / .5);
//  float wavyLines = sin(vUv.x) + sin(vUv.y) + fract(uTime / 10000.); 
  // float numSeconds = (uTime / 1000.)
  
  // float curBeat = uBPM 
  vec3 col = vec3(sin(wavyLines * .25), wavyLines -.9, cos(wavyLines) -.6);

  // float numBeats = floor(uTime) / 60. / beatsPerSecond; //TODO 

  // for (int i = 0; i < NUM_LINES; i++) {
  //   float pos = float(i) / float(NUM_LINES);
  //   // currently just setting a simple line down the middle...
  //   float lineX = plotX(vUv, pos);
  //   float lineY = plotY(vUv, pos + .01);

  //   // creates the motion and gaps
  //   float streak = sin(vUv.y * uTime * .005);
  //   // int modulo not supported in all glsl versions
  //   // if (fract(uBPM / 60.) < 0.5) {//} && cos(vUv.x) > .5) {//cos(uTime *
  //     col.y += lineY * streak;
  //     col.x += lineY * streak;
  //   // }
  // }
    // if (fract(numBeats / 8.) < .1) {  
      // col += lineY * streak;
    // }
  // }
  // col *= uBaseColor; // Not using this correctly
  gl_FragColor = vec4(col, 1.0);
}
