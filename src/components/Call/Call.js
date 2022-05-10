import { useEffect, useReducer } from 'react';

import {
    callReducer,
    initialCallState,
    PARTICIPANTS_CHANGE,
    isLocal,
    isScreenShare
} from '.callState'; 

import { Tile } from './components/Tile/Tile'

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


    function getTiles() {
        let largeTiles = [];
        let smallTiles = [];

        Object.entries(callState.callItems).forEach(([id, callItem]) => {
            const isLarge = false;
            const tile = (
                <Tile
                    key={id}
                    videoTrackState={callItem.videoTrackState}
                    audioTrackState={callItem.audioTrackState}
                    isLocalPerson={isLocal(id)}
                    isLarge={isLarge}
                    disableCornerMessage={isScreenShare(id)}
                    onClick={
                        isLocal(id)
                            ? null : () => {
                                sendHello(id);
                        }
                    }
                />
            );

            if (isLarge) {
                largeTiles.push(tile) 
            } else {
                smallTiles.push(tile);
            }
        });
        return [largeTiles, smallTiles];
    }

    const [largeTiles, smallTiles] = getTiles();

    return (
        <div className="call">
            <div className='large-tiles'></div>
            <div className='small-tiles'></div>

        </div>
    )

}





export { Call };