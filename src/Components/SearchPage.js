

import { mdiDotsVertical } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { navigationContext } from '../App';
import "../CSS/SearchPage.css";
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
        <div className='search-page'>
            { searchedVideos.length > 0 && <h1>Videos</h1> }
            <div className={props.origin === 'videoDetail' ? '' : 'search-videos'}>
                {
                    searchedVideos.map((ele) => {
                        return (
                            <div key={ele.id} className="video-div" onClick={() => handleClick(ele.id, ele)}>
                                <img className='thumbnail-img' src={ele.thumbnailPhoto} alt={ele.displayName} />
                                <div className='video-details'>
                                    <img className='channel-image' src={ele.channelPhoto} alt={ele.channelName} />
                                    <div className='name-details'>
                                        <h3 className='video-name'>{ele.displayName}</h3>
                                        <p className='channel-name'>{ele.channelName}</p>
                                        <p className='views-time'>{ele.views} views . { }</p>
                                    </div>
                                    <Icon className='three-dots' path={mdiDotsVertical} size={1} style={{ cursor: 'pointer' }} />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            { searchedChannels.length > 0 && <h1>Channels</h1> }
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
