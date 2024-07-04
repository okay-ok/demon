import mongoose from "mongoose";


const palletSchema = new mongoose.Schema(
    {
        
        Zone: {
            type: String,
            required: true,
        },
        Aisle: {
            type: Number,
            required: true,
        },
        Rack: {
            type: Number,
            required: true,
        },
        Level: {
            type: Number,
            required: true,
        },
        Capacity: {
            type: Number,
            required: true,
        },
        Filled: {
            type: Boolean,
            required: true,
        },
        Item: {
            type: String,
            required: true,
        },
        OccupiedWeight: {
            type: Number,
            required: true,
        },
        MaxWeight: {
            type: Number,
            required: true,
        },
        
        Units:{
            //choice between number and weight
            type: String,
            required: true,
        },
        Value:{
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true
    }
);

export const Pallet = mongoose.model("Pallet", palletSchema);