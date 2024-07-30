import React from 'react'
import AppBar from './AppBar'
import EventBanner from './EventBanner'
import bannerimg from "../assets/card.png"
const EventPage = () => {
  return (
    <div>
       <div><AppBar/></div>

        <EventBanner img={bannerimg} />
    </div>
  )
}

export default EventPage


