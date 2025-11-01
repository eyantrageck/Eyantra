import mongoose, { Schema } from "mongoose";

const developerSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        department: {
            type: String,
            required: true,
            trim: true,
        },
        avatar: {
            type: String,
            required: true,
            trim: true,
        },
        registrationNumber: {
            type: String,
            trim: true,
        },
        instagram: {
            type: String,
            trim: true,
        },
        linkedin: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            trim: true,
        },
        github: {
            type: String,
            trim: true, 
        },
        batch: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);


export const Developer = mongoose.model("Developer", developerSchema);
