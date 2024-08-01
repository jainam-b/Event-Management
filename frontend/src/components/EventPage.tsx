import React from 'react'
import AppBar from './AppBar'
import EventBanner from './EventBanner'
import bannerimg from "../assets/card.png"
import EventDescription from './EventDescription'
import EventLocation from './EventLocation'
 
const EventPage = () => {
  return (
    <div>
       <div><AppBar/></div>

        <EventBanner img={bannerimg} />
        <div className="grid grid-cols-2    ">
        <div><EventDescription/></div>
        <div><EventLocation/></div>

        </div>
    </div>
  )
}

export default EventPage


