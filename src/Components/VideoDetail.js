
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { navigationContext } from '../App';
import "../CSS/VideoDetail.css";

export default function VideoDetail() {
    const { changeLeftOpen, videos, setVideos } = useContext(navigationContext);
    const [video, setVideo] = useState({});
    const videoRef = useRef();
    const params = useParams();

    useEffect(() => {
        console.log(params.id);
        const tempVideo = videos.find((ele) => ele.id === params.id);
        setVideo(tempVideo);
        // videoRef.current.play();
    })

    return (
        <div>
        <div className='video-detail-left'>
            <video src={video?.videoURL} ref={videoRef} autoPlay={true} className="video-player" controls></video>
            <h3>{video?.displayName}</h3>
        </div>
        <div className='video-detail-right'></div>
        </div>
    )
}
