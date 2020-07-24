// original work from: https://www.shadertoy.com/view/MtGGzW
varying vec2 vUv;
uniform float uTime;

void main() {

	vec2 uv = vUv - 0.1;
	
    float gt = uTime / 1000.;
    float algo_g = 0.0;
    gt = 2.0 * sin(gt * 0.1);
	
    uv.y += 5.;
	    
	algo_g += distance(cos(uv.x) * (1.0 - uv.y) * (uv.x * sin(gt)) + gt * gt, (uv.x * sin(gt)) * gt * (1.0 - uv.y) + 6.91 * sin(gt));		       
	algo_g *= distance(8.05 * uv.x * (uv.y * sin(gt)) + sin(gt) + (uv.x * tan(gt)), (uv.y * sin(gt)) + gt * sin(uv.x) + uv.y + (1.0 - uv.y));
	//algo_g += (sin(gt) * (1.0 - uv.y) + (1.0 - uv.y) * 2.76 + cos(uv.x));
	algo_g *= mod(sin(uv.x) * (1.0 - uv.y) * sin(uv.x) + sin(uv.x) + uv.y, (1.0 - uv.x) + (uv.x * tan(gt)) * 0.80  + cos(uv.x));	
    
	algo_g = (1.0 - algo_g); 
    
    algo_g = clamp(algo_g, 0.0, 1.0);
	
	gl_FragColor = vec4(0.12, 0., algo_g / 2.0, 0.3);
}



