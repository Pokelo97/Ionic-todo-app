import react, { useState } from 'react';
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import './TodoPage.css';
import LoginComponent from '../components/LoginComponent';

const LogIn = () => {
  return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle >Todo App</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen >
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Todo App</IonTitle>
            </IonToolbar>
          </IonHeader>
          <LoginComponent/>
        </IonContent>
      </IonPage>
  );
};

export default LogIn;
