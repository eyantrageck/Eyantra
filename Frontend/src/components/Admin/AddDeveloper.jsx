import React, { useState, useEffect } from "react";
import {
    FiUser,
    FiMail,
    FiUploadCloud,
    FiGithub,
    FiInstagram,
    FiLinkedin,
    FiHash,
    FiTrash2,
    FiEdit2,
} from "react-icons/fi";
import axios from "axios";
import { showSuccess, showError, showInfo } from "../../utils/toastUtils.js";
import { motion } from "framer-motion";
import { fadeIn } from "../../shared/varients";

const ManageDevelopers = () => {
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [developers, setDevelopers] = useState([]);
    const [editId, setEditId] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        department: "",
        registrationNumber: "",
        instagram: "",
        linkedin: "",
        email: "",
        github: "",
        batch: "",
    });

    // 🔁 Fetch all developers
    const fetchDevelopers = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_BASE}/developers`);
            setDevelopers(data.data || data); // Adjust depending on your API response
        } catch (error) {
            console.error(error);
            showError("Failed to fetch developers");
        }
    };

    useEffect(() => {
        fetchDevelopers();
    }, []);

    // 🖼 Preview handler
    useEffect(() => {
        if (!image) return setPreviewUrl(null);
        const url = URL.createObjectURL(image);
        setPreviewUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [image]);

    // 🧠 Input change
    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // ✏️ Fill form when editing
    const handleEdit = (dev) => {
        setEditId(dev._id);
        setFormData({
            name: dev.name,
            department: dev.department,
            registrationNumber: dev.registrationNumber || "",
            instagram: dev.instagram || "",
            linkedin: dev.linkedin || "",
            email: dev.email || "",
            github: dev.github || "",
            batch: dev.batch || "",
        });
        setPreviewUrl(dev.avatar);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // 🗑 Delete developer
    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this developer?")) return;
        try {
            await axios.delete(`${import.meta.env.VITE_API_BASE}/developers/delete/${id}`, {
                withCredentials: true,
            });
            showSuccess("Developer deleted!");
            fetchDevelopers();
        } catch (error) {
            console.error(error);
            showError("Failed to delete developer");
        }
    };

    // 🧾 Submit (Add or Update)
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.department) {
            return showInfo("Please fill all required fields");
        }

        setLoading(true);
        try {
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) =>
                formDataToSend.append(key, value)
            );
            if (image) formDataToSend.append("avatar", image);

            if (editId) {
                await axios.put(
                    `${import.meta.env.VITE_API_BASE}/developers/update/${editId}`,
                    formDataToSend,
                    { withCredentials: true }
                );
                showSuccess("Developer updated successfully!");
            } else {
                await axios.post(
                    `${import.meta.env.VITE_API_BASE}/developers/create`,
                    formDataToSend,
                    { withCredentials: true }
                );
                showSuccess("Developer added successfully!");
            }

            // Reset
            setFormData({
                name: "",
                department: "",
                registrationNumber: "",
                instagram: "",
                linkedin: "",
                email: "",
                github: "",
                batch: "",
            });
            setImage(null);
            setPreviewUrl(null);
            setEditId(null);

            fetchDevelopers();
        } catch (error) {
            console.error(error);
            showError("Action failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            variants={fadeIn("up", 40, 0)}
            initial="hidden"
            animate="show"
            className="bg-slate-50 text-gray-800 min-h-screen p-6 space-y-8">
            {/* Developer Table */}
            <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl shadow-lg p-6 overflow-x-auto">
                <h2 className="text-xl font-bold mb-4 text-center">Developers</h2>
                <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-sm font-semibold">
                        <tr>
                            <th className="py-3 px-4 border">Avatar</th>
                            <th className="py-3 px-4 border">Name</th>
                            <th className="py-3 px-4 border">Department</th>
                            <th className="py-3 px-4 border">Batch</th>
                            <th className="py-3 px-4 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {developers.length > 0 ? (
                            developers.map((dev) => (
                                <tr key={dev._id} className="text-center border-t hover:bg-gray-50">
                                    <td className="py-2 px-3 border">
                                        <img
                                            src={dev.avatar}
                                            alt={dev.name}
                                            className="h-10 w-10 rounded-full mx-auto object-cover border border-gray-300"
                                        />
                                    </td>
                                    <td className="py-2 px-3 border font-medium">{dev.name}</td>
                                    <td className="py-2 px-3 border">{dev.department}</td>
                                    <td className="py-2 px-3 border">{dev.batch}</td>
                                    <td className="py-2 px-3 border">
                                        <div className="flex justify-center gap-2">
                                            <button
                                                onClick={() => handleEdit(dev)}
                                                className="p-2 bg-yellow-400 hover:bg-yellow-500 rounded-full text-white"
                                            >
                                                <FiEdit2 />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(dev._id)}
                                                className="p-2 bg-red-500 hover:bg-red-600 rounded-full text-white"
                                            >
                                                <FiTrash2 />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="py-6 text-gray-500 text-center">
                                    No developers found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add / Edit Developer Form */}
            <form
                onSubmit={onSubmitHandler}
                className="w-full max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl shadow-lg p-6 md:p-8 space-y-8"
            >
                <h1 className="text-3xl font-bold text-gray-900 text-center font-mono tracking-wider">
                    {editId ? "EDIT DEVELOPER" : "ADD NEW DEVELOPER"}
                </h1>

                {/* Main Fields */}
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        {/* Name */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2">
                                <FiUser /> Name
                            </label>
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Department */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2">
                                <FiHash /> Department
                            </label>
                            <input
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Registration */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2">
                                <FiHash /> Registration Number
                            </label>
                            <input
                                name="registrationNumber"
                                value={formData.registrationNumber}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2">
                            <FiUploadCloud /> Developer Image
                        </label>
                        <label className="flex flex-col items-center justify-center h-60 border-2 border-dashed border-gray-300 p-6 rounded-lg cursor-pointer hover:bg-blue-50 hover:border-blue-400 transition-all">
                            {previewUrl ? (
                                <img src={previewUrl} className="h-full w-full rounded object-cover" />
                            ) : (
                                <div className="flex flex-col items-center text-gray-400">
                                    <FiUploadCloud size={40} />
                                    <span className="mt-2 text-sm">Click to upload image</span>
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </label>
                    </div>
                </div>

                {/* Social Links */}
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {["instagram", "linkedin", "github", "email", "batch"].map((field) => (
                        <input
                            key={field}
                            name={field}
                            value={formData[field]}
                            placeholder={`Enter ${field}`}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                    ))}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg px-10 py-3 transition-all duration-300 ease-in-out"
                >
                    {loading ? "Saving..." : editId ? "Update Developer" : "Add Developer"}
                </button>
            </form>


        </motion.div>
    );
};

export default ManageDevelopers;