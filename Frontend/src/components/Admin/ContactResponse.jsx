import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiMail, FiTrash2, FiUser, FiEye } from "react-icons/fi";
import { toast } from "react-hot-toast";
import ViewContactModal from "../models/ViewContact.modal.jsx";
import { motion } from "framer-motion";
import { fadeIn } from "../../shared/varients";

const ContactResponse = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedContact, setSelectedContact] = useState(null); // 👈 track selected contact
    const [showModal, setShowModal] = useState(false);

    // 🔹 Fetch all contact responses
    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const { data } = await axios.get(
                    `${import.meta.env.VITE_API_BASE}/contact`,
                    { withCredentials: true }
                );
                setContacts(data.data || []);
            } catch (error) {
                console.error(error);
                toast.error("Failed to fetch contact responses");
            } finally {
                setLoading(false);
            }
        };
        fetchContacts();
    }, []);

    // 🔹 Delete a contact response
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this response?")) return;
        try {
            await axios.delete(
                `${import.meta.env.VITE_API_BASE}/contact/delete/${id}`,
                { withCredentials: true }
            );
            setContacts((prev) => prev.filter((c) => c._id !== id));
            toast.success("Response deleted successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete response");
        }
    };

    // 🔹 Open modal with contact details
    const handleView = (contact) => {
        setSelectedContact(contact);
        console.log(contact);

        setShowModal(true);
    };

    return (
        <motion.div
            variants={fadeIn("up", 40, 0)}
            initial="hidden"
            animate="show"
            className="p-2 md:p-6 bg-gray-50 rounded-2xl"
        >
            <div className="flex items-center justify-between mb-6 ">
                <h2 className="text-2xl font-semibold text-primary flex items-center gap-2">
                    <FiMail /> Contact Responses
                </h2>
                <p className="text-sm text-gray-500">
                    Total Responses: <span className="font-medium">{contacts.length}</span>
                </p>
            </div>

            {/* 🔄 Loading State */}
            {loading ? (
                <div className="text-center text-gray-500 py-10">Loading responses...</div>
            ) : contacts.length === 0 ? (
                <div className="text-center text-gray-500 py-10">
                    No contact responses found.
                </div>
            ) : (
                <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
                    <table className="min-w-full bg-white text-sm">
                        <thead className="bg-gray-100 text-gray-700 text-left">
                            <tr>
                                <th className="py-1 md:py-3 px-2 md:px-4">Name</th>
                                <th className="py-1 md:py-3 px-2 md:px-4">Email</th>
                                <th className="py-1 md:py-3 px-2 md:px-4">Department</th>
                                <th className="py-1 md:py-3 px-2 md:px-4">Project Name</th>
                                <th className="py-1 md:py-3 px-2 md:px-4">Details</th>
                                <th className="py-1 md:py-3 px-2 md:px-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.map((contact) => (
                                <tr
                                    key={contact._id}
                                    className="border-t hover:bg-gray-50 transition-all cursor-pointer "
                                    title="view detail"
                                >
                                    <td
                                        onClick={() => handleView(contact)}
                                        className="py-1 md:py-3 px-2 md:px-4 font-medium text-gray-800 flex items-center gap-2">
                                        <FiUser className="text-gray-500" /> {contact.name}
                                    </td>
                                    <td
                                        onClick={() => handleView(contact)}
                                        className="py-1 md:py-3 px-2 md:px-4 text-gray-600">{contact.email}
                                    </td>
                                    <td
                                        onClick={() => handleView(contact)}
                                        className="py-1 md:py-3 px-2 md:px-4 text-gray-600"> {contact.department || "-"}
                                    </td>
                                    <td
                                        onClick={() => handleView(contact)}
                                        className="py-1 md:py-3 px-2 md:px-4 text-gray-600"> {contact.projectName || "-"}
                                    </td>
                                    <td
                                        onClick={() => handleView(contact)}
                                        className="py-1 md:py-3 px-2 md:px-4 text-gray-600 line-clamp-1"> {contact.projectDetail || "-"}
                                    </td>
                                    <td className="py-1 md:py-3 px-2 md:px-4 text-center">
                                        <button
                                            onClick={() => handleDelete(contact._id)}
                                            className="text-red-500 hover:text-red-600 transition-colors"
                                            aria-label="Delete Contact Response"
                                            title="Delete Contact Response"
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </td>
                                </tr>))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* 📋 View Modal */}
            {showModal && (
                <ViewContactModal
                    data={selectedContact}
                    onClose={() => setShowModal(false)}
                />
            )}
        </motion.div>
    );
};

export default ContactResponse;
