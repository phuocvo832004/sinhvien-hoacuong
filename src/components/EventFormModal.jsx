import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EventFormModal = ({
  isOpen,
  onClose,
  newEvent,
  handleInputChange,
  handleActivityChange,
  addActivity,
  addEvent,
}) => {
  const [imageUploading, setImageUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);

  // Đồng bộ uploadedImages với newEvent.image
  useEffect(() => {
    if (newEvent.image) {
      setUploadedImages(newEvent.image);
    }
  }, [newEvent.image]);

  const handleImageUpload = async (file, context = "sidebar", activityIndex = null) => {
    setImageUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dxggv6rnr/image/upload",
        formData
      );
      const imagePath = res.data.secure_url;

      if (context === "sidebar") {
        setUploadedImages((prev) => {
          const updatedImages = [...prev, imagePath];
          handleInputChange({ target: { name: "image", value: updatedImages } });
          return updatedImages;
        });
      } else if (context === "activity" && activityIndex !== null) {
        const updatedActivities = [...newEvent.activities];
        if (!updatedActivities[activityIndex].image) {
          updatedActivities[activityIndex].image = [];
        }
        updatedActivities[activityIndex].image.push(imagePath);
        handleActivityChange(activityIndex, {
          target: { name: "image", value: updatedActivities[activityIndex].image },
        });
      }
      toast.success("Upload thành công!", {
        position: "top-right",
      });
    } catch (error) {
      console.error("Lỗi khi upload ảnh:", error);
      toast.error("Upload thất bại, vui lòng thử lại!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setImageUploading(false);
    }
  };

  const handleRemoveImage = (indexToRemove, context = "sidebar", activityIndex = null) => {
    if (context === "sidebar") {
      setUploadedImages((prev) => {
        const updatedImages = prev.filter((_, i) => i !== indexToRemove);
        handleInputChange({ target: { name: "image", value: updatedImages } });
        return updatedImages;
      });
    } else if (context === "activity" && activityIndex !== null) {
      const updatedActivities = [...newEvent.activities];
      const updatedImages = updatedActivities[activityIndex].image.filter(
        (_, i) => i !== indexToRemove
      );
      updatedActivities[activityIndex].image = updatedImages;
      handleActivityChange(activityIndex, { target: { name: "image", value: updatedImages } });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Thêm sự kiện"
      style={{
        content: {
          width: "70vw",
          height: "70vh",
          margin: "auto",
          padding: "20px",
          borderRadius: "15px",
          background: "linear-gradient(135deg, #f9fafb, #e5f4ff)",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
          border: "none",
          display: "flex",
          flexDirection: "row",
          gap: "20px",
        },
      }}
    >
      {/* Sidebar bên trái */}
      <div style={{ flex: "1", display: "flex", flexDirection: "column", gap: "15px" }}>
        <h2 className="text-2xl font-bold mb-4 text-gray-700 text-center">Thêm sự kiện mới</h2>
        <div>
          <label className="block text-sm font-medium text-gray-600">Tiêu đề:</label>
          <input
            type="text"
            name="title"
            value={newEvent.title}
            onChange={handleInputChange}
            required
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Năm:</label>
          <input
            type="text"
            name="year"
            value={newEvent.year}
            onChange={handleInputChange}
            required
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Mô tả:</label>
          <textarea
            name="description"
            value={newEvent.description}
            onChange={handleInputChange}
            required
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Hình ảnh:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e.target.files[0])}
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
          />

          {imageUploading && <p className="text-sm text-blue-500 mt-2">Đang upload hình ảnh...</p>}

          {/* Danh sách hình ảnh đã tải lên */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
            {uploadedImages.map((img, idx) => (
              <div key={idx} className="relative">
                <img
                  src={img}
                  alt={`Ảnh ${idx + 1}`}
                  className="w-full h-auto rounded-lg shadow-md"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1 hover:bg-red-600"
                  onClick={() => handleRemoveImage(idx, "sidebar")}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={addEvent}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-5 rounded-lg hover:shadow-lg mt-4"
        >
          Lưu sự kiện
        </button>
      </div>

      {/* Phần hoạt động bên phải */}
      <div style={{ flex: "2", overflowY: "auto" }}>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Danh sách hoạt động</h3>
        {newEvent.activities.map((activity, index) => (
          <div
            key={index}
            className="border border-gray-200 p-4 mb-4 rounded-lg shadow-sm bg-white"
          >
            <div className="mb-3">
              <label className="text-sm font-medium text-gray-600">Tiêu đề hoạt động:</label>
              <input
                type="text"
                name="title"
                value={activity.title}
                onChange={(e) => handleActivityChange(index, e)}
                className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-3">
              <label className="text-sm font-medium text-gray-600">Mô tả hoạt động:</label>
              <textarea
                name="description"
                value={activity.description}
                onChange={(e) => handleActivityChange(index, e)}
                className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-3">
              <label className="text-sm font-medium text-gray-600">Hình ảnh hoạt động:</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    handleImageUpload(file, "activity", index);
                  }
                }}
                className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              {activity.image && activity.image.length > 0 && (
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {activity.image.map((img, imgIdx) => (
                    <div key={imgIdx} className="relative">
                      <img
                        src={img}
                        alt={`Hoạt động ${index + 1} - Ảnh ${imgIdx + 1}`}
                        className="w-full h-auto rounded-lg shadow-md"
                      />
                      <button
                        type="button"
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full px-2 py-1 hover:bg-red-600"
                        onClick={() => handleRemoveImage(imgIdx, "activity", index)}
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        <div className="flex justify-center mt-4">
          <button
            type="button"
            onClick={addActivity}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-5 rounded-lg hover:shadow-lg"
          >
            Thêm hoạt động
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EventFormModal;
