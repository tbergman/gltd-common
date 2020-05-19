// varying vec2 vUv;
// uniform sampler2D tImg;

//   void main() {
//     vec3 color2 = vec3(1.0,0.55,0);
//     vec3 color1 = vec3(0.226,0.000,0.615);
//     float mixValue = distance(vUv,vec2(.5,.5));
//     // vec3 color = mix(color1,color2,mixValue);
//     vec4 color = texture2D(tImg, vUv);
//     gl_FragColor = vec4(color);//,mixValue);
//   }
// precision highp sampler2DArray;

// varying vec2 vUv;
varying float noise;
uniform sampler2D tImg;

float random( vec3 scale, float seed ){
  return fract( sin( dot( gl_FragCoord.xyz + seed, scale ) ) * 43758.5453 + seed ) ;
}

void main() {

  // get a random offset
  float r = .1 * random( vec3( 12.9898, 78.233, 151.7182 ), 0.0 );
  // lookup vertically in the texture, using noise and offset
  // to get the right RGB colour
  vec2 tPos = vec2( 0, 1.3 * noise + r );
  vec4 color = texture2D( tImg, tPos );

  gl_FragColor = vec4( color.rgb, 1.0 );

}
