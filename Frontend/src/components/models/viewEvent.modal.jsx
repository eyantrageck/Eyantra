import React, { useEffect, useState } from "react";
import { FiCalendar, FiUser, FiX } from "react-icons/fi";
import axios from "axios";

const EventModal = ({ id, onClose }) => {
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/events/view/${id}`);
        setEventData(res.data.data || res.data);        
      } catch (err) {
        console.error(err);
        setError("Failed to fetch event details.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (!id) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-[6px]">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 hover:bg-black rounded-full text-gray-600 bg-white hover:text-white hover:border cursor-pointer transition"
        >
          <FiX size={24} />
        </button>

        {/* Loading State */}
        {loading && (
          ""
        )}

        {/* Error */}
        {!loading && (error || !eventData) && (
          <div className="flex justify-center items-center h-64 text-center">
            <p className="text-red-500 text-lg">{error || "Event not found."}</p>
          </div>
        )}

        {/* Event Details */}
        {!loading && eventData && (
          <>
            <img
              src={eventData.image}
              alt={eventData.title}
              className="w-full h-[50vh] object-contain rounded-t-2xl"
            />

            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{eventData.title}</h1>
              <h2 className="text-lg text-gray-600 font-medium mb-4">
                {eventData.subTitle}
              </h2>

              <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm mb-6">
                <div className="flex items-center gap-2">
                  <FiCalendar className="text-blue-600" />
                  <span>
                    {new Date(eventData.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FiUser className="text-green-600" />
                  <span>Created by: {eventData.createdBy.name}</span>
                </div>
              </div>

              <div
                className="prose max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: eventData.description.replace(/&lt;/g, "<").replace(/&gt;/g, ">") }}
              />

              <div className="mt-8 border-t pt-4 text-sm text-gray-500 flex flex-col sm:flex-row sm:justify-between">
                <span>
                  Created on:{" "}
                  {new Date(eventData.createdAt).toLocaleDateString("en-IN")}
                </span>
                <span>
                  Updated on:{" "}
                  {new Date(eventData.updatedAt).toLocaleDateString("en-IN")}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EventModal;
