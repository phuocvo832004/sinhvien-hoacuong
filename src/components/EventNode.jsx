import React from "react";

const EventNode = ({ event, onSelect }) => {
  return (
    <div
      className="event-node cursor-pointer p-4 bg-blue-100 border rounded shadow-md"
      onClick={() => onSelect(event)}
    >
      <h3 className="font-bold text-lg">{event.year}</h3>
      <p className="text-sm">{event.title}</p>
    </div>
  );
};

export default EventNode;
