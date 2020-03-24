import simpleVertex from '!raw-loader!glslify-loader!../Shaders/simpleVertex.glsl';
import dayGradientFragmentShader from '!raw-loader!glslify-loader!../Shaders/dayGradientFragment.glsl';
import React from 'react';
export function DayGradient({ materialRef, ...props }) {
	return <shaderMaterial ref={materialRef} vertexShader={simpleVertex} fragmentShader={dayGradientFragmentShader} {...props} />;
}
