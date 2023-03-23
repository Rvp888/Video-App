
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { navigationContext } from '../App';
import "../CSS/VideoDetail.css";
import { Icon } from '@mdi/react';
import { mdiShareOutline, mdiThumbUpOutline } from '@mdi/js';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { fireStore } from '../Firebase';


export default function VideoDetail() {
    const { changeLeftOpen, user, videos, setVideos } = useContext(navigationContext);
    const [video, setVideo] = useState({});
    const videoRef = useRef();
    const [comment, setComment] = useState('')
    const params = useParams();

    useEffect(() => {       
        const tempVideo = videos.find((ele) => ele.id === params.id);
        setVideo(tempVideo);
    }, [])

    useEffect(() => {
        changeLeftOpen(false);
    },[])

    function dateFormatter(data) {
        const date = new Date(data);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    }

    function handleLike() {
        const tempDoc = doc(fireStore, 'videos', video?.videoId);
        updateDoc(tempDoc, {
            likes: [...video?.likes, user?.id]
        })
    }

    return (
        <div>
            <div className='video-detail-left'>
                <video src={video?.data?.videoURL} ref={videoRef} autoPlay={true} className="video-player" controls></video>
                <div className='video-details-cont'>
                    <h3>{video?.data?.displayName}</h3>
                    <div className='channel-details'>
                        <div className='channel-details-left'>
                            <img className='channel-image' src={video?.data?.channelPhoto} alt={video?.data?.channelName} />
                            <div>{video?.data?.channelName}</div>
                            <button className='subscribe'>Subscribe</button>
                        </div>
                        <div className='channel-details-right'>
                            <button className='like-btn' onClick={handleLike}><Icon path={mdiThumbUpOutline} size={1} />{video?.data?.likes?.length}</button>
                            <button className='share-btn'><Icon path={mdiShareOutline} size={1} />Share</button>
                        </div>
                    </div>
                    <div className='description'>
                        <div>{video?.data?.views} Views  {dateFormatter(video?.data?.createdAt?.toDate())}</div>
                        <div>{video?.data?.description}</div>
                    </div>
                    <div className='comments'>
                        <div>{video?.data?.comments?.length} Comments</div>
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

