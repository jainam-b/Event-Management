import React from "react";
import facebook from "../assets/facebook.png";
import insta from "../assets/insta.png";
import whatsapp from "../assets/whatsapp.png";

const EventLocation: React.FC = () => {
  return (
    <div className="font-sans">
      <div className="col-span-1 text-3xl font-medium">
        <div>Event Location</div>
        <div className="mt-4">
          {/* Google Maps Embed */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.925630681626!2d73.86834667528495!3d18.532262568816765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c109dadf6efd%3A0x95155f605ce5a6d8!2sThe%20Mills!5e0!3m2!1sen!2sin!4v1723567337765!5m2!1sen!2sin"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps Embed"
          ></iframe>
        </div>
      </div>
      <div>
        <div className="text-3xl mt-5">Dream World Wide in Jakarta</div>
        <div className="max-w-lg mt-2 font-thin">
          Dummy location generation model by RSU ... Our approach generates more realistic dummy locations
        </div>
      </div>
      <div>
        <div className="text-3xl mt-5">Share with friends</div>
        <div className="flex flex-row mt-2 space-x-4">
          <img className="w-8 h-8" src={facebook} alt="Facebook" />
          <img className="w-8 h-8" src={insta} alt="Instagram" />
          <img className="w-8 h-8" src={whatsapp} alt="WhatsApp" />
        </div>
      </div>
    </div>
  );
};

export default EventLocation;
