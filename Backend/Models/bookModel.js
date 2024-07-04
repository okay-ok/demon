import mongoose from "mongoose";


const rackSchema = new mongoose.Schema(
    {
        Bin_Name: {
            type: String,
            required: true,
        },
        Wing_Name: {
            type: String,
            required: true,
        },
        row_Index: {
            type: Number,
            required: true,
        },
        subrow_Index: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true
    }
);

export const Rack = mongoose.model("Rack", rackSchema);