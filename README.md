## Running

python app.py

####

Making Predictions via API
Make predictions by sending a POST request to the /predict endpoint with JSON data. For example, you can use curl or any API client like Postman to send a request

curl -X POST http://127.0.0.1:5000/predict -H "Content-Type: application/json" -d '{
    "Type of Food": "Meat",
    "Number of Guests": 300,
    "Event Type": "Corporate",
    "Quantity of Food": 400,
    "Storage Conditions": "Refrigerated",
    "Purchase History": "Regular",
    "Seasonality": "Winter",
    "Preparation Method": "Buffet",
    "Geographical Location": "Urban",
    "Pricing": "Low"
}'


