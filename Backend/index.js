import express from "express";
import { port } from "./config.js";
import { dbUrl } from "./config.js";
import mongoose from "mongoose";
import { Rack } from "./Models/bookModel.js";
import { Pallet } from "./Models/palletModel.js";
import rackRouter  from "./Routes/bookRoutes.js";
import palletRouter from "./Routes/palletRoutes.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
    // console.log(req);
    res.send("Hello World").status(200);
});
app.use("/pallets", palletRouter);


mongoose
    .connect(dbUrl)
    .then(() => {
        console.log("Connected to Database");
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.log("Error connecting to Database", err);
    });