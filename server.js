const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const Prediction = require("./models/Prediction");

const app = express();

app.use(cors());
app.use(express.json());

/* -------------------------------
   MongoDB Connection
-------------------------------- */

mongoose.connect("mongodb://127.0.0.1:27017/rice-disease-db")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

/* -------------------------------
   Multer Setup (Image Upload)
-------------------------------- */

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }

});

const upload = multer({ storage });

/* -------------------------------
   Prediction Route
-------------------------------- */

app.post("/predict", upload.single("image"), async (req, res) => {

    try {

        const formData = new FormData();

        formData.append(
            "file",
            fs.createReadStream(req.file.path)
        );

        /* Send image to Flask ML API */

        const response = await axios.post(
            "http://127.0.0.1:5000/predict",
            formData,
            { headers: formData.getHeaders() }
        );

        const result = response.data;

        /* Save to MongoDB */

        const predictionData = new Prediction({

            image: req.file.filename,
            prediction: result.prediction,
            confidence: result.confidence

        });

        await predictionData.save();

        /* Send result to React */

        res.json(result);

    }

    catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Prediction failed"
        });

    }

});

/* -------------------------------
   Prediction History
-------------------------------- */

app.get("/history", async (req, res) => {

    const data = await Prediction
        .find()
        .sort({ createdAt: -1 });

    res.json(data);

});

/* -------------------------------
   Start Server
-------------------------------- */

const PORT = 5001;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});