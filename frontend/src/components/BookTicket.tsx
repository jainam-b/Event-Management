import AppBar from "./AppBar"
import Heading from "../components/Book-ticket/Heading"
import { useParams } from "react-router-dom"
import { useEventById } from "../hooks/event"
import TicketType from "../components/Book-ticket/TIcketType"
const BookTicket = () => {
    const {eventId} = useParams();
     
    
  return (
    <div>
      <AppBar/>
      <Heading eventTitle="Stree 2"/>
      <TicketType eventId={eventId} />
    </div>
  )
}

export default BookTicket
