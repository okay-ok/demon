import { Pallet } from "../Models/palletModel.js";
import express from "express";
const palletRouter = express.Router();
 
palletRouter.post("/", async (req, res) => {
    try {
        if (!req.body.Zone || !req.body.Aisle || !req.body.Rack || !req.body.Level || !req.body.Capacity || !req.body.Filled || !req.body.Item || !req.body.OccupiedWeight || !req.body.MaxWeight  || !req.body.Units || !req.body.Value) {
            return res.send("Please provide all the details").status(400);
        }
        const newpallet = {
            Zone: req.body.Zone,
            Aisle: req.body.Aisle,
            Rack: req.body.Rack,
            Level: req.body.Level,
            Capacity: req.body.Capacity,
            Filled: req.body.Filled,
            Item: req.body.Item,
            OccupiedWeight: req.body.OccupiedWeight,
            MaxWeight: req.body.MaxWeight,
            
            Units: req.body.Units,
            Value: req.body.Value
        };
        const pallet = await Pallet.create(newpallet);
        res.send(pallet).status(201);
    } catch (error) {
        res.send(error).status(400);
    }
});
palletRouter.get("/", async (req, res) => {
    try {
        const pallets = await Pallet.find();
        res.status(200).json({ count: pallets.length, data: pallets });
    } catch (error) {
        res.send(error).status(400);
    }
});
palletRouter.get("/:id", async (req, res) => {
    try {
        const pallet = await Pallet.findById(req.params.id);
        res.status(200).json(pallet);
    } catch (error) {
        res.send(error).status(400);
    }
});

palletRouter.put("/:id", async (req, res) => {
    try {
        if (!req.body.Zone || !req.body.Aisle || !req.body.Rack || !req.body.Level || !req.body.Capacity || !req.body.Filled || !req.body.Item || !req.body.OccupiedWeight || !req.body.MaxWeight  || !req.body.Units || !req.body.Value) {
            return res.send("Please provide all the details").status(400);
        }
        const pallet = await Pallet.findByIdAndUpdate
            (req.params.id, req.body, {
                new: true,
                runValidators: true,
            });
        res.status(200).json(pallet);
    } catch (error) {
        res.send({ message: "not found" }).status(400);
    }
});

palletRouter.delete("/:id", async (req, res) => {
    try {
        const pallet = await Pallet.findByIdAndDelete(req.params.id);
        res.status(200).json(pallet);
    } catch (error) {
        res.send(error).status(400);
    }
});

export default palletRouter;