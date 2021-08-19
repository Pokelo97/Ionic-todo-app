import react, { useState } from 'react';
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import './TodoPage.css';
import SignUpComponent from '../components/SignUpComponent';

const SignUp = () => {
  
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
          <SignUpComponent/>
        </IonContent>
      </IonPage>
  );
};

export default SignUp;
