const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema({

    image: String,

    prediction: String,

    confidence: Number,

    createdAt: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Prediction", predictionSchema);