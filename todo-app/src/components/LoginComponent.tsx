import { IonButton, IonCard, IonIcon, IonInput, IonItem, IonLabel, IonTextarea } from '@ionic/react';
import React,{useState} from 'react'
import { useHistory } from "react-router-dom";

//firebase
import firebase from 'firebase/app'
import { auth } from '../firebase/firebase.js'
import { eye, eyeOffOutline, eyeOutline, lockClosed, person } from 'ionicons/icons';

const LoginComponent = () => {
    const [showPassword,setShowPassword] = useState(false);
    const [errorMessage,setErrorMessage] =useState({
        message:"",
        errorStatus:false
    });
    const [values, setValues] = useState({
        email:{value:"", error:false,message:""},
        password: {value:"", error:false,message:""},
    });
        
    const handleChange = (prop:any) => (e:any) => {
      e.preventDefault();
      let errorFlag=false;
      let errM=""
      if(e.target.value===""){
        errorFlag=true;
        errM="Is Required"
      }
      if(e.target.id==="email" && (!(/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e.target.value)))){
        errorFlag=true;
        errM="Email is not valid."
      }
      setValues({...values, [prop]:{value:e.target.value.trim(),error: errorFlag,message:errM}});
      console.log(values.email.error + "and" +values.email.message)
    };

    const handleClickShowPassword = () => {
    showPassword? setShowPassword(false): setShowPassword(true)
  };

  const handleMouseDownPassword = (event:any) => event.preventDefault(); 
  
  const LoginHandle = ()=>{
    if(!(values.email.error && values.password.error)){
      auth.signInWithEmailAndPassword(values.email.value,values.password.value)
      .catch((error:any)=> {
        setErrorMessage({message:error.message,errorStatus:true})
      })
    }
  }
  const history = useHistory();
  const SignUpHandle = () => {
    history.push('/signUp')
  }
  return (
      <IonCard>
          <IonItem>
          <IonIcon icon={person}/>
              <IonInput 
                type="text" 
                id="email"
                color={values.email.error?'danger':"primary"}
                placeholder="Enter your email" 
                value={values.email.value} 
                onIonChange={handleChange('email')}/>
          </IonItem>
          <IonItem>
        <IonIcon icon={lockClosed}/>
              <IonInput 
                type={showPassword ? 'text' : 'password'} 
                placeholder="Enter your password"
                color={values.password.error?'danger':"primary"} 
                value={values.password.value} 
                onIonChange={handleChange('password')}/>
              <IonIcon icon={showPassword?eyeOffOutline:eyeOutline} onClick={handleClickShowPassword}/>
          </IonItem>
          {errorMessage.errorStatus&&<IonItem>
             <IonLabel color="danger">{errorMessage.message}</IonLabel>
          </IonItem>}
          <IonItem>
            <IonButton className="ion-margin" shape='round' size="default" color="tertiary" expand="block" onClick={LoginHandle}>Login</IonButton>
            <IonButton className="ion-margin" shape='round' size="default" expand="block" onClick={SignUpHandle}>SignUp</IonButton>
          </IonItem>
      </IonCard>
  );
};

export default LoginComponent;
