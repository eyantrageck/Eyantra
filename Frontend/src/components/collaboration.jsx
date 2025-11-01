import React from "react";
import { Link } from "react-router-dom";

const Collaboration = () => {
  return (
    <div className="min-h-screen bg-g py-12 px-6">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-[#36756f]">Collaboration</h1>
        <p className="text-lg text-gray-600 mt-2">
          Bringing together IIT Bombay e-Yantra & GEC Kishanganj e-Yantra to foster innovation.
        </p>
      </div>

      {/* About Section */}
      <div className="mt-10 bg-white shadow-md p-6 rounded-lg max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800">About the Collaboration</h2>
        <p className="text-gray-600 mt-2">
          This initiative aims to bridge the gap between students and industry-level robotics projects, fostering a 
          hands-on learning environment through workshops, hackathons, and real-world projects.
        </p>
      </div>

      {/* Activities */}
      <div className="mt-10 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800">Key Activities</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="font-bold">Workshops</h3>
            <p className="text-gray-600 text-sm">Hands-on robotics training by experts.</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="font-bold">Hackathons</h3>
            <p className="text-gray-600 text-sm">Solve real-world robotics challenges.</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="font-bold">Competitions</h3>
            <p className="text-gray-600 text-sm">Participate in national robotics events.</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Collaboration;
