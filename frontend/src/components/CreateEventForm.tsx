import React, { useState, ChangeEvent } from 'react';
import Input from './Input';
import { SmallInput, BigInput } from './Input';
import { InputImg } from './Input';

// Define a type for the ticket type
type TicketType = {
  name: string;
  price: string;
  totalQuantity: string;
  availableQuantity: string;
};

const CreateEventForm: React.FC = () => {
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([
    { name: '', price: '', totalQuantity: '', availableQuantity: '' }
  ]);

  const handleTicketTypeChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newTicketTypes = [...ticketTypes];
    newTicketTypes[index] = { ...newTicketTypes[index], [name]: value };
    setTicketTypes(newTicketTypes);
  };

  const handleAddTicketType = () => {
    setTicketTypes([...ticketTypes, { name: '', price: '', totalQuantity: '', availableQuantity: '' }]);
  };

  return (
    <div className="flex flex-col items-center mt-6 font-sans">
      <div className="text-3xl font-semibold mb-4">Create Event</div>
      <div className="w-full max-w-2xl mt-6">
        <Input title={"Event Title"} />
        <Input title={"Event Venue"} />
        <div className='flex space-x-4 mt-6 w-full'>
          <SmallInput title='Start Time' name='startTime' value='' onChange={() => {}} />
          <SmallInput title='End Time' name='endTime' value='' onChange={() => {}} />
        </div>
        <div className='flex space-x-4 mt-6 w-full'>
          <SmallInput title='Event Date' name='eventDate' value='' onChange={() => {}} />
          <SmallInput title='Event Category' name='eventCategory' value='' onChange={() => {}} />
        </div>
        <div className='mt-10'>
          <div className='mb-3'>Event Image </div>
          <div><InputImg /></div>
        </div>
        <div className='mt-10'>
          <BigInput title='Event Description' name='eventDescription' value='' onChange={() => {}} />
        </div>
        <div className='mt-10'>
          <div className='mb-3'>Ticket Types</div>
          {ticketTypes.map((ticketType, index) => (
            <div key={index} className='flex space-x-4 mt-6 w-full'>
              <SmallInput 
                title='Ticket Name' 
                name='name' 
                value={ticketType.name} 
                onChange={(e) => handleTicketTypeChange(index, e)} 
              />
              <SmallInput 
                title='Price' 
                name='price' 
                value={ticketType.price} 
                onChange={(e) => handleTicketTypeChange(index, e)} 
              />
              <SmallInput 
                title='Total Quantity' 
                name='totalQuantity' 
                value={ticketType.totalQuantity} 
                onChange={(e) => handleTicketTypeChange(index, e)} 
              />
              <SmallInput 
                title='Available Quantity' 
                name='availableQuantity' 
                value={ticketType.availableQuantity} 
                onChange={(e) => handleTicketTypeChange(index, e)} 
              />
            </div>
          ))}
          <button onClick={handleAddTicketType} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
            Add Ticket Type
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateEventForm;
