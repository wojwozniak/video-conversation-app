import { useEffect, useReducer } from 'react';

import {
    callReducer,
    initialCallState,
    PARTICIPANTS_CHANGE,
} from '.callState'; 

function Call({ callObject }) {

    const [callState, dispatch] = useReducer(callReducer, initialCallState);

    useEffect(() => {
        const events = [
            'participant-joined',
            'participant-updated',
            'participant-left'
        ];
        function handleParticipantsState(event) {
            dispatch({
                type: PARTICIPANTS_CHANGE,
                participants: callObject.participants(),
            })
        }

        handleParticipantsState();

        for (const event of events) {
            callObject.on(event, handleParticipantsState);
        }

        return function cleanup() {
            for (const event of events) {
                callObject.off(event);
            }
        }


    }, [callObject]);
}

export { Call };