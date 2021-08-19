import react, { useState } from 'react';
import { IonButton, IonCard, IonIcon, IonInput, IonItem, IonLabel, IonTextarea } from '@ionic/react';
import { useHistory } from "react-router-dom";
//firebase
import firebase from 'firebase/app'
import { auth,db } from '../firebase/firebase';
import { eyeOffOutline, eyeOutline, lockClosed, mailOpen, person, personOutline } from 'ionicons/icons';


const SignUpComponent = () => {
    const history = useHistory();
    const [values, setValues] = useState({
        name:{value:"", error:false,message:""},
        surname:{value:"", error:false,message:""},
        email:{value:"", error:false,message:""},
        password: {value:"", error:false,message:""},
        confirmPassword:{value:"", error:false,message:""},
      });
      const [errMessage,setErrMessage]=useState({
        message:'',
        error:false
      })
      const [showPassword,setShowPassword] = useState(false);
      const [showConfirmPassword,setShowConfirmPassword] = useState(false);
      const [open, setOpen] = useState(false);
      const severity="error";
      
      const handleSignIn =()=>{
        history.push('/')
      }
      const handleClickShowConfirmPassword = () => {
          showConfirmPassword? setShowConfirmPassword(false): setShowConfirmPassword(true)
      };
      const handleClickShowPassword = () => {
          showPassword? setShowPassword(false): setShowPassword(true)
      };
      const handleMouseDownPassword = (event:any) => {
        event.preventDefault();
      };
      const handleChange = (prop:any) => (e:any) => {
        e.preventDefault();
        let errorFlag=false;
        let errM=""
        if(e.target.value===""){
              errorFlag=true;
          errM="Is Required"
          }
        if(e.target.value.length >0){
          if((e.target.id==="name" || e.target.id==="surname") && e.target.value.length < 3 ){
              errorFlag=true;
              errM="Minimum  of 3 characters is required!";
          }
          if(e.target.id==="email" && (!(/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e.target.value)))){
            errorFlag=true;
            errM="Email is not valid."
          }
          if (e.target.id==="password" && e.target.value.length < 6){
            errorFlag=true;
            errM="Password should have minimum 6 characters!"
          }
          if (e.target.id==="confirmPassword" && e.target.value !== values.password.value){
            errorFlag=true;
            errM="The passwords do not match!"
          }
        }
          setValues({...values, [prop]:{value:e.target.value.trim(),error: errorFlag,message:errM}});
      };
    
      const handleSubmit = (e:any) =>{
        e.preventDefault();
          if(values.name.error||
              values.surname.error||
              values.password.error||
              values.email.error||
              values.confirmPassword.error){
            console.log("err")

          }else{
            auth.createUserWithEmailAndPassword(values.email.value,values.password.value)
            .then((authenticate:any)=>{
                authenticate.user.updateProfile({
                    displayName: values.name.value +" "+values.surname.value 
                  })
                  .then((credential:any) =>{ 
                    history.push('/todo')})
                  .catch((error:any) => {
                    setErrMessage({message:error.message,error:true});
                    console.log(error)
                    setOpen(true);});
            })
            .catch((err:any)=> {
              setErrMessage({message:err.message,error:true});
              console.log(err)
              setOpen(true);})
          }
      }
  return (
    <IonCard>
      <IonItem>
        <IonIcon icon={person}/>
          <IonInput 
                type='text' 
                id="name"
                placeholder="Enter your name"
                color={values.name.error?'danger':"primary"} 
                value={values.name.value} 
                onIonChange={handleChange('name')}/>
          </IonItem>
      <IonItem>
      <IonIcon icon={person}/>
          <IonInput 
                type='text' 
                id="text"
                placeholder="Enter your surname"
                color={values.surname.error?'danger':"primary"} 
                value={values.surname.value} 
                onIonChange={handleChange('surname')}/>
          </IonItem>
          <IonItem>
        <IonIcon icon={mailOpen}/>
              <IonInput 
                type='email' 
                id="email"
                placeholder="Enter your email"
                color={values.email.error?'danger':"primary"} 
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
          <IonItem>
        <IonIcon icon={lockClosed}/>
              <IonInput 
                type={showConfirmPassword ? 'text' : 'password'} 
                placeholder="Confirm password"
                color={values.confirmPassword.error?'danger':"primary"} 
                value={values.confirmPassword.value} 
                onIonChange={handleChange('confirmPassword')}/>
              <IonIcon icon={showConfirmPassword?eyeOffOutline:eyeOutline} onClick={handleClickShowConfirmPassword}/>
          </IonItem>
          {errMessage.error&&<IonItem>
             <IonLabel color="danger">{errMessage.message}</IonLabel>
          </IonItem>}
          <IonItem>
            <IonButton className="ion-margin" color='tertiary'shape='round' size="default" expand="block" onClick={handleSignIn}>Login</IonButton>
            <IonButton className="ion-margin" expand="block" shape='round' size="default" onClick={handleSubmit}>SignUp</IonButton>
          </IonItem>
      </IonCard>
  );
};

export default SignUpComponent;
