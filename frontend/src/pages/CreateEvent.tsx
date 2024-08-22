
import CreateEventForm from '../components/CreateEventForm'
 
import AppBar from '../components/AppBar'
import Footer from '../components/Footer'

const CreateEvent = () => {
  return (
    <div>
        <AppBar/>
      <CreateEventForm/>
      <div>
        <Footer/>
      </div>
    </div>
  )
}

export default CreateEvent
