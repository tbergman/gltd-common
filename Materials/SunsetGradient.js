import simpleVertex from '!raw-loader!glslify-loader!../Shaders/simpleVertex.glsl';
import sunsetGradientFragmentShader from '!raw-loader!glslify-loader!../Shaders/sunsetGradientFragment.glsl';
import React from 'react';
export function SunsetGradient({ materialRef, ...props }) {
	return <shaderMaterial ref={materialRef} vertexShader={simpleVertex} fragmentShader={sunsetGradientFragmentShader} {...props} />;
}
