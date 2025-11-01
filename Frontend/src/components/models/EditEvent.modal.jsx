import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FiCalendar, FiFileText, FiType, FiUploadCloud } from "react-icons/fi";
import Quill from "quill";
import { showSuccess, showError, showInfo } from "../../utils/toastUtils.js";
import "quill/dist/quill.snow.css";
import { motion, AnimatePresence } from "framer-motion";

const EditEventModal = ({ event, onClose, onSave }) => {
    const [title, setTitle] = useState(event?.title || "");
    const [subTitle, setSubTitle] = useState(event?.subTitle || "");
    const [date, setDate] = useState(event?.date ? event.date.split("T")[0] : "");
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(event?.image || "");
    const [description, setDescription] = useState(event?.description || "");
    const [isPublished, setIsPublished] = useState(event?.isPublished || false);
    const [loading, setLoading] = useState(false);

    const editorRef = useRef(null);
    const quillInstance = useRef(null);

    useEffect(() => {
        if (editorRef.current && !quillInstance.current) {
            quillInstance.current = new Quill(editorRef.current, {
                theme: "snow",
                placeholder: "Write event details...",
            });

            quillInstance.current.root.innerHTML = description;

            quillInstance.current.on("text-change", () => {
                setDescription(quillInstance.current.root.innerHTML);
            });
        }
    }, [description]);

    // 🔹 Preview uploaded image
    useEffect(() => {
        if (image) {
            const fileReader = new FileReader();
            fileReader.onload = () => setPreviewUrl(fileReader.result);
            fileReader.readAsDataURL(image);
        }
    }, [image]);

    // 🔹 Handle Update
    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!title || !subTitle || !description) {
            showError("Please fill all required fields.");
            return;
        }

        setLoading(true);
        try {
            let imageUrl = previewUrl;

            // Upload new image if selected
            if (image) {
                const formData = new FormData();
                formData.append("file", image);
                formData.append("upload_preset", "event_uploads");
                const uploadRes = await axios.post(
                    "https://api.cloudinary.com/v1_1/dtdsntsd1/image/upload",
                    formData
                );
                imageUrl = uploadRes.data.secure_url;
            }

            const payload = {
                title,
                subTitle,
                description,
                image: imageUrl,
                date,
                isPublished,
            };

            const { data } = await axios.put(
                `${import.meta.env.VITE_API_BASE}/events/update/${event._id}`,
                payload,
                { withCredentials: true }
            );

            // console.log("Event updated successfully!");
            showSuccess("Event updated successfully!");
            onSave(data.data);
            onClose();
            window.location.reload();
        } catch (error) {
            console.error("Error updating event:", error);
            showError("Failed to update event.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                <motion.div
                    key="modal"
                    initial={{ scale: 0.8, opacity: 0, y: 40 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.8, opacity: 0, y: 40 }}
                    transition={{ type: "spring", stiffness: 220, damping: 18 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white w-full max-w-4xl rounded-xl shadow-lg overflow-y-auto max-h-[90vh] border border-gray-200"
                >
                    {/* Header */}
                    <div className="flex justify-between items-center border-b p-4">
                        <h2 className="text-xl font-semibold text-gray-800">Edit Event</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-200 cursor-pointer transition"
                        >
                            ✖
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleUpdate} className="p-6 space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Left */}
                            <div className="space-y-6">
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2">
                                        <FiType /> Event Title
                                    </label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2">
                                        <FiFileText /> Event Sub-title
                                    </label>
                                    <input
                                        type="text"
                                        value={subTitle}
                                        onChange={(e) => setSubTitle(e.target.value)}
                                        required
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2">
                                        <FiCalendar /> Event Date
                                    </label>
                                    <input
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        required
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"
                                    />
                                </div>
                            </div>

                            {/* Right - Image */}
                            <div>
                                <label
                                    htmlFor="image"
                                    className="flex flex-col items-center justify-center h-60 border-2 border-dashed border-gray-300 p-6 rounded-lg cursor-pointer hover:bg-blue-50 hover:border-blue-400 transition"
                                >
                                    {previewUrl ? (
                                        <img
                                            src={previewUrl}
                                            alt="Thumbnail"
                                            className="h-full w-full object-cover rounded"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center text-gray-400">
                                            <FiUploadCloud size={40} />
                                            <span className="mt-2 text-sm">Click to upload image</span>
                                        </div>
                                    )}

                                </label>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2">
                                Event Description
                            </label>
                            <div className="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                                <div ref={editorRef} className="min-h-[30vh]"></div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-gray-200">
                            <label className="flex items-center cursor-pointer">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={isPublished}
                                        onChange={() => setIsPublished(!isPublished)}
                                    />
                                    <div className="block bg-gray-200 w-14 h-8 rounded-full peer-checked:bg-blue-500 transition"></div>
                                    <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition peer-checked:translate-x-full"></div>
                                </div>
                                <div className="ml-3 text-gray-700 font-medium">Publish Event</div>
                            </label>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-lg font-semibold transition-all duration-300 cursor-pointer ease-in-out transform hover:scale-105"
                            >
                                {loading ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default EditEventModal;
