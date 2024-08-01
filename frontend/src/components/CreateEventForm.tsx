import React from 'react';
import Input from './Input';
import { SmallInput } from './Input';
import { InputImg  } from './Input';
const CreateEventForm = () => {
  return (
    <div className="flex flex-col items-center mt-6 font-sans">
      <div className="text-3xl font-semibold mb-4">Create Event</div>
      <div className="w-full max-w-2xl mt-6">
        <Input title={"Event Title"} />
        <Input title={"Event Venue"} />
        <div className='flex space-x-4 mt-6 w-full'>

        <SmallInput title='Start Time'/>
        <SmallInput title='End Time'/>
        </div>
        <div className='flex space-x-4 mt-6 w-full'>

        <SmallInput title='Start Date'/>
        <SmallInput title='Start Date'/>
        </div>
        <div>
          <div><InputImg /></div>
        </div>
      </div>
    </div>
  );
}

export default CreateEventForm;
