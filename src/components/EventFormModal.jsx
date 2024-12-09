import React from "react";
import Modal from "react-modal";

const EventFormModal = ({
  isOpen,
  onClose,
  newEvent,
  handleInputChange,
  handleActivityChange,
  addActivity,
  addEvent,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Thêm sự kiện"
      style={{
        content: {
          width: "400px",
          margin: "auto",
          padding: "20px",
          borderRadius: "10px",
          background: "#fff",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <h2 className="text-xl font-bold mb-4">Thêm sự kiện mới</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Tiêu đề:</label>
          <input
            type="text"
            name="title"
            value={newEvent.title}
            onChange={handleInputChange}
            required
            className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Năm:</label>
          <input
            type="text"
            name="year"
            value={newEvent.year}
            onChange={handleInputChange}
            required
            className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Mô tả:</label>
          <textarea
            name="description"
            value={newEvent.description}
            onChange={handleInputChange}
            required
            className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Hình ảnh:</label>
          <input
            type="text"
            name="image"
            value={newEvent.image}
            onChange={handleInputChange}
            placeholder="URL hình ảnh"
            className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Các hoạt động */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Hoạt động:</label>
          {newEvent.activities.map((activity, index) => (
            <div key={index} className="border p-4 mb-4 rounded-lg">
              <div className="mb-2">
                <label className="text-sm font-medium">Tiêu đề hoạt động:</label>
                <input
                  type="text"
                  name="title"
                  value={activity.title}
                  onChange={(e) => handleActivityChange(index, e)}
                  className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-2">
                <label className="text-sm font-medium">Mô tả hoạt động:</label>
                <textarea
                  name="description"
                  value={activity.description}
                  onChange={(e) => handleActivityChange(index, e)}
                  className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-2">
                <label className="text-sm font-medium">Hình ảnh hoạt động:</label>
                <input
                  type="text"
                  name="image"
                  value={activity.image}
                  onChange={(e) => handleActivityChange(index, e)}
                  placeholder="URL hình ảnh"
                  className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addActivity}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Thêm hoạt động
          </button>
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={addEvent}
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
          >
            Lưu
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EventFormModal;
