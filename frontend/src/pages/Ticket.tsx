import { useLocation } from "react-router-dom";

const Ticket = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const ticketsParam = query.get("tickets");

  let tickets: { ticketTypeId: string; quantity: number }[] = [];
  if (ticketsParam) {
    try {
      tickets = JSON.parse(decodeURIComponent(ticketsParam));
    } catch (error) {
      console.error("Failed to parse tickets data:", error);
    }
  }

  return (
    <div className="max-w-5xl mx-auto my-12 px-6 py-8">
     {ticketsParam}
    </div>
  );
};

export default Ticket;
