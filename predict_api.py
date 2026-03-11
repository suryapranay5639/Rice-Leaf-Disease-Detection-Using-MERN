from flask import Flask, request, jsonify
import numpy as np
from PIL import Image
import tensorflow as tf
from tensorflow.keras.applications.efficientnet import preprocess_input

app = Flask(__name__)

# Load trained model
model = tf.keras.models.load_model("model_final.h5")

# Class names (IMPORTANT: must match dataset folder order)
classes = [
    "Bacterial Leaf Blight",
    "Brown Spot",
    "Healthy",
    "Leaf Blast",
    "Leaf Scald",
    "Narrow Brown Leaf Spot",
    "Rice Hispa",
    "Sheath Blight"
]

print("Model loaded successfully")
print("Input shape:", model.input_shape)


# Image preprocessing
def preprocess(img):

    img = img.resize((300,300))

    img = np.array(img)

    img = preprocess_input(img)   # ✅ EfficientNet preprocessing

    img = np.expand_dims(img, axis=0)

    return img


@app.route("/predict", methods=["POST"])
def predict():

    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"})

    file = request.files["file"]

    try:

        image = Image.open(file.stream).convert("RGB")

        img = preprocess(image)

        prediction = model.predict(img)

        probs = prediction[0]

        class_index = np.argmax(probs)

        predicted_class = classes[class_index]

        confidence = float(probs[class_index]) * 100

        print("\nPrediction:", predicted_class, "Confidence:", confidence)

        return jsonify({
            "prediction": predicted_class,
            "confidence": round(confidence,2)
        })

    except Exception as e:
        return jsonify({"error": str(e)})


if __name__ == "__main__":
    app.run(debug=True, port=5000)