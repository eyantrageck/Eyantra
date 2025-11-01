import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 Import useNavigate
import axios from "axios";
import EditEventModal from "../models/EditEvent.modal.jsx";
import EventModal from "../models/viewEvent.modal.jsx";
import { FaTrashAlt, FaEdit, FaEye, FaPlus } from "react-icons/fa";
import { BiAddToQueue } from "react-icons/bi";
import { showSuccess, showError } from "../../utils/toastUtils.js";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [publishing, setPublishing] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [selectedEventId, setSelectedEventId] = useState(null);

  const navigate = useNavigate(); // 👈 Initialize navigate hook

  // 🧠 Fetch Admin Events
  const fetchAdminEvents = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE}/events/admin`,
        { withCredentials: true }
      );
      setEvents(data.data);
    } catch (err) {
      setError("Failed to load events");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminEvents();
  }, []);

  // 🚀 Publish Event Handler
  const handlePublish = async (eventId) => {
    try {
      setPublishing(eventId);
      await axios.put(
        `${import.meta.env.VITE_API_BASE}/events/update/${eventId}`,
        { isPublished: true },
        { withCredentials: true }
      );
      setEvents((prev) =>
        prev.map((event) =>
          event._id === eventId ? { ...event, isPublished: true } : event
        )
      );
      showSuccess("Event published successfully!");
    } catch (err) {
      console.error("Failed to publish event:", err);
      showError("Failed to publish event");
    } finally {
      setPublishing(null);
    }
  };

  // 🗑️ Delete Event Handler
  const handleDelete = async (eventId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (!confirmDelete) return;

    try {
      setDeleting(eventId);
      await axios.delete(`${import.meta.env.VITE_API_BASE}/events/delete/${eventId}`, {
        withCredentials: true,
      });
      setEvents((prev) => prev.filter((event) => event._id !== eventId));
      showSuccess("Event deleted successfully!");
    } catch (err) {
      console.error("Failed to delete event:", err);
      showError("Failed to delete event");
    } finally {
      setDeleting(null);
    }
  };

  // ✏️ Edit Event Handler
  const handleEdit = (event) => setEditingEvent(event);

  // 👁️ View Event Handler
  const handleViewEvent = (id) => setSelectedEventId(id);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <p className="text-gray-500 animate-pulse">Loading events...</p>
      </div>
    );

  if (error)
    return <div className="text-center text-red-600 mt-10 font-medium">{error}</div>;

  return (
    <div className="p-6 space-y-6">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Your Created Events</h2>

        {/* ➕ Add Event Button */}
        <button
          onClick={() => navigate("/admin/addEvent")}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
           <BiAddToQueue /> Add New Event
        </button>
      </div>

      {/* No Events */}
      {events.length === 0 ? (
        <div className="text-center text-gray-600 mt-10">
          No events created yet. ✨
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition cursor-pointer"
            >
              {/* 🖼 Clickable Image */}
              <div onClick={() => handleViewEvent(event._id)}>
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-40 object-cover hover:opacity-90 transition"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{event.title}</h3>
                  <p className="text-sm text-gray-500">{event.subTitle}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* ⚙️ Actions */}
              <div className="px-4 pb-3 flex items-center justify-between">
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    event.isPublished
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {event.isPublished ? "Published" : "Draft"}
                </span>

                <div className="flex items-center space-x-2">
                  {!event.isPublished && (
                    <button
                      onClick={() => handlePublish(event._id)}
                      disabled={publishing === event._id}
                      className="text-sm bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 cursor-pointer disabled:bg-gray-400 transition"
                    >
                      {publishing === event._id ? "Publishing..." : "Publish"}
                    </button>
                  )}

                  <button
                    onClick={() => handleEdit(event)}
                    className="p-2 rounded-md bg-yellow-100 text-yellow-600 hover:bg-yellow-200 transition"
                    title="Edit Event"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => handleViewEvent(event._id)}
                    className="p-2 rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                    title="View Event"
                  >
                    <FaEye />
                  </button>

                  {event.isPublished && (
                    <button
                      onClick={() => handleDelete(event._id)}
                      disabled={deleting === event._id}
                      className="p-2 rounded-md bg-red-100 text-red-600 hover:bg-red-200 transition"
                      title="Delete Event"
                    >
                      {deleting === event._id ? "…" : <FaTrashAlt />}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 🟢 Edit Modal */}
      {editingEvent && (
        <EditEventModal
          event={editingEvent}
          onClose={() => setEditingEvent(null)}
          onSave={(id, updatedData) =>
            setEvents((prev) =>
              prev.map((e) => (e._id === id ? { ...e, ...updatedData } : e))
            )
          }
        />
      )}

      {/* 👁️ View Modal */}
      {selectedEventId && (
        <EventModal
          id={selectedEventId}
          onClose={() => setSelectedEventId(null)}
        />
      )}
    </div>
  );
};

export default EventList;
