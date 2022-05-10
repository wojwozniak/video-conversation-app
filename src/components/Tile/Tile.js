import { useEffect, useRef } from 'react';

function Tile() {
    const videoEl = useRef(null);
    const audioEl = useRef(null);

    useEffect(() => {
        videoEl.current.srcObject = new MediaStream([videoTrack])
    }, [videoTrack]);
    
    useEffect(() => {
        audioEl.current.srcObject = new MediaStream([audioTrack])
    }, [audioTrack]);
    

    function getVideoComponent() {
        return <video autoPlay muted playsInline ref={ videoEl } />
    }

    function getAudioComponent() {
        return <audio autoPlay playsInline ref={ audioEl }/>
    }

    function getClassNames() {
        let classNames = 'tile';
        classNames += props.isLarge ? 'large' : 'small';

        return classNames;
    }

    return (
        <div className={getClassNames()}>
            {getVideoComponent()}
            {getAudioComponent()}
        </div>
    );
}

export { Tile };