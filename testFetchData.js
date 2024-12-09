// src/testFetchData.js
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase-config.js";  // Đảm bảo đường dẫn chính xác

const testFetchData = async () => {
  try {
    // Tạo tham chiếu đến collection "events" trong Firestore
    const eventsRef = collection(db, "events");
    
    // Fetch dữ liệu từ Firestore
    const snapshot = await getDocs(eventsRef);

    // Kiểm tra nếu không có sự kiện nào
    if (snapshot.empty) {
      console.log("No events found.");
      return;
    }

    // Lấy dữ liệu từ snapshot và map chúng vào một array
    const events = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    
    // In ra dữ liệu lấy được
    console.log("Fetched events:", events);

  } catch (error) {
    console.error("Error fetching events:", error);
  }
};

// Gọi hàm test để kiểm tra
testFetchData();
