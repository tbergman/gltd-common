import simpleVertex from '!raw-loader!glslify-loader!../Shaders/simpleVertex.glsl';
import nightGradientFragmentShader from '!raw-loader!glslify-loader!../Shaders/nightGradientFragment.glsl';
import React from 'react';
export function NightGradient({ materialRef, ...props }) {
	return <shaderMaterial ref={materialRef} vertexShader={simpleVertex} fragmentShader={nightGradientFragmentShader} {...props} />;
}
