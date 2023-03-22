
import { mdiDotsVertical } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { navigationContext } from '../App';
import "../CSS/Main.css";



export default function Main() {
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
  ]);

  const { changeLeftOpen, videos, setVideos } = useContext(navigationContext);

  useEffect(() => {
    changeLeftOpen(true);
  }, []);

  function handleClick(id) {
    navigate(`/video/${id}`, {replace:true});
  }

  return (
    <div>
      <div className='tags'>
        {
          tags.map((ele, index) => {
            return (
              <div key={index} className={`single-tag ${ele.selected ? 'selected-tag' : ''}`}>{ele.name}</div>
            )
          })
        }
      </div>
      <div className='videos'>
        {
          videos.map((ele) => {
            return (
              <div key={ele.id} className="single-video" onClick={() => handleClick(ele.id)}>
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
    </div>
  )
}
