import React from "react";
import Timeline from "./components/Timeline";
import "./App.css";

const App = () => {
  return (
    <div className="App min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-yellow-50 to-blue-100">
      {/* Header */}
      {/* <header className="w-full text-center py-12 bg-gradient-to-r from-yellow-200 via-yellow-100 to-yellow-50 shadow-lg">
        <h1 className="text-4xl font-bold text-blue-800">
          Hòa Cường Trong Tôi
        </h1>
        <p className="text-lg text-gray-700 mt-3">
          Những ký ức đẹp, nơi tình yêu và ký ức hội tụ
        </p>
      </header> */}

      {/* Main Content */}
      <main className="flex flex-col items-center w-full flex-grow px-6 sm:px-12 lg:px-24 py-10">
        <section className="w-full bg-white shadow-md rounded-lg p-6">
          <Timeline />
        </section>
      </main>

      {/* Footer */}
      {/* <footer className="w-full bg-blue-800 text-white py-4 text-center mt-auto">
        <p className="text-sm">
          © 2024 <span className="font-semibold">Hòa Cường Memories</span>. All rights reserved.
        </p>
      </footer> */}
    </div>
  );
};

export default App;
