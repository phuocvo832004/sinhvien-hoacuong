import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase-config";

const events = async () => {
  try {
    const eventsRef = collection(db, "events");
    const snapshot = await getDocs(eventsRef);
    const events = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return events; 
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

//export default events;
