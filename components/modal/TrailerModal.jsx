import React from 'react'

const TrailerModal = ({ trailer, setShowTrailerModal }) => {
    React.useEffect(() => {
        document.querySelector('video').setAttribute('oncontextmenu', "return false;")
    })
    return (
        <div className='trailerModal'>
            <div className='trailerModalContent'>
                <div className='trailerModalHeader'>
                    <span onClick={() => setShowTrailerModal(false)}>x</span>
                </div>
                <div className='trailerModalBody'>
                    <video
                        controlsList='nodownload noplaybackrate'
                        autoPlay
                        controls
                        disablePictureInPicture>
                        <source src={trailer} type='video/mp4' />
                    </video>
                </div>
            </div>
        </div>
    )
}

export default TrailerModal