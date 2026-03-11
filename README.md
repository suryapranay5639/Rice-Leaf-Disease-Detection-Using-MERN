# Rice-Leaf-Disease-Detection-Using-MERN
Overview

The Rice Leaf Disease Detection System is a web-based application that uses Deep Learning and the MERN Stack to detect diseases in rice leaves from images. The system allows users to upload a rice leaf image, which is analyzed by a trained machine learning model to predict the disease type.

The project integrates:

React for the frontend

Node.js and Express for the backend

MongoDB for data storage

Python (TensorFlow/Keras) for the deep learning model

Features

Upload rice leaf images

Automatic disease detection using AI

Fast prediction results

Web-based user interface

Backend API communication with ML model

Tech Stack
Frontend

React.js

HTML

CSS

JavaScript

Backend

Node.js

Express.js

Database

MongoDB

Machine Learning

Python

TensorFlow / Keras

CNN Model

Project Structure
rice-disease-detection FSD
│
├── client/                # React frontend
│   ├── public/
│   ├── src/
│   ├── package.json
│
├── server/                # Node.js backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│
├── ml-api/                # Machine learning API
│   ├── model_final.h5
│   ├── predict_api.py
│   ├── requirements.txt
│
└── README.md
Installation
cd rice-disease-detection
Install Dependencies
Frontend
cd client
npm install
Backend
cd server
npm install
ML API
cd ml-api
pip install -r requirements.txt
Running the Application

You need three terminals to run the project.

1 Start Backend Server
cd server
node server.js

or

npm run dev
2 Start React Frontend
cd client
npm start
3 Start Machine Learning API
cd ml-api
python predict_api.py
System Workflow

User uploads a rice leaf image from the React frontend

The image is sent to the Node.js backend

Backend forwards the image to the Python ML API

The ML model analyzes the image

The predicted disease result is returned to the backend

The result is displayed on the frontend

Dataset

The model is trained using a dataset of rice leaf images containing different disease classes such as:

Healthy

Brown Spot

Leaf Blast

Other rice leaf diseases

Model Details

Model Type: Convolutional Neural Network (CNN)

Framework: TensorFlow / Keras

Model File: model_final.h5

Input Image Size: 300 × 300

Future Improvements

Mobile application for farmers

Support for more crop diseases

Real-time monitoring

Integration with IoT agricultural sensors
