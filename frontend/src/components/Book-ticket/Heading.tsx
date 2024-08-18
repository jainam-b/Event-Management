const BookTicketHeading = ({ eventTitle }:{eventTitle:string}) => {
  return (
    <div className="text-center mt-8 font-sans">
      <h1 className="text-7xl font-bold text-gray-800">
        {eventTitle}
      </h1>
    </div>
  );
};

export default BookTicketHeading;
