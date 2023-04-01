
import { mdiDotsVertical } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { navigationContext } from '../App';
import "../CSS/Main.css";
import { doc, updateDoc } from 'firebase/firestore';
import { fireStore } from '../Firebase';



export default function Main(props) {
  const navigate = useNavigate();

  const [tags, setTags] = useState([
    {
      name: 'All',
      selected: true,
    },
    {
      name: 'Music',
      selected: false,
    },
    {
      name: 'Gaming',
      selected: false,
    },
    {
      name: 'Scene',
      selected: false,
    },
    {
      name: 'Live',
      selected: false,
    },
    {
      name: 'Arijit Singh',
      selected: false,
    },
    {
      name: 'Dramedy',
      selected: false,
    },
    {
      name: 'React routers',
      selected: false,
    },
    {
      name: 'News',
      selected: false,
    },
    {
      name: 'Awards',
      selected: false,
    },
    {
      name: 'Comedy',
      selected: false,
    },
    {
      name: 'T-Series',
      selected: false,
    },
    {
      name: 'Cricket',
      selected: false,
    },
    {
      name: 'Stock Market',
      selected: false,
    },
    
  ]);

  const { changeLeftOpen, videos, setVideos } = useContext(navigationContext);

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
      <div className='tags' style={{ width: props.origin ? '350px' : '' }}>
        {
          tags.map((ele, index) => {
            return (
              <div key={index} className={`single-tag ${ele.selected ? 'selected-tag' : ''}`}>{ele.name}</div>
            )
          })
        }
      </div>
      <div className={props.origin === 'videoDetail' ? '' : 'videos'}>
        {
          videos.map((ele) => {
            // console.log(ele.createdAt.toDate())
            return (
              <div key={ele.id} className="single-video" onClick={() => handleClick(ele.id, ele)}>
                <img className='thumbnail-image' src={ele.thumbnailPhoto} alt={ele.displayName} />
                <div className='video-details'>
                  <img className='channel-image' src={ele.channelPhoto} alt={ele.channelName} />
                  <div className='name-details'>
                    <h3 className='video-name'>{ele.displayName}</h3>
                    <p className='channel-name'>{ele.channelName}</p>
                    <p className='views-time'>{ele.views} views . {ele.createdAt.toDate().toString().slice(0, 15)}</p>
                  </div>
                  <Icon className='three-dots' path={mdiDotsVertical} size={1} style={{ cursor: 'pointer' }} />
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
