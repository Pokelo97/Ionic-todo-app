import React ,{useEffect,useContext,useState} from "react"
import {useHistory} from "react-router-dom"
import { auth } from "../firebase/firebase"

const AuthContext = React.createContext();
export const useAuth =()=> useContext(AuthContext)

export const AuthProvider = ({children})=>{
    const [loading , setLoading]=useState(true)
    const [user,setUser]=useState(null)
    const history= useHistory()

    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
            setUser(user)
            setLoading(false)

            if(user){ 
                history.push('/todo');
            }else{
                history.push('/')}

        })
    },[user,history])
    const value ={user}
    return(
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}