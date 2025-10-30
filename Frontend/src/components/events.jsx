import React, { useEffect, useState } from "react";
import axios from "axios";
import EventModal from "./models/viewEvent.modal.jsx"; // 👈 Import modal

const Events = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedEventId, setSelectedEventId] = useState(null); // 👁️ Modal state

  // 🔹 Fetch all public events
  const fetchEvents = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_BASE}/events`);
      const events = data.data || [];

      const today = new Date();

      const upcoming = events.filter((e) => new Date(e.date) >= today);
      const past = events.filter((e) => new Date(e.date) < today);

      setUpcomingEvents(upcoming);
      setPastEvents(past);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // 👁️ Open event modal
  const handleViewEvent = (id) => {
    setSelectedEventId(id);
  };

  // ⛔ Close modal
  const handleCloseModal = () => {
    setSelectedEventId(null);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <p className="text-gray-500 animate-pulse">Loading events...</p>
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-600 mt-10 font-medium">{error}</div>
    );

  const renderEvents = (events) => (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <div
          key={event._id}
          onClick={() => handleViewEvent(event._id)}
          className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition cursor-pointer"
        >
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {event.title}
            </h3>
            {event.subTitle && (
              <p className="text-sm text-gray-500">{event.subTitle}</p>
            )}
            <p className="text-sm text-gray-500 mt-1">
              {new Date(event.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-6 space-y-10">
      {/* 🌟 Upcoming Events */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          🌟 Upcoming Events
        </h2>
        {upcomingEvents.length > 0 ? (
          renderEvents(upcomingEvents)
        ) : (
          <p className="text-center text-gray-500">No upcoming events.</p>
        )}
      </section>

      {/* 🕓 Past Events */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          🕓 Past Events
        </h2>
        {pastEvents.length > 0 ? (
          renderEvents(pastEvents)
        ) : (
          <p className="text-center text-gray-500">No past events yet.</p>
        )}
      </section>

      {/* 👁️ View Modal */}
      {selectedEventId && (
        <EventModal id={selectedEventId} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Events;
