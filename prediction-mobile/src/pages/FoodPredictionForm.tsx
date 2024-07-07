import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonButtons,IonAlert, IonLabel, IonInput, IonSelect, IonSelectOption, IonGrid, IonRow, IonCol, IonModal, IonButton } from '@ionic/react';
import axios from 'axios';

const FoodPredictionForm: React.FC = () => {
  const [formData, setFormData] = useState({
    typeOfFood: '',
    numberOfGuests: '',
    eventType: '',
    quantityOfFood: '',
    storageConditions: '',
    purchaseHistory: '',
    seasonality: '',
    preparationMethod: '',
    geographicalLocation: '',
    pricing: ''
  });

  const [showModal, setShowModal] = useState(false);
  const [predictionResult, setPredictionResult] = useState<number | null>(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
      // Handle the response data as needed
      const { data } = response;
      setPredictionResult(data['prediction_result']);
      setShowModal(true);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setPredictionResult(null);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Food Prediction Form</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <IonItem>
                <IonLabel>Type of Food</IonLabel>
                <IonSelect name="typeOfFood" value={formData.typeOfFood} onIonChange={e => handleSelectChange("typeOfFood", e.detail.value)}>
                  <IonSelectOption value="Meat">Meat</IonSelectOption>
                  <IonSelectOption value="Vegetarian">Vegetarian</IonSelectOption>
                  <IonSelectOption value="Vegan">Vegan</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonCol>
            <IonCol size="6">
              <IonItem>
                <IonLabel>Number of Guests</IonLabel>
                <IonInput type="number" name="numberOfGuests" value={formData.numberOfGuests} onIonChange={handleChange} />
              </IonItem>
            </IonCol>
            <IonCol size="6">
              <IonItem>
                <IonLabel>Event Type</IonLabel>
                <IonSelect name="eventType" value={formData.eventType} onIonChange={e => handleSelectChange("eventType", e.detail.value)}>
                  <IonSelectOption value="Corporate">Corporate</IonSelectOption>
                  <IonSelectOption value="Wedding">Wedding</IonSelectOption>
                  <IonSelectOption value="Party">Party</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonCol>
            <IonCol size="6">
              <IonItem>
                <IonLabel>Quantity of Food</IonLabel>
                <IonInput type="number" name="quantityOfFood" value={formData.quantityOfFood} onIonChange={handleChange} />
              </IonItem>
            </IonCol>
            <IonCol size="6">
              <IonItem>
                <IonLabel>Storage Conditions</IonLabel>
                <IonSelect name="storageConditions" value={formData.storageConditions} onIonChange={e => handleSelectChange("storageConditions", e.detail.value)}>
                  <IonSelectOption value="Refrigerated">Refrigerated</IonSelectOption>
                  <IonSelectOption value="Room Temperature">Room Temperature</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonCol>
            <IonCol size="6">
              <IonItem>
                <IonLabel>Purchase History</IonLabel>
                <IonSelect name="purchaseHistory" value={formData.purchaseHistory} onIonChange={e => handleSelectChange("purchaseHistory", e.detail.value)}>
                  <IonSelectOption value="Regular">Regular</IonSelectOption>
                  <IonSelectOption value="Occasional">Occasional</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonCol>
            <IonCol size="6">
              <IonItem>
                <IonLabel>Seasonality</IonLabel>
                <IonSelect name="seasonality" value={formData.seasonality} onIonChange={e => handleSelectChange("seasonality", e.detail.value)}>
                  <IonSelectOption value="All Seasons">All Seasons</IonSelectOption>
                  <IonSelectOption value="Summer">Summer</IonSelectOption>
                  <IonSelectOption value="Fall">Winter</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonCol>
            <IonCol size="6">
              <IonItem>
                <IonLabel>Preparation Method</IonLabel>
                <IonSelect name="preparationMethod" value={formData.preparationMethod} onIonChange={e => handleSelectChange("preparationMethod", e.detail.value)}>
                  <IonSelectOption value="Buffet">Buffet</IonSelectOption>
                  <IonSelectOption value="Finger Food">Finger Food</IonSelectOption>
                  <IonSelectOption value="Sit-down Dinner">Sit-down Dinner</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonCol>
            <IonCol size="6">
              <IonItem>
                <IonLabel>Geographical Location</IonLabel>
                <IonSelect name="geographicalLocation" value={formData.geographicalLocation} onIonChange={e => handleSelectChange("geographicalLocation", e.detail.value)}>
                  <IonSelectOption value="Urban">Urban</IonSelectOption>
                  <IonSelectOption value="Suburban">Suburban</IonSelectOption>
                  <IonSelectOption value="Rural">Rural</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonCol>
            <IonCol size="6">
              <IonItem>
                <IonLabel>Pricing</IonLabel>
                <IonSelect name="pricing" value={formData.pricing} onIonChange={e => handleSelectChange("pricing", e.detail.value)}>
                  <IonSelectOption value="Low">Low</IonSelectOption>
                  <IonSelectOption value="High">High</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonCol>
            <IonCol size="12">
              <IonButton onClick={handleSubmit} expand="block">Submit</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        {/* Modal for displaying prediction result */}
        {/*         <IonModal isOpen={showModal} onDidDismiss={closeModal}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Prediction Result</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={closeModal}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonGrid>
              <IonRow>
                <IonCol size="12">
                  <IonLabel>Predicted Wastage Food Amount:</IonLabel>
                  <IonLabel>{predictionResult}</IonLabel>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
        </IonModal> */}
        <IonAlert
          isOpen={showModal}
          onDidDismiss={closeModal}
          header="Predicted Wastage Food Amount"
          message={`${predictionResult}K`}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default FoodPredictionForm;