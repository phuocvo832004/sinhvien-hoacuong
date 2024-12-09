import React, { useState, useEffect } from "react";
import ReactFlow, { MiniMap, Controls, Background } from "reactflow";
import "reactflow/dist/style.css";
import events from "../data/events";
import EventNode from "./EventNode";
import EventModal from "./EventModal";

const Timeline = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openModal = (event) => {
    if (isModalOpen) return;
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setModalOpen(false);
  };

  const nodes = events.map((event, index) => ({
    id: `${event.id}`,
    position: { x: index * 350, y: 50 }, 
    data: {
      label: <EventNode event={event} onSelect={openModal} />,
    },
    style: {
      background: "#ffffff", 
      borderRadius: "8px", 
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", 
      padding: "10px",
      border: "1px solid #ddd",
    },
  }));

  const edges = events.slice(1).map((event, index) => ({
    id: `e${events[index].id}-${event.id}`,
    source: `${events[index].id}`,
    target: `${event.id}`,
    animated: true,
    style: {
      stroke: "#4A90E2", 
      strokeWidth: 2,
    },
  }));

  return (
    <div className="timeline-container" style={{ height: "100%", width: "100%" }}>
    <div
      style={{
        height: `calc(${windowDimensions.height}px - 140px)`,
        width: `calc(${windowDimensions.width}px - 40px)`,
        background: "#f3f4f6",
        borderRadius: "12px",
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        style={{
          background: "linear-gradient(135deg, #e8eaf6, #f3f4f6)",
        }}
      >
        <MiniMap style={{ background: "#fff" }} />
        <Controls />
        <Background color="#ddd" gap={16} />
      </ReactFlow>
    </div>
    <EventModal isOpen={isModalOpen} onClose={closeModal} event={selectedEvent} />
  </div>
  
  );
};

export default Timeline;
