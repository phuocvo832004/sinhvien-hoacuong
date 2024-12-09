import React, { useState } from "react";
import Modal from "react-modal";
import "../App.css";
Modal.setAppElement("#root");

const EventModal = ({ isOpen, onClose, event }) => {
  const [selectedActivity, setSelectedActivity] = useState(0);
  const [imageModal, setImageModal] = useState({ isOpen: false, src: "" });

  if (!event) return null;

  const handleActivityClick = (index) => {
    setSelectedActivity(index);
  };

  const openImageModal = (src) => {
    setImageModal({ isOpen: true, src });
  };

  const closeImageModal = () => {
    setImageModal({ isOpen: false, src: "" });
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        className="event-modal"
        overlayClassName="modal-overlay"
      >
        <div className="flex flex-col lg:flex-row h-full bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4 bg-gray-50 p-4 border-b lg:border-b-0 lg:border-r border-gray-200 overflow-y-auto">
            <h3 className="text-xl font-bold mb-4 text-purple-600">Danh sách hoạt động</h3>
            <ul className="space-y-4">
              {event.activities.map((activity, index) => (
                <li key={index} className="relative">
                  <button
                    className={`w-full px-4 py-2 text-left rounded-lg ${
                      selectedActivity === index
                        ? "bg-purple-600 text-white font-semibold shadow-md"
                        : "bg-gray-200 text-gray-700 hover:bg-purple-300"
                    }`}
                    onClick={() => handleActivityClick(index)}
                  >
                    {activity.title}
                  </button>
                  {index < event.activities.length - 1 && (
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-full h-6">
                      <span className="block w-0.5 h-6 bg-gray-400 mx-auto"></span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Nội dung chi tiết */}
          <div className="w-full lg:w-3/4 p-6 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative flex-1">
            {/* Nút đóng */}
            <button
              className="absolute top-4 right-4 p-2 bg-purple-500 hover:bg-purple-600 text-white rounded-full shadow-lg focus:ring-2 focus:ring-purple-300 flex items-center justify-center"
              onClick={onClose}
              aria-label="Đóng"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9.293l5.293-5.293a1 1 0 111.414 1.414L11.414 10l5.293 5.293a1 1 0 01-1.414 1.414L10 11.414l-5.293 5.293a1 1 0 01-1.414-1.414L8.586 10 3.293 4.707a1 1 0 011.414-1.414L10 8.586z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <h2 className="text-2xl lg:text-3xl font-extrabold mb-4 text-purple-600">
              {event.activities[selectedActivity].title}
            </h2>
            <p className="mb-4 text-gray-700">{event.activities[selectedActivity].description}</p>

            {event.activities[selectedActivity].image && (
              <div className="image-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {event.activities[selectedActivity].image.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${event.activities[selectedActivity].title} - ${idx + 1}`}
                    className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 cursor-pointer"
                    onClick={() => openImageModal(img)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </Modal>

      {/* Image Modal */}
      <Modal
        isOpen={imageModal.isOpen}
        onRequestClose={closeImageModal}
        className="image-view-modal"
        overlayClassName="modal-overlay"
      >
        <div className="flex items-center justify-center h-[90vh]">
          <img src={imageModal.src} alt="Preview" className="max-w-full max-h-full rounded-lg shadow-lg" />
          <button
            className="absolute top-4 right-4 p-2 bg-purple-500 hover:bg-purple-600 text-white rounded-full shadow-lg focus:ring-2 focus:ring-purple-300 flex items-center justify-center"
            onClick={closeImageModal}
            aria-label="Đóng"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 9.293l5.293-5.293a1 1 0 111.414 1.414L11.414 10l5.293 5.293a1 1 0 01-1.414 1.414L10 11.414l-5.293 5.293a1 1 0 01-1.414-1.414L8.586 10 3.293 4.707a1 1 0 011.414-1.414L10 8.586z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </Modal>
    </>
  );
};

export default EventModal;
