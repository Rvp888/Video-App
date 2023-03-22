
import { mdiDotsVertical } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useContext, useEffect, useState } from 'react';
import { navigationContext } from '../App';
import "../CSS/Main.css";


export default function Main() {
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
  ])

  const [videos, setVideos] = useState([
    {
      id: 1,
      displayName: 'Ratan Tata Leaves The Audience SPEECHLESS | One of the Best Motivational Speeches Ever',
      channelName: 'STILL I RISE Motivation',
      views: 4500,
      time: '1 hour ago',
      thumbnailImage: 'https://i.ytimg.com/vi/7m4zQpf3Ouo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBviCHdDD3RuJ5YE3JgipC46GofYw',
      videoURL: 'https://www.youtube.com/watch?v=7m4zQpf3Ouo',
      channelPhoto: 'https://yt3.ggpht.com/WcvwVz9rSIwPd3hB_yE2sw8PGndX1IjD1cZKxwc-k_QYK_ntSqZRpJhJcEJHAG7o6w597-etPA=s68-c-k-c0x00ffffff-no-rj',
    },
    {
      id: 2,
      displayName: 'Ratan Tata Leaves The Audience SPEECHLESS | One of the Best Motivational Speeches Ever',
      channelName: 'STILL I RISE Motivation',
      views: 4500,
      time: '1 hour ago',
      thumbnailImage: 'https://i.ytimg.com/vi/7m4zQpf3Ouo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBviCHdDD3RuJ5YE3JgipC46GofYw',
      videoURL: 'https://www.youtube.com/watch?v=7m4zQpf3Ouo',
      channelPhoto: 'https://yt3.ggpht.com/WcvwVz9rSIwPd3hB_yE2sw8PGndX1IjD1cZKxwc-k_QYK_ntSqZRpJhJcEJHAG7o6w597-etPA=s68-c-k-c0x00ffffff-no-rj',
    },
    {
      id: 3,
      displayName: 'Ratan Tata Leaves The Audience SPEECHLESS | One of the Best Motivational Speeches Ever',
      channelName: 'STILL I RISE Motivation',
      views: 4500,
      time: '1 hour ago',
      thumbnailImage: 'https://i.ytimg.com/vi/7m4zQpf3Ouo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBviCHdDD3RuJ5YE3JgipC46GofYw',
      videoURL: 'https://www.youtube.com/watch?v=7m4zQpf3Ouo',
      channelPhoto: 'https://yt3.ggpht.com/WcvwVz9rSIwPd3hB_yE2sw8PGndX1IjD1cZKxwc-k_QYK_ntSqZRpJhJcEJHAG7o6w597-etPA=s68-c-k-c0x00ffffff-no-rj',
    },
    {
      id: 4,
      displayName: 'Ratan Tata Leaves The Audience SPEECHLESS | One of the Best Motivational Speeches Ever',
      channelName: 'STILL I RISE Motivation',
      views: 4500,
      time: '1 hour ago',
      thumbnailImage: 'https://i.ytimg.com/vi/7m4zQpf3Ouo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBviCHdDD3RuJ5YE3JgipC46GofYw',
      videoURL: 'https://www.youtube.com/watch?v=7m4zQpf3Ouo',
      channelPhoto: 'https://yt3.ggpht.com/WcvwVz9rSIwPd3hB_yE2sw8PGndX1IjD1cZKxwc-k_QYK_ntSqZRpJhJcEJHAG7o6w597-etPA=s68-c-k-c0x00ffffff-no-rj',
    },
    {
      id: 5,
      displayName: 'Ratan Tata Leaves The Audience SPEECHLESS | One of the Best Motivational Speeches Ever',
      channelName: 'STILL I RISE Motivation',
      views: 4500,
      time: '1 hour ago',
      thumbnailImage: 'https://i.ytimg.com/vi/7m4zQpf3Ouo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBviCHdDD3RuJ5YE3JgipC46GofYw',
      videoURL: 'https://www.youtube.com/watch?v=7m4zQpf3Ouo',
      channelPhoto: 'https://yt3.ggpht.com/WcvwVz9rSIwPd3hB_yE2sw8PGndX1IjD1cZKxwc-k_QYK_ntSqZRpJhJcEJHAG7o6w597-etPA=s68-c-k-c0x00ffffff-no-rj',
    },
    {
      id: 6,
      displayName: 'Ratan Tata Leaves The Audience SPEECHLESS | One of the Best Motivational Speeches Ever',
      channelName: 'STILL I RISE Motivation',
      views: 4500,
      time: '1 hour ago',
      thumbnailImage: 'https://i.ytimg.com/vi/7m4zQpf3Ouo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBviCHdDD3RuJ5YE3JgipC46GofYw',
      videoURL: 'https://www.youtube.com/watch?v=7m4zQpf3Ouo',
      channelPhoto: 'https://yt3.ggpht.com/WcvwVz9rSIwPd3hB_yE2sw8PGndX1IjD1cZKxwc-k_QYK_ntSqZRpJhJcEJHAG7o6w597-etPA=s68-c-k-c0x00ffffff-no-rj',
    },
  ])

  const { changeLeftOpen } = useContext(navigationContext);

  useEffect(() => {
      changeLeftOpen(true);
  }, []);

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
              <div key={ele.id} className="single-video">
                <img className='thumbnail-image' src={ele.thumbnailImage} alt={ele.displayName} />
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
