
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { navigationContext } from '../App';
import "../CSS/VideoDetail.css";
import { Icon } from '@mdi/react';
import { mdiShareOutline, mdiThumbUpOutline } from '@mdi/js';
import { doc, Firestore, setDoc, updateDoc, query, getDocs, where } from 'firebase/firestore';
import { database, fireStore } from '../Firebase';
import Main from './Main';


export default function VideoDetail() {
    const { changeLeftOpen, user, videos, setVideos } = useContext(navigationContext);
    const [video, setVideo] = useState({});
    const videoRef = useRef();
    const [comment, setComment] = useState('')
    const params = useParams();
    const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(() => {       
        const tempVideo = videos.find((ele) => ele.id === params.id);
        setVideo(tempVideo);
        const q = query(database.users, where("userId", "==", user.uid));
        const snapshot = getDocs(q).then((res) => {
            const data = [...res.docs];
            const firstData = data[0].data().subscribedChannels;
            firstData.includes(video?.id) ? setIsSubscribed(true) : setIsSubscribed(false);
        });
    });

    useEffect(() => {
        changeLeftOpen(false);
    },[]);

    function dateFormatter(data) {
        const date = new Date(data);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
    }

    function handleLike() {
        const tempDoc = doc(fireStore, "videos", video.videoId.toString());
        let tempArr = [...video.likes];
        if (video.likes.includes(user.uid)) {
            tempArr = tempArr.filter((ele) => ele !== user.uid);
        } else {
            tempArr = [...tempArr, user.uid];
        }
        updateDoc(tempDoc, {
            likes: tempArr,
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    }

    function handleShare() {
        navigator.clipboard.writeText(window.location.href);
    }

    function handleComment() {
        const tempDoc = doc(fireStore, "videos", video.videoId.toString());
        const payLoad = {
            userName: user.displayName,
            useProfile: user.photoURL,
            commentTime: new Date(),
            commentText: comment,
        }
        updateDoc(tempDoc, {
            comments: [...video.comments, payLoad],
        }).then((res) => {
            console.log(res);
            setComment("");
        }).catch((err) => {
            console.log(err);
        })
    }

    async function handleSubscribe() {
        const q = query(database.users, where("userId", "==", user.uid));
        const snapshot = await getDocs(q);
        const tempDoc = doc(fireStore, "users", snapshot.doc[0].id);
        let tempArr = [...snapshot.docs[0].data().subscribedChannels];
        if (tempArr.includes(video.id)) {
            tempArr = tempArr.filter((ele) => ele !== video.id);
        } else {
            tempArr = [...tempArr, video.id];
        }
        updateDoc(tempDoc, {
            subscribedChannels: tempArr,
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    }


    return (
        <div style={{display: 'flex'}}>
            <div className='video-detail-left'>
                <video src={video?.videoURL} ref={videoRef} autoPlay={true} className="video-player" controls></video>
                <div className='video-details-cont'>
                    <h3>{video?.displayName}</h3>
                    <div className='channel-details'>
                        <div className='channel-details-left'>
                            <img className='channel-image' src={video?.channelPhoto} alt={video?.channelName} />
                            <div>{video?.channelName}</div>
                            <button className='subscribe' onClick={handleSubscribe}>{isSubscribed ? 'Subscribed' : 'Subscribe'}</button>
                        </div>
                        <div className='channel-details-right'>
                            <button className='like-btn' onClick={handleLike}><Icon path={mdiThumbUpOutline} size={1} />{video?.likes?.length}</button>
                            <button className='share-btn' onClick={handleShare}><Icon path={mdiShareOutline} size={1} />Share</button>
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
                                <input className='new-comment-input' type='text' value={comment} placeholder='Add a Comment ...' onChange={(e) => setComment(e.target.value)} />
                            </div>    
                            <div style={{display: `${comment === '' ? 'none' : 'flex'}`, justifyContent: 'end'}}>
                                <button className='new-comment-action-btn-cancel' onClick={() => setComment("")}>Cancel</button>
                                <button className='new-comment-action-btn-comment' onClick={handleComment}>Comment</button>
                            </div>  
                        </div>
                        <div className='allComments'>
                            {
                                video?.comments?.map((ele, index) => {
                                    return(
                                        <div key={index} className="single-comment-cont">
                                            <img src={user?.photoURL} alt={ele?.userName} className="comment-channel-image" />
                                            <div>
                                                <div className='comment-user-creds'>{ele?.userName} <span style={{fontSize: '10px', fontWeight: '400'}}>{dateFormatter(ele?.commentTime?.toDate())}</span></div>
                                                <div style={{marginLeft: '10px'}}>{ele?.commentText}</div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className='video-detail-right'>
                <Main origin='videoDetail' />
            </div>
        </div>
    )
}

