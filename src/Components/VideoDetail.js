
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { navigationContext } from '../App';
import "../CSS/VideoDetail.css";
import { Icon } from '@mdi/react';
import { mdiShareOutline, mdiThumbUpOutline } from '@mdi/js';

export default function VideoDetail() {
    const { changeLeftOpen, user, videos, setVideos } = useContext(navigationContext);
    const [video, setVideo] = useState({});
    const videoRef = useRef();
    const [comment, setComment] = useState('')
    const params = useParams();

    useEffect(() => {
        changeLeftOpen(false);
        const tempVideo = videos.find((ele) => ele.id === params.id);
        setVideo(tempVideo);
        // videoRef.current.play();
    }, [])

    function dateFormatter(data) {
        const date = new Date(data);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    }

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
                    <div className='description'>
                        <div>{video?.views} Views  {dateFormatter(video?.createdAt?.toDate())}</div>
                        <div>{video?.description}</div>
                    </div>
                    <div className='comments'>
                        <div>{video?.comments?.length} Comments</div>
                        <div className='new-comment'>
                            <div className='new-comment-input-cont'>
                                <img src={user?.photoURL} alt={user?.displayName} className='channel-image' />
                                <input className='new-comment-input' type='text' placeholder='Add a Comment ...' onChange={(e) => setComment(e.target.value)} />
                            </div>    
                            <div style={{display: `${comment === '' ? 'none' : 'flex'}`, justifyContent: 'end'}}>
                                <button className='new-comment-action-btn-cancel'>Cancel</button>
                                <button className='new-comment-action-btn-comment'>Comment</button>
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
            <div className='video-detail-right'></div>
        </div>
    )
}

