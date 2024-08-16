import React, { useState, ChangeEvent, FormEvent } from 'react';
import Input from './Input';
import { SmallInput, BigInput, InputImg } from './Input';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import Spinner from '../components/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


type TicketType = {
  name: string;
  price: string;
  totalQuantity: string;
  availableQuantity: string;
};

const CreateEventForm: React.FC = () => {
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([
    { name: 'student', price: '100', totalQuantity: '100', availableQuantity: '100' }
  ]);

  const [startTime, setStartTime] = useState('2024-08-04T19:00:00Z');
  const [endTime, setEndTime] = useState('2024-08-04T22:00:00Z');
  const [eventDate, setEventDate] = useState<Date | null>(new Date('2024-03-04'));
  const [eventCategory, setEventCategory] = useState('Party');
  const [eventDescription, setEventDescription] = useState('SICSR fresher party');
  const [eventTitle, setEventTitle] = useState('Freshers');
  const [eventVenue, setEventVenue] = useState('The Mills');

  const [loading, setLoading] = useState(false); // Initialize to false

  const handleTicketTypeChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newTicketTypes = [...ticketTypes];
    newTicketTypes[index] = { ...newTicketTypes[index], [name]: value };
    setTicketTypes(newTicketTypes);
  };

  const handleAddTicketType = () => {
    setTicketTypes([...ticketTypes, { name: '', price: '', totalQuantity: '', availableQuantity: '' }]);
  };

  const handleRemoveTicketType = (index: number) => {
    const newTicketTypes = ticketTypes.filter((_, i) => i !== index);
    setTicketTypes(newTicketTypes);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true); // Set loading to true when submission starts

    const formatDate = (date: Date) => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    const eventData = {
      name: eventTitle,
      description: eventDescription,
      location: eventVenue,
      date: formatDate(new Date()) || '02/02/2024',
      startTime: new Date(startTime).toISOString(),
      endTime: new Date(endTime).toISOString(),
      category: eventCategory,
      organizer: 'Tech Events Ltd.', // Replace with dynamic value if needed
      ticketTypes: ticketTypes.map(ticket => ({
        ...ticket,
        price: parseFloat(ticket.price),
        totalQuantity: parseInt(ticket.totalQuantity, 10),
        availableQuantity: parseInt(ticket.availableQuantity, 10),
      })),
    };

    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/events/create`, eventData, { withCredentials: true });
      console.log('Event created successfully:', response.data);
      setTimeout(() => {
        setLoading(false);
        toast.success('Event created successfully!');
      }, 500); // 500ms delay
      // Handle successful event creation (e.g., redirect or show a success message)
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error('Error creating event. Please try again.');
      // Handle error (e.g., show an error message)
    } finally {
      setLoading(false); // Set loading to false when form submission is complete
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center flex-col h-screen ">
        <div className="flex justify-center">
          <div>
            <Spinner />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-6 font-sans">
      <div className="text-3xl font-semibold mb-4">Create Event</div>
      <div className="w-full max-w-2xl mt-6">
        <form onSubmit={handleSubmit}>
          <Input
            title="Event Title"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
          />
          <Input
            title="Event Venue"
            value={eventVenue}
            onChange={(e) => setEventVenue(e.target.value)}
          />
          <div className='flex space-x-4 mt-6 w-full'>
            <SmallInput 
              title='Start Time' 
              name='startTime' 
              value={startTime} 
              onChange={(e) => setStartTime(e.target.value)} 
            />
            <SmallInput 
              title='End Time' 
              name='endTime' 
              value={endTime} 
              onChange={(e) => setEndTime(e.target.value)} 
            />
          </div>
          <div className='flex flex-col mt-6 w-full'>
            <div className='mb-2 text-sm font-medium text-gray-900'>Date</div>
            <DatePicker
              selected={eventDate}
              onChange={(date: Date | null) => setEventDate(date)}
              dateFormat="dd/MM/yyyy"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div className='flex space-x-4 mt-6 w-full'>
            <SmallInput 
              title='Event Category' 
              name='eventCategory' 
              value={eventCategory} 
              onChange={(e) => setEventCategory(e.target.value)} 
            />
          </div>
          <div className='mt-10'>
            <div className='mb-3'>Event Image </div>
            <div><InputImg  /></div>
          </div>
          <div className='mt-10'>
            <BigInput 
              title='Event Description' 
              name='eventDescription' 
              value={eventDescription} 
              onChange={(e) => setEventDescription(e.target.value)} 
            />
          </div>
          <div className='mt-10'>
            <div className='mb-3 text-lg font-medium'>Ticket Types</div>
            {ticketTypes.map((ticketType, index) => (
              <div key={index} className='flex items-center space-x-4 mt-6 w-full'>
                <div className='flex-1'>
                  <SmallInput 
                    title='Ticket Name' 
                    name='name' 
                    value={ticketType.name} 
                    onChange={(e) => handleTicketTypeChange(index, e)} 
                  />
                </div>
                <div className='flex-1'>
                  <SmallInput 
                    title='Price' 
                    name='price' 
                    value={ticketType.price} 
                    onChange={(e) => handleTicketTypeChange(index, e)} 
                  />
                </div>
                <div className='flex-1'>
                  <SmallInput 
                    title='Total Quantity' 
                    name='totalQuantity' 
                    value={ticketType.totalQuantity} 
                    onChange={(e) => handleTicketTypeChange(index, e)} 
                  />
                </div>
                <div className='flex-1'>
                  <SmallInput 
                    title='Available Quantity' 
                    name='availableQuantity' 
                    value={ticketType.availableQuantity} 
                    onChange={(e) => handleTicketTypeChange(index, e)} 
                  />
                </div>
                <button 
                  onClick={() => handleRemoveTicketType(index)} 
                  className='text-red-500 ml-2 mt-5'
                  title='Remove Ticket Type'
                >
                  ✕
                </button>
              </div>
            ))}
            <button type="button" onClick={handleAddTicketType} className="mt-4 bg-[#7848F4] text-white py-2 px-4 rounded">
              Add Ticket Type
            </button>
          </div>
          <button type="submit" className="mt-10 w-full bg-[#7848F4] text-white py-2 px-4 text-xl rounded">
            Create Event 
          </button>
        </form>
      </div>
        <ToastContainer />
     
    </div>
  );
}

export default CreateEventForm;
