import express from "express";
import { Rack } from "../Models/bookModel.js";
const rackRouter = express.Router();

rackRouter.post("/", async (req, res) => {
    try {
        if (!req.body.Bin_Name || !req.body.Wing_Name || !req.body.row_Index || !req.body.subrow_Index) {
            return res.send("Please provide all the details").status(400);
        }
        const newrack = {
            Bin_Name: req.body.Bin_Name,
            Wing_Name: req.body.Wing_Name,
            row_Index: req.body.row_Index,
            subrow_Index: req.body.subrow_Index,
        };
        const rack=await Rack.create(newrack) ;
        res.send(rack).status(201);
    } catch (error) {
        res.send(error
        ).status(400);
    }
}
);
rackRouter.get("/", async (req, res) => {
    try {
        const racks = await Rack.find();
        res.status(200).json({count: racks.length, data:racks});
    } catch (error) {
        res.send(error
        ).status(400);
    }
}
);
rackRouter.get("/:id", async (req, res) => {
    try {
        const rack = await Rack.findById(req.params.id);
        res.status(200).json(rack);
    } catch (error) {
        res.send(error  ).status(400);
    }
}
);
rackRouter.put("/:id", async (req, res) => {
    try {

        if (!req.body.Bin_Name || !req.body.Wing_Name || !req.body.row_Index || !req.body.subrow_Index) {
            return res.send("Please provide all the details").status(400);
        }
        const rack = await Rack.findByIdAndUpdate
        (req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json(rack);
    } catch
    (error
    ) {
        res.send({message:"not found"}        ).status(400);
    }
}
);

rackRouter.delete("/:id", async (req, res) => {
    try {
        const rack = await Rack.findByIdAndDelete(req.params.id);
        res.status(204).json(rack);
        console.log(rack);
    } catch (error) {
        res.send({ message: "not found" })
            .status(400);
    }
}

);


 export default rackRouter;
