import React, { useEffect, useState } from "react";
import { FiCalendar, FiUser, FiX } from "react-icons/fi";
import axios from "axios";

import { motion, AnimatePresence } from "framer-motion";

const EventModal = ({ id, onClose }) => {
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchEvent = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE}/events/view/${id}`);
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
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-[6px]">
        <motion.div
          key="modal"
          initial={{ scale: 0.8, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 40 }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative animate-fadeIn">
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
        </motion.div>
      </motion.div >
    </AnimatePresence >
  );
};

export default EventModal;
