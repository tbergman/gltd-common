
export const calcSoundOffsetUnit = (bpm, barsPerSample) => {
  return 60.0 / (bpm / barsPerSample);
};

export const genSoundOffsets = (numSamples, barsPerSample, bpm) => {
  let offsets = [];
  let soundOffsetUnit = calcSoundOffsetUnit(bpm, barsPerSample);
  for (var i = 0; i < numSamples; i++) {
    offsets.push([soundOffsetUnit * i, soundOffsetUnit]);
  }
  return offsets;
}
