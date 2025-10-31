import React, { useState, useEffect, useRef } from 'react';
import { FiType, FiFileText, FiCalendar, FiUploadCloud } from "react-icons/fi";
import Quill from 'quill';
import axios from "axios";


const AddEvent = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [loading, setLoading] = useState(false);

  // Generate preview URL (no changes to logic)
  useEffect(() => {
    if (!image) {
      setPreviewUrl(null);
      return;
    };
    const objectUrl = URL.createObjectURL(image);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);


  //  Initialize Quill 
  useEffect(() => {
    if (!editorRef.current || quillRef.current) return;

    quillRef.current = new Quill(editorRef.current, {
      theme: "snow",
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline"],
          ["link", "image"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["clean"],
        ],
      },
    });

    const quill = quillRef.current;

    // ✅ Sync editor text with state
    const handleTextChange = () => {
      const html = quill.root.innerHTML.trim();
      setDescription(html);
    };

    quill.on("text-change", handleTextChange);

    // ✅ Cleanup
    return () => {
      quill.off("text-change", handleTextChange);
      quillRef.current = null;
    };
  }, []);

  // Form submission (no changes to logic)
  const onSubmitHandler = async (e) => {

    if (!description || description === '<p><br></p>') {
      console.log('Please add a description before saving.');
      return;
    }


    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('subTitle', subTitle);
    formData.append('date', date);
    formData.append('description', description);
    formData.append('isPublished', isPublished);
    formData.append('image', image);

    console.log("Description HTML:", description);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE}/events/create`,
        formData,
        {
          withCredentials: true, // ✅ Important for cookies / JWT
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // ✅ Success
      console.log("✅ Event Created:", response.data);

      // Optional: Reset form after success
      setTitle("");
      setSubTitle("");
      setDate("");
      setImage(null);
      setDescription("");
      setIsPublished(false);
      if (quillRef.current) quillRef.current.root.innerHTML = "";

    } catch (error) {
      console.error("❌ Error creating event:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="bg-slate-50 text-gray-800 min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-4xl bg-white border border-gray-200 rounded-xl shadow-lg p-6 md:p-8 space-y-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 text-center font-mono tracking-wider">
          CREATE NEW EVENT
        </h1>

        {/* --- Main Content Grid --- */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* --- Left Column: Details --- */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2">
                <FiType /> Event Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="e.g., Annual Robo-Wars"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition placeholder-gray-400"
              />
            </div>

            {/* Sub-title */}
            <div>
              <label htmlFor="subTitle" className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2">
                <FiFileText /> Event Sub-title
              </label>
              <input
                id="subTitle"
                type="text"
                placeholder="A short, catchy tagline for the event"
                value={subTitle}
                onChange={(e) => setSubTitle(e.target.value)}
                required
                className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition placeholder-gray-400"
              />
            </div>

            {/* Date */}
            <div>
              <label htmlFor="date" className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2">
                <FiCalendar /> Event Date
              </label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
          </div>

          {/* --- Right Column: Image Upload --- */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2">
              <FiUploadCloud /> Event Thumbnail
            </label>
            <label
              htmlFor="image"
              className="flex flex-col items-center justify-center h-60 border-2 border-dashed border-gray-300 p-6 rounded-lg cursor-pointer hover:bg-blue-50 hover:border-blue-400 transition-all"
            >
              {previewUrl ? (
                <img src={previewUrl} alt="Thumbnail Preview" className="h-full w-full rounded object-cover" />
              ) : (
                <div className="flex flex-col items-center text-gray-400">
                  <FiUploadCloud size={40} />
                  <span className="mt-2 text-sm font-semibold text-gray-500">Click to upload image</span>
                  <span className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</span>
                </div>
              )}
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                accept="image/*"
                hidden
              />
            </label>
          </div>
        </div>

        {/* --- Description (Quill Editor) --- */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 mb-2">
            Event Description
          </label>
          <div className="bg-white border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
            <div ref={editorRef} className="min-h-[30vh]"></div>
          </div>
        </div>

        {/* --- Footer: Actions --- */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-gray-200">
          {/* Publish Toggle Switch */}
          <label htmlFor="publish" className="flex items-center cursor-pointer">
            <div className="relative">
              <input type="checkbox" id="publish" className="sr-only peer" checked={isPublished} onChange={() => setIsPublished(!isPublished)} />
              <div className="block bg-gray-200 w-14 h-8 rounded-full peer-checked:bg-blue-500 transition"></div>
              <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition peer-checked:translate-x-full"></div>
            </div>
            <div className="ml-3 text-gray-700 font-medium">
              Publish Event
            </div>
          </label>

          {/* Save Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto bg-blue-600 cursor-pointer hover:bg-blue-700 text-white focus:ring-4 focus:ring-blue-500/50 font-bold rounded-lg px-10 py-3 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            {loading ? "Saving..." : "Save Event"}
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddEvent;