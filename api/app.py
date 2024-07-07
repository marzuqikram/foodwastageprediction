from flask import Flask, request, jsonify
import pickle
import pandas as pd
from sklearn.preprocessing import StandardScaler, LabelEncoder
from flask_cors import CORS  # Import CORS from flask_cors

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes on your Flask app

# Load the model and other necessary components
with open('model/wastage_food_model.pkl', 'rb') as file:
    model = pickle.load(file)

# Assuming these are the same as used during training
label_encoders = {
    'Type of Food': LabelEncoder().fit(['Meat', 'Vegetables', 'Fruits']),
    'Event Type': LabelEncoder().fit(['Corporate', 'Birthday', 'Wedding', 'Social Gathering']),
    'Storage Conditions': LabelEncoder().fit(['Refrigerated', 'Room Temperature']),
    'Purchase History': LabelEncoder().fit(['Regular', 'Occasional']),
    'Seasonality': LabelEncoder().fit(['All Seasons', 'Winter', 'Summer']),
    'Preparation Method': LabelEncoder().fit(['Buffet', 'Finger Food', 'Sit-down Dinner']),
    'Geographical Location': LabelEncoder().fit(['Urban', 'Suburban', 'Rural']),
    'Pricing': LabelEncoder().fit(['Low', 'Moderate', 'High'])
}
scaler = StandardScaler()

# Normalize numerical columns using the fitted scaler (assuming you have saved the scaler during training)
# If you haven't saved it, fit a new scaler on the training data
scaler.fit([[310, 450], [400, 500], [302, 371], [491, 497], [300, 400], [302, 371], [240, 450], [300, 400], [320, 400], [400, 500], [320, 400], [302, 371], [400, 500], [250, 350], [267, 393], [350, 450], [300, 400], [380, 500], [300, 450], [220, 300], [220, 450]])

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    
    # Convert the data into a DataFrame
    new_data = pd.DataFrame({
        'Type of Food': [label_encoders['Type of Food'].transform([data['typeOfFood']])[0]],
        'Number of Guests': [data['numberOfGuests']],
        'Event Type': [label_encoders['Event Type'].transform([data['eventType']])[0]],
        'Quantity of Food': [data['quantityOfFood']],
        'Storage Conditions': [label_encoders['Storage Conditions'].transform([data['storageConditions']])[0]],
        'Purchase History': [label_encoders['Purchase History'].transform([data['purchaseHistory']])[0]],
        'Seasonality': [label_encoders['Seasonality'].transform([data['seasonality']])[0]],
        'Preparation Method': [label_encoders['Preparation Method'].transform([data['preparationMethod']])[0]],
        'Geographical Location': [label_encoders['Geographical Location'].transform([data['geographicalLocation']])[0]],
        'Pricing': [label_encoders['Pricing'].transform([data['pricing']])[0]]
    })

    # Normalize numerical columns
    new_data[['Number of Guests', 'Quantity of Food']] = scaler.transform(new_data[['Number of Guests', 'Quantity of Food']])

    # Make predictions
    prediction = model.predict(new_data)
    
    return jsonify({'prediction_result': prediction[0]})

if __name__ == '__main__':
    app.run(debug=True)