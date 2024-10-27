"use client"
import { useContext,createContext, ReactNode, useState, useEffect } from "react";

import {  onAuthStateChanged } from "firebase/auth";
import {  auth, db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

import { UserType } from "../type/user-type";

type ChildrenType ={
    children: ReactNode
}

type ContextType = {
   user: UserType| null
   setUser: (user:UserType| null)=>void
   loading: boolean 
   setLoading:  (loading: boolean) => void; 
   
}

export const AuthContext = createContext<ContextType | null>(null)


export default function AuthContextProvider({children}:ChildrenType){
    const [user,setUser] = useState<UserType |null>(null)
    const [loading,setLoading] = useState<boolean>(true)


useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
        if(user){
      
          fetchUserData(user.uid)
    
    }else{
     setUser(null)
        
        }
    
    
    })
},[])
 
    const fetchUserData = async(uid:string)=>{
        const docRef = doc(db,'users',uid)
    
        try{
        const userFound = await getDoc(docRef)
        const user = userFound.data()
       setLoading(false)
    if(!user) return
    

    
    setUser(user as UserType)
        }catch(e){
            setLoading(false)

            console.error(e)
        }
    
    }

  
    return(

    
          <AuthContext.Provider value={{user,setUser,loading,setLoading}}>
            {children}
          </AuthContext.Provider>
    )
}

export const useAuthContext = ()=>useContext(AuthContext)






