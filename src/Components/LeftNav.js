
import { mdiAccessPoint, mdiAccountCircleOutline, mdiAlert, mdiCarSettings, mdiClock, mdiClockAlertOutline, mdiClockOutline, mdiCogOutline, mdiFaceWomanShimmerOutline, mdiFire, mdiFlagOutline, mdiHelpCircleOutline, mdiHistory, mdiHome, mdiLightbulbOutline, mdiMessageAlertOutline, mdiMovieOpen, mdiMusicNoteOutline, mdiNewspaperVariantOutline, mdiPlayBoxMultipleOutline, mdiPlayBoxOutline, mdiPlayCircle, mdiPlusCircleOutline, mdiShoppingOutline, mdiStarSettingsOutline, mdiTeddyBear, mdiThumbUpOutline, mdiTrophyOutline, mdiVideoOutline, mdiYoutube, mdiYoutubeGaming, mdiYoutubeStudio, mdiYoutubeSubscription } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';
import "../CSS/LeftNav.css";

export default function LeftNav() {
  return (
    <div className='left-sidebar'>
      <div><Icon path={mdiHome} size={1} className='leftSidebar-icon' />Home</div>
      <div><Icon path={mdiVideoOutline} size={1} className='leftSidebar-icon' />Shorts</div>
      <div><Icon path={mdiYoutubeSubscription} size={1} className='leftSidebar-icon' />Subscriptions</div>
      <hr></hr>
      <div><Icon path={mdiPlayBoxMultipleOutline} size={1} className='leftSidebar-icon' />Library</div>
      <div><Icon path={mdiHistory} size={1} className='leftSidebar-icon' />History</div>
      <div><Icon path={mdiPlayBoxOutline} size={1} className='leftSidebar-icon' />Your videos</div>
      <div><Icon path={mdiClockOutline} size={1} className='leftSidebar-icon' />Watch later</div>
      <div><Icon path={mdiThumbUpOutline} size={1} className='leftSidebar-icon' />Liked videos</div>
      <hr></hr>
      <p className='left-sidebar-heading' >Explore</p>
      <div><Icon path={mdiFire} size={1} className='leftSidebar-icon' />Trending</div>
      <div><Icon path={mdiShoppingOutline} size={1} className='leftSidebar-icon' />Shopping</div>
      <div><Icon path={mdiMusicNoteOutline} size={1} className='leftSidebar-icon' />Music</div>
      <div><Icon path={mdiMovieOpen} size={1} className='leftSidebar-icon' />Movies</div>
      <div><Icon path={mdiAccessPoint} size={1} className='leftSidebar-icon' />Live</div>
      <div><Icon path={mdiYoutubeGaming} size={1} className='leftSidebar-icon' />Gaming</div>
      <div><Icon path={mdiNewspaperVariantOutline} size={1} className='leftSidebar-icon' />News</div>
      <div><Icon path={mdiTrophyOutline} size={1} className='leftSidebar-icon' />Sports</div>
      <div><Icon path={mdiLightbulbOutline} size={1} className='leftSidebar-icon' />Learning</div>
      <div><Icon path={mdiFaceWomanShimmerOutline} size={1} className='leftSidebar-icon' />Fashion & Beauty</div>
      <hr></hr>
      <div><Icon path={mdiPlusCircleOutline} size={1} className='leftSidebar-icon' />Browse channels</div>
      <hr></hr>
      <p className='left-sidebar-heading' >More from YouTube</p>
      <div><Icon path={mdiYoutube} size={1} className='leftSidebar-icon' color='red' />YouTube Premium</div>
      <div><Icon path={mdiYoutubeStudio} size={1} className='leftSidebar-icon' color='red' />YouTube Studio</div>
      <div><Icon path={mdiPlayCircle} size={1} className='leftSidebar-icon' color='red' />YouTube Music</div>
      <div><Icon path={mdiTeddyBear} size={1} className='leftSidebar-icon' color='red' />YouTube Kids</div>
      <hr></hr>
      <div><Icon path={mdiCogOutline} size={1} className='leftSidebar-icon' />Settings</div>
      <div><Icon path={mdiFlagOutline} size={1} className='leftSidebar-icon' />Report history</div>
      <div><Icon path={mdiHelpCircleOutline} size={1} className='leftSidebar-icon' />Help</div>
      <div><Icon path={mdiMessageAlertOutline} size={1} className='leftSidebar-icon' />Send feedback</div>
      <hr></hr>
    </div>
  )
}
