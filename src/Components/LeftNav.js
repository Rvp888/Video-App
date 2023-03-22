
import { mdiAccessPoint, mdiAccountCircleOutline, mdiFaceWomanShimmerOutline, mdiFire, mdiHistory, mdiHome, mdiLightbulbOutline, mdiMovieOpen, mdiMusicNoteOutline, mdiNewspaperVariantOutline, mdiPlayBoxMultipleOutline, mdiShoppingOutline, mdiTrophyOutline, mdiVideoOutline, mdiYoutubeGaming, mdiYoutubeStudio, mdiYoutubeSubscription } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';
import "../CSS/LeftNav.css";

export default function LeftNav() {
  return (
    <div className='left-sidebar'>
      <div><Icon path={mdiHome} size={1}/>Home</div>
      <div><Icon path={mdiVideoOutline} size={1} />Shorts</div>
      <div><Icon path={mdiYoutubeSubscription} size={1} />Subscriptions</div>
      <hr></hr>
      <div><Icon path={mdiPlayBoxMultipleOutline} size={1} />Library</div>
      <div><Icon path={mdiHistory} size={1} />History</div>
      <hr></hr>
      <div>Sign in to like videos, comment, and subscribe.<button className='signin-btn' ><Icon path={mdiAccountCircleOutline} size={1} color="blue" />Sign in</button></div>
      <hr></hr> 
      <h1>Explore</h1>
      <div><Icon path={mdiFire} size={1} />Trending</div>
      <div><Icon path={mdiShoppingOutline} size={1} />Shopping</div>
      <div><Icon path={mdiMusicNoteOutline} size={1} />Music</div>
      <div><Icon path={mdiMovieOpen} size={1} />Movies</div>
      <div><Icon path={mdiAccessPoint} size={1} />Live</div>
      <div><Icon path={mdiYoutubeGaming} size={1} />Gaming</div>
      <div><Icon path={mdiNewspaperVariantOutline} size={1} />News</div>
      <div><Icon path={mdiTrophyOutline} size={1} />Sports</div>
      <div><Icon path={mdiLightbulbOutline} size={1} />Learning</div>
      <div><Icon path={mdiFaceWomanShimmerOutline} size={1} />Fashion & Beauty</div>
      <hr></hr>
      <div>Browse channels</div>
    </div>
  )
}
