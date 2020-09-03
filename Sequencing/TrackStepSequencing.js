import React, { useEffect, useState, useCallback } from 'react';
import { useFrame } from 'react-three-fiber';
import useAudioPlayer from '../UI/Player/hooks/useAudioPlayer';

export function useTrackStepSequence({ tracks, firstTrack }) {
    const { currentTrackName, audioPlayer } = useAudioPlayer();
    const [step, setStep] = useState(tracks[firstTrack].steps[0]);
    const [stepIdx, setStepIdx] = useState(0);
    const [numSteps, setNumSteps] = useState(tracks[firstTrack].steps.length)
    const [prevStep, setPrevStep] = useState()

    // reset step info per track
    useEffect(() => {
        if (!currentTrackName) return;
        setNumSteps(tracks[currentTrackName].steps.length);
        const prevStepIdx = stepIdx
        // change to idx 0 when currentTrackName changes
        setStepIdx(0)
        // if someone switches tracks before the step gets to step 1, need to
        // set step manually here
        if (prevStepIdx == 0) {
            setStep(tracks[currentTrackName].steps[stepIdx]);
        }
    }, [currentTrackName])

    // set current step
    useEffect(() => {
        if (!currentTrackName) return;
        if (stepIdx > 0) {
            setPrevStep(step)
        }
        setStep((prevState) => {
            return ({
                ...prevState,
                ...tracks[currentTrackName].steps[stepIdx],
            })
        })
    }, [stepIdx])

    // manage step advancement with nextStepidx
    useFrame(() => {
        if (!currentTrackName) return;
        if (stepIdx + 1 == numSteps) return;
        const nextStepIdx = stepIdx + 1;
        const nextStepTime = tracks[currentTrackName].steps[nextStepIdx].time
        if (audioPlayer.currentTime > nextStepTime) {
            setStepIdx(nextStepIdx)
        }
    });

    return {
        step,
        stepIdx,
        prevStep,
    }
}
