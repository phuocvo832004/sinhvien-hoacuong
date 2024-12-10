import { collection, addDoc } from "firebase/firestore";
import { db } from './firebase-config.js';

import events from './src/data/events.js';


const uploadEvents = async () => {
  const eventsRef = collection(db, "events"); 

  for (const event of events) {
    const docRef = await addDoc(eventsRef, event);
    console.log(`Added document with ID: ${docRef.id}`);
  }
};

uploadEvents();
