import React from "react";
import { IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

const ViewContactModal = ({ data, onClose }) => {
  if (!data) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          key="modal"
          initial={{ scale: 0.8, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 40 }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
          className="bg-white rounded-xl shadow-lg w-full max-w-lg relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* ❌ Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-red-600 transition"
          >
            <IoMdClose size={22} />
          </button>

          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Contact Response Details
            </h2>

            <div className="space-y-3">
              <p>
                <strong className="text-gray-700">Name:</strong>{" "}
                {data.name || "-"}
              </p>
              <p>
                <strong className="text-gray-700">Email ID:</strong>{" "}
                {data.email || "-"}
              </p>
              <p>
                <strong className="text-gray-700">Department:</strong>{" "}
                {data.department || "-"}
              </p>
              <p>
                <strong className="text-gray-700">Project Name:</strong>{" "}
                {data.projectName || "-"}
              </p>
              <p>
                <strong className="text-gray-700">Project Detail:</strong>
              </p>
              <div className="p-3 bg-gray-50 border border-dotted rounded text-gray-700 text-sm whitespace-pre-wrap">
                {data.projectDetail || "No additional details provided."}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ViewContactModal;
