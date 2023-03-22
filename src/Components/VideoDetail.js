
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { navigationContext } from '../App';
import "../CSS/VideoDetail.css";
import { Icon } from '@mdi/react';
import { mdiShareOutline, mdiThumbUpOutline } from '@mdi/js';

export default function VideoDetail() {
    const { changeLeftOpen, videos, setVideos } = useContext(navigationContext);
    const [video, setVideo] = useState({});
    const videoRef = useRef();
    const params = useParams();

    useEffect(() => {
        changeLeftOpen(false);
        console.log(params.id);
        const tempVideo = videos.find((ele) => ele.id === params.id);
        setVideo(tempVideo);
        // videoRef.current.play();
    }, [])

    return (
        <div>
            <div className='video-detail-left'>
                <video src={video?.videoURL} ref={videoRef} autoPlay={true} className="video-player" controls></video>
                <div className='video-details-cont'>
                    <h3>{video?.displayName}</h3>
                    <div className='channel-details'>
                        <div className='channel-details-left'>
                            <img className='channel-image' src={video?.channelPhoto} alt={video?.channelName} />
                            <div>{video?.channelName}</div>
                            <button className='subscribe'>Subscribe</button>
                        </div>
                        <div className='channel-details-right'>
                            <button className='like-btn'><Icon path={mdiThumbUpOutline} size={1} />{video?.likes}</button>
                            <button className='share-btn'><Icon path={mdiShareOutline} size={1} />Share</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='video-detail-right'></div>
        </div>
    )
}

