from flask import Flask, request, jsonify
import joblib
import pandas as pd
from flask_cors import CORS  # To allow JS frontend to call the API

app = Flask(__name__)
CORS(app)

model = joblib.load("cow_disease_model.pkl")
symptoms = model.selected_features # Load the actual features used during training




@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    symptom_inputs = data.get("symptoms", [])

    input_vector = [1 if sym in symptom_inputs else 0 for sym in symptoms]
    input_df = pd.DataFrame([input_vector], columns=symptoms)

    prediction = model.predict(input_df)[0]
    return jsonify({"disease": prediction})


if __name__ == '__main__':
    app.run(debug=True)
