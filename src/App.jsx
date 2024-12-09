import React from "react";
import Timeline from "./components/Timeline";
import "./App.css";

const App = () => {
  return (
    <div className="App min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-yellow-50 to-blue-100">
      <main className="flex flex-col items-center w-full flex-grow px-6 sm:px-12 lg:px-24 py-10">
        <section className="w-full bg-white shadow-md rounded-lg p-6">
          <Timeline />
        </section>
      </main>
    </div>
  );
};

export default App;
