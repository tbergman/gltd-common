// original work from: https://www.shadertoy.com/view/MtGGzW
varying vec2 vUv;

// uniform vec3 colorOffset;
uniform float uTime;

void main() {

	vec2 uv = vUv - 0.5;
	
    float gt = uTime / 1000.;
    float algo_g = 0.0;
    gt = 2.0 * sin(gt * 0.1);
	
    uv.y += 0.3;
	    
	algo_g += distance(cos(uv.x) * (1.0 - uv.y) * (uv.x * sin(gt)) + gt * gt, (uv.x * sin(gt)) * gt * (1.0 - uv.y) + 6.91 * sin(gt));		       
	algo_g *= distance(8.05 * uv.x * (uv.y * sin(gt)) + sin(gt) + (uv.x * tan(gt)), (uv.y * sin(gt)) + gt * sin(uv.x) + uv.y + (1.0 - uv.y));
	algo_g += (sin(gt) * (1.0 - uv.y) + (1.0 - uv.y) * 2.76 + cos(uv.x));
	algo_g *= mod(sin(uv.x) * (1.0 - uv.y) * sin(uv.x) + sin(uv.x) + uv.y, (1.0 - uv.x) + (uv.x * tan(gt)) * 0.60 * 0.0 + cos(uv.x));	
    
	algo_g = (1.0 - algo_g); 
    
    algo_g = clamp(algo_g, 0.0, 1.0);
	
	gl_FragColor = vec4(algo_g, algo_g, algo_g, .5);

    //////

//   vec2 wavyLines = vec2(sin(vuv.x * mod(uTime, 10000.) ), sin(vUv.y * mod(uTime, 10000.)));
  
//   float x = sin(vUv.x / vUv.y) + colorOffset.g;
//   float y = wavyLines.y + colorOffset.g;
//   float z = colorOffset.b;
  
  
//   gl_FragColor = vec4(x, y, z, 1.0);
}



