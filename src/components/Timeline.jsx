import React, { useState, useEffect } from "react";
import ReactFlow, { MiniMap, Controls, Background } from "reactflow";
import "reactflow/dist/style.css";
import { db } from "../../firebase-config.js";
import { collection, getDocs, addDoc } from "firebase/firestore";
import EventNode from "./EventNode";
import EventModal from "./EventModal"; 
import EventFormModal from "./EventFormModal";
const Timeline = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState([]);  // Dùng state để lưu events từ Firebase
  const [newEvent, setNewEvent] = useState({
    title: "",
    year: "",
    description: "",
    image: "",
    activities: [{ title: "", description: "", image: "" }],
  }); // Lưu thông tin sự kiện mới
  const [isFormModalOpen, setIsFormModalOpen] = useState(false); // Quản lý trạng thái modal nhập liệu
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

  // Fetch events từ Firebase khi component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsRef = collection(db, "events");
        const snapshot = await getDocs(eventsRef);
        const eventsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setEvents(eventsData);  // Lưu dữ liệu vào state
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []); // Chạy 1 lần khi component mount

  const openModal = (event) => {
    if (isModalOpen) return;
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setModalOpen(false);
  };

  // Hàm thêm sự kiện mới
  const addEvent = async () => {
    try {
      const newEventData = {
        title: newEvent.title,
        year: newEvent.year,
        description: newEvent.description,
        image: newEvent.image,  
        activities: newEvent.activities,
      };

      const docRef = await addDoc(collection(db, "events"), newEventData);
      console.log("Document written with ID: ", docRef.id);
      setEvents((prevEvents) => [
        ...prevEvents,
        { id: docRef.id, ...newEventData }
      ]);
      setIsFormModalOpen(false); 
    } catch (error) {
      console.error("Error adding event: ", error);
    }
  };

  // Hàm cập nhật thông tin sự kiện mới
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Hàm cập nhật thông tin hoạt động
  const handleActivityChange = (index, e) => {
    const { name, value } = e.target;
    const updatedActivities = [...newEvent.activities];
    updatedActivities[index] = { ...updatedActivities[index], [name]: value };
    setNewEvent({ ...newEvent, activities: updatedActivities });
  };

  // Hàm thêm hoạt động mới
  const addActivity = () => {
    setNewEvent({
      ...newEvent,
      activities: [...newEvent.activities, { title: "", description: "", image: "" }],
    });
  };

  // Tạo nodes từ events state
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
      width: "200px", // Tăng chiều rộng node
      minHeight: "100px",
    },
  }));

  // Tạo edges từ events state
  const edges = events.map((event, index) => {
    if (index === 0) return null; // Không tạo edge cho sự kiện đầu tiên
    return {
      id: `e${events[index - 1].id}-${event.id}`, // Đảm bảo kết nối từ sự kiện trước đó
      source: `${events[index - 1].id}`,
      target: `${event.id}`,
      animated: true,
      style: {
        stroke: "#4A90E2",
        strokeWidth: 2,
      },
    };
  }).filter(edge => edge !== null);

  return (
    <div className="h-full w-full relative timeline-container">
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
        
        {/* Nút thêm sự kiện */}
        <button
          onClick={() => setIsFormModalOpen(true)}  // Mở modal nhập liệu
          className="absolute top-5 right-5 bg-[#fc536c] text-white py-2 px-4 rounded-lg transform transition-transform duration-300 hover:bg-[#cc043d] hover:scale-90"
        >
          Thêm sự kiện
        </button>
      </div>
      
      <EventFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        newEvent={newEvent}
        handleInputChange={handleInputChange}
        handleActivityChange={handleActivityChange}
        addActivity={addActivity}
        addEvent={addEvent}
      />
      
      <EventModal isOpen={isModalOpen} onClose={closeModal} event={selectedEvent} />
    </div>
  );
};

export default Timeline;
