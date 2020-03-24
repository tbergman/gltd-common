import simpleVertex from '!raw-loader!glslify-loader!../Shaders/simpleVertex.glsl';
import dreamGradientFragmentShader from '!raw-loader!glslify-loader!../Shaders/dreamGradientFragment.glsl';
import React from 'react';
export function DreamGradient({ materialRef, ...props }) {
	return <shaderMaterial ref={materialRef} vertexShader={simpleVertex} fragmentShader={dreamGradientFragmentShader} {...props} />;
}
