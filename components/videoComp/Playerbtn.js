import React from 'react'

const Playerbtn = () => {
    const hideRef = useRef(null);
    const [hideTimeoutId, setHideTimeoutId] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [current, setCurrentVideo] = useState(src)
    const [storedTime, setStoredTime] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [isButtonVisible, setIsButtonVisible] = useState(true);
    const [is480pVisible, set480pVisible] = useState(true);
    const [is720pVisible, set720pVisible] = useState(true);
    const [is1080pVisible, set1080pVisible] = useState(true);
    const toggleVisibility = () => {
        setIsVisible(!isVisible);

        if (isVisible) {
            setHideTimeoutId(setTimeout(() => {
                setIsVisible(true);
            }, 3000));
        }

        // Check the availability of each option and hide them if they are not available
        if (view720 === undefined || view720 === '') {
            set480pVisible(false);
        } else {
            set480pVisible(true);
            setCurrentVideo(view720)
            setStoredTime(playerRef.current.getCurrentTime());
        }

        if (view === undefined || view === '') {
            set720pVisible(false);
        } else {
            set720pVisible(true);
            setCurrentVideo(view)
            setStoredTime(playerRef.current.getCurrentTime());
        }

        if (src === undefined || src === '') {
            set1080pVisible(false);
        } else {
            set1080pVisible(true);
            setStoredTime(playerRef.current.getCurrentTime());
            setCurrentVideo(src)
        }
    };

    const hideButton = () => {
        setTimeout(() => {
            setIsButtonVisible(false);
        }, 3000);
    };

    const showButton = () => {
        setIsButtonVisible(true);
    };
    const handleLinkClick480 = () => {
        if (view720 === undefined || view720 === '') {

            toast.error("moive print 480p in not available")


        }
        else {
            setStoredTime(playerRef.current.getCurrentTime());
            setCurrentVideo(view720)
        }
    }
    const handleLinkClick720 = () => {
        if (view === undefined || view === '') {
            toast.error("moive print 720p in not available")
        }
        else {
            setStoredTime(playerRef.current.getCurrentTime());
            setCurrentVideo(view)
        }
    }
    const handleLinkClick1080 = () => {
        if (src === undefined || src === '') {
            toast.error("moive print 1080p in not available")
        }
        else {
            setStoredTime(playerRef.current.getCurrentTime());
            setCurrentVideo(src)
        }
    }

    const handleBackward = () => {
        const currentTime = playerRef.current.getCurrentTime();
        if (currentTime - 10 < 0) {
            playerRef.current.seekTo(0);
        } else {
            playerRef.current.seekTo(currentTime - 10);
            setHideTimeoutId(setTimeout(() => {
                setShowControls(false);
            }, 2000));
        }
    };

    const handleForward = () => {
        const currentTime = playerRef.current.getCurrentTime();
        const duration = playerRef.current.getDuration();
        if (currentTime + 10 > duration) {
            playerRef.current.seekTo(duration);

        } else {
            playerRef.current.seekTo(currentTime + 10);
            setHideTimeoutId(setTimeout(() => {
                setShowControls(false);
            }, 2000));
        }
    };
  return (
    <>
    {showControls && (
        <div className={styles.buttoncontainer}>
            <button className={styles.button} onClick={handleBackward}>
                <FontAwesomeIcon icon={faRotateLeft} />
            </button>

            <button className={styles.button} onClick={handleForward}>
                <FontAwesomeIcon icon={faRotateRight} />
            </button>
        </div>
    )}
    {showControls && (
        <button className={styles.playpausebutton} onClick={handlePlayPause}>
            {isPlaying ?
                <FontAwesomeIcon icon={faPause} /> :
                <FontAwesomeIcon icon={faPlay} />}
        </button>
    )}

    <div className={styles.qualityselector}>
        {isButtonVisible && (<div className={styles.dropdown} onClick={toggleVisibility}>
            {isVisible ? <FontAwesomeIcon icon={faCog} /> : <FontAwesomeIcon icon={faCog} />}
        </div>)}
        <div className={styles.blackbutton}>
            {!isVisible && (
                <>
                    {is480pVisible && <div className={styles.option} ref={hideRef} onClick={handleLinkClick480}>480p</div>}
                    {is720pVisible && <div className={styles.option} ref={hideRef} onClick={handleLinkClick720}>720p</div>}
                    {is1080pVisible && <div className={styles.option} ref={hideRef} onClick={handleLinkClick1080}>1080p</div>}
                </>
            )}
        </div>
    </div>
    </>
  )
}

export default Playerbtn