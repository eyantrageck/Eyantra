import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Contact } from "../models/contact.model.js";

// 📩 Create Contact
export const createContact = asyncHandler(async (req, res) => {
  const { name, email, department, projectName, projectDetail } = req.body;

  if (!name || !email || !department || !projectName || !projectDetail) {
    throw new ApiError(400, "All fields are required");
  }

  const contact = await Contact.create({
    name,
    email,
    department,
    projectName,
    projectDetail,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, contact, "Contact form submitted successfully"));
});

// 📋 Get All Contacts
export const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  return res
    .status(200)
    .json(new ApiResponse(200, contacts, "All contact entries fetched"));
});

// 🔍 Get Contact By ID
export const getContactById = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) throw new ApiError(404, "Contact not found");
  return res
    .status(200)
    .json(new ApiResponse(200, contact, "Contact fetched successfully"));
});

// ❌ Delete Contact
export const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);
  if (!contact) throw new ApiError(404, "Contact not found");
  return res
    .status(200)
    .json(new ApiResponse(200, null, "Contact deleted successfully"));
});
