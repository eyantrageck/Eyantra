import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Developer } from "../models/developer.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"; // same util you used in event

// 🆕 Create a new Developer
export const createDeveloper = asyncHandler(async (req, res) => {
  const {
    name,
    department,
    registrationNumber,
    instagram,
    linkedin,
    email,
    github,
    batch,
  } = req.body;

  // ✅ Validate required fields
  if (!name || !department) {
    throw new ApiError(400, "Name and Department are required");
  }

  // 🖼 Upload image to Cloudinary
  const avatar = req.files?.avatar?.[0];
  if (!avatar?.path) {
    throw new ApiError(400, "Developer image is required");
  }

  const uploadedFile = await uploadOnCloudinary(avatar.path);
  if (!uploadedFile) {
    throw new ApiError(400, "Image upload failed");
  }

  // 🧑‍💻 Create Developer entry
  const developer = await Developer.create({
    name,
    department,
    registrationNumber,
    instagram,
    linkedin,
    email,
    github,
    batch,
    avatar: uploadedFile.secure_url,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, developer, "Developer created successfully"));
});


// 📋 Get all developers
export const getAllDevelopers = asyncHandler(async (req, res) => {
  const developers = await Developer.find().sort({ createdAt: -1 });
  return res
    .status(200)
    .json(new ApiResponse(200, developers, "Developers fetched successfully"));
});

// 🔍 Get single developer
export const getDeveloperById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const developer = await Developer.findById(id);
  if (!developer) throw new ApiError(404, "Developer not found");

  return res
    .status(200)
    .json(new ApiResponse(200, developer, "Developer fetched successfully"));
});

// ✏️ Update developer
export const updateDeveloper = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const existing = await Developer.findById(id);
  if (!existing) throw new ApiError(404, "Developer not found");

  let updatedData = { ...req.body };

  // Optional new image upload
  const avatar = req.files?.avatar?.[0];
  if (avatar?.path) {
    const uploadedFile = await uploadOnCloudinary(avatar.path);
    if (!uploadedFile) throw new ApiError(400, "Image upload failed");
    updatedData.avatar = uploadedFile.secure_url;
  }

  const updatedDeveloper = await Developer.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, updatedDeveloper, "Developer updated successfully"));
});

// ❌ Delete developer
export const deleteDeveloper = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const developer = await Developer.findById(id);
  if (!developer) throw new ApiError(404, "Developer not found");

  await Developer.findByIdAndDelete(id);
  return res
    .status(200)
    .json(new ApiResponse(200, null, "Developer deleted successfully"));
});
