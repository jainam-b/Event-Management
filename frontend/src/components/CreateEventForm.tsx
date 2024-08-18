import React, { useState, ChangeEvent, FormEvent } from 'react';
import Input from './Input';
import { SmallInput, BigInput } from './Input';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { BACKEND_URL, CLOUDINARY_CLOUD_NAME } from '../config';
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
    { name: 'Student', price: '100', totalQuantity: '100', availableQuantity: '100' }
  ]);

  const [startTime, setStartTime] = useState('2024-08-04T19:00:00Z');
  const [endTime, setEndTime] = useState('2024-08-04T22:00:00Z');
  const [eventDate, setEventDate] = useState<Date | null>(new Date('2024-03-04'));
  const [eventCategory, setEventCategory] = useState('Party');
  const [eventDescription, setEventDescription] = useState('SICSR fresher party');
  const [eventTitle, setEventTitle] = useState('Freshers');
  const [eventVenue, setEventVenue] = useState('The Mills');

  const [loading, setLoading] = useState(false);
  const [eventImage, setEventImage] = useState<File | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setEventImage(event.target.files[0]);
    }
  };

  async function uploadImageToCloudinary(image: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'ml_default');
    formData.append('folder', "Event");

    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (response.ok) {
      return result.secure_url;
    } else {
      throw new Error(result.error?.message || 'Unknown error occurred during upload');
    }
  }

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
    setLoading(true);

    let imageUrl = '';
    if (eventImage) {
      try {
        imageUrl = await uploadImageToCloudinary(eventImage);
      } catch (error) {
        console.error('Error uploading image:', error);
        toast.error('Error uploading image.');
        setLoading(false);
        return;
      }
    }

    const formatDate = (date: Date) => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
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
      imageUrl,
      category: eventCategory,
      organizer: 'Tech Events Ltd.',
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
      toast.success('Event created successfully!');
    } catch (error) {
      console.error('Error creating event:', error);
      toast.error('Error creating event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-6 font-sans">
      <div className="text-3xl font-semibold mb-4">Create Event</div>
      <div className="w-full max-w-2xl mt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
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
          <div className="flex space-x-4">
            <SmallInput
              title="Start Time"
              name="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
            <SmallInput
              title="End Time"
              name="endTime"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">Date</label>
            <DatePicker
              selected={eventDate}
              onChange={(date: Date | null) => setEventDate(date)}
              dateFormat="dd/MM/yyyy"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <SmallInput
            title="Event Category"
            name="eventCategory"
            value={eventCategory}
            onChange={(e) => setEventCategory(e.target.value)}
          />
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">Event Image</label>
            <input type="file" onChange={handleImageChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5" />
          </div>
          <BigInput
            title="Event Description"
            name="eventDescription"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
          />
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">Ticket Types</label>
            {ticketTypes.map((ticketType, index) => (
              <div key={index} className="flex items-center space-x-4 mb-4">
                <SmallInput
                  title="Ticket Name"
                  name="name"
                  value={ticketType.name}
                  onChange={(e) => handleTicketTypeChange(index, e)}
                />
                <SmallInput
                  title="Price"
                  name="price"
                  value={ticketType.price}
                  onChange={(e) => handleTicketTypeChange(index, e)}
                />
                <SmallInput
                  title="Total Quantity"
                  name="totalQuantity"
                  value={ticketType.totalQuantity}
                  onChange={(e) => handleTicketTypeChange(index, e)}
                />
                <SmallInput
                  title="Available Quantity"
                  name="availableQuantity"
                  value={ticketType.availableQuantity}
                  onChange={(e) => handleTicketTypeChange(index, e)}
                />
                <button
                  onClick={() => handleRemoveTicketType(index)}
                  className="text-red-500"
                  title="Remove Ticket Type"
                >
                  ✕
                </button>
              </div>
            ))}
            <button type="button" onClick={handleAddTicketType} className="bg-[#7848F4] text-white py-2 px-4 rounded">
              Add Ticket Type
            </button>
          </div>
          <button type="submit" className="w-full bg-[#7848F4] text-white py-2 px-4 rounded">
            Create Event
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateEventForm;
