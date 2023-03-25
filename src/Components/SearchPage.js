

import { mdiDotsVertical } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { navigationContext } from '../App';
import "../CSS/Main.css";
import { doc, updateDoc } from 'firebase/firestore';
import { fireStore } from '../Firebase';



export default function SearchPage(props) {
  const navigate = useNavigate();

  const { changeLeftOpen, searchedVideos, searchedChannels } = useContext(navigationContext);

  useEffect(() => {
    changeLeftOpen(true);
  }, []);

  function handleClick(id, element) {
    const tempDoc = doc(fireStore, "videos", element.videoId.toString())
    updateDoc(tempDoc, {
        views: element.views + 1 ,
    }).then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    })
    navigate(`/video/${id}`, {replace: true});
  }

    return (
        <div>
            <h1>Videos</h1>
            <div className={props.origin === 'videoDetail' ? '' : 'videos'}>
                {
                    searchedVideos.map((ele) => {
                        return (
                            <div key={ele.id} className="single-video" onClick={() => handleClick(ele.id, ele)}>
                                <img className='thumbnail-image' src={ele.thumbnailPhoto} alt={ele.displayName} />
                                <div className='video-details'>
                                    <img className='channel-image' src={ele.channelPhoto} alt={ele.channelName} />
                                    <h3 className='video-name'>{ele.displayName}</h3>
                                    <Icon path={mdiDotsVertical} size={1} style={{ cursor: 'pointer' }} />
                                </div>
                                <div className='channel-details'>
                                    <p>{ele.channelName}</p>
                                    <div>{ele.views} views . {ele.time}</div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <h1>Channels</h1>
            <div className={props.origin === 'videoDetail' ? '' : 'videos'}>
                {
                    searchedChannels.map((ele) => {
                        return (
                            <div key={ele.userId} className="single-video" >
                                <div className='video-details'>
                                    <img className='channel-image' src={ele.userProfile} alt={ele.userName} />
                                    <h6 className='channel-details'>{ele.userName}</h6>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
