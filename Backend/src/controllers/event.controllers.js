import { Event } from "../models/event.model.js";
import { Admin } from "../models/admin.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// 🆕 Create a new Event
export const createEvent = asyncHandler(async (req, res) => {
  const { title, subTitle, description, date, isPublished } = req.body;

  if (!title || !description || !date) {
    throw new ApiError(400, "Title, description, and date are required");
  }

  if (!req.file) {
    throw new ApiError(400, "Event image is required");
  }

  // 🖼 Upload image to Cloudinary
  const eventImage = req.files?.eventImage?.[0];
  if (!eventImage?.path) {
    throw new ApiError(400, "Event image is required");
  }

  // Upload to Cloudinary
  const uploadedFile = await uploadOnCloudinary(eventImage.path);
  if (!uploadedFile) {
    throw new ApiError(400, "File upload failed");
  }
  // 🧑‍💼 Create event linked to admin
  const adminId = req.admin._id;
  const event = await Event.create({
    title,
    subTitle,
    description,
    image: uploadedFile.secure_url,
    date,
    isPublished,
    createdBy: adminId,
  });

  // Add event to Admin's list
  await Admin.findByIdAndUpdate(
    adminId,
    { $push: { events: event._id } },
    { new: true }
  );

  return res
    .status(201)
    .json(new ApiResponse(201, event, "Event created successfully"));
});

// 📋 Get all published Events
export const getAllEvents = asyncHandler(async (_, res) => {
  const events = await Event.find({ isPublished: true }).sort({ date: -1 });
  return res
    .status(200)
    .json(new ApiResponse(200, events, "Events fetched successfully"));
});

// 👤 Get Events created by logged-in Admin
export const getAdminEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({ createdBy: req.admin._id }).sort({
    createdAt: -1,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, events, "Admin events fetched successfully"));
});

// ✏️ Update Event
export const updateEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, subTitle, description, date, isPublished } = req.body;

  const event = await Event.findById(id);
  if (!event) throw new ApiError(404, "Event not found");

  // Ensure only creator can update
  if (event.createdBy.toString() !== req.admin._id.toString()) {
    throw new ApiError(403, "Unauthorized to update this event");
  }

  // If new image uploaded
  let fileUrl = req.files?.eventImage?.[0];
  if (!fileUrl?.path) {
    throw new ApiError(400, "Event image is required");
  }

  // Upload to Cloudinary
  const uploadedFile = await uploadOnCloudinary(fileUrl.path);
  if (!uploadedFile) {
    throw new ApiError(400, "File upload failed");
  }
  fileUrl = uploadedFile.secure_url;
  event.title = title || event.title;
  event.subTitle = subTitle || event.subTitle;
  event.description = description || event.description;
  event.date = date || event.date;
  event.isPublished =
    typeof isPublished === "boolean" ? isPublished : event.isPublished;

  await event.save();

  return res
    .status(200)
    .json(new ApiResponse(200, event, "Event updated successfully"));
});

// ❌ Delete Event
export const deleteEvent = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const event = await Event.findById(id);
  if (!event) throw new ApiError(404, "Event not found");

  if (event.createdBy.toString() !== req.admin._id.toString()) {
    throw new ApiError(403, "Unauthorized to delete this event");
  }

  await Event.findByIdAndDelete(id);
  await Admin.findByIdAndUpdate(req.admin._id, { $pull: { events: id } });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Event deleted successfully"));
});

// 🔍 Get Event by ID (Public)
export const getEventByID = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const event = await Event.findById(id).populate("createdBy", "name email");

  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, event, "Event fetched successfully"));
});
