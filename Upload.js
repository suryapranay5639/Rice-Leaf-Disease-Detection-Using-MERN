import React, { useState } from "react";
import axios from "axios";

function Upload() {

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [prediction, setPrediction] = useState("");
    const [confidence, setConfidence] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {

        const selectedFile = e.target.files[0];

        setFile(selectedFile);

        setPreview(URL.createObjectURL(selectedFile));
    };

    const uploadImage = async () => {

        if (!file) {
            alert("Upload an image first");
            return;
        }

        const formData = new FormData();
        formData.append("image", file);

        try {

            setLoading(true);

            const res = await axios.post(
                "http://localhost:5001/predict",
                formData
            );

            setPrediction(res.data.prediction);
            setConfidence(res.data.confidence);

            setLoading(false);

        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    return (

        <div className="container">

            <h1>🌾 Rice Disease Detector</h1>

            <input type="file" onChange={handleImageChange} />

            {preview && (
                <img src={preview} alt="preview" className="preview" />
            )}

            <br />

            <button onClick={uploadImage} className="detect-btn">
                Detect Disease
            </button>

            {loading && <p>🔬 AI analyzing leaf...</p>}

            {prediction && (

                <div className="result">

                    <h2>{prediction}</h2>

                    <div className="confidence-bar">
                        <div
                            className="confidence-fill"
                            style={{ width: `${confidence}%` }}
                        ></div>
                    </div>

                    <p>{confidence}% confidence</p>

                </div>

            )}

        </div>
    );
}

export default Upload;