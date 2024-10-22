"use client"
import { useContext,createContext, ReactNode, useState, useEffect } from "react";

import { getAuth, onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { app, auth, db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

import { UserType } from "../type/user-type";
import { useRouter } from "next/navigation";

type ChildrenType ={
    children: ReactNode
}

type ContextType = {
   user: UserType| null
   setUser: (user:UserType| null)=>void
   loading: boolean 
   setLoading:boolean | any
   
}

export const AuthContext = createContext<ContextType | null>(null)


export default function AuthContextProvider({children}:ChildrenType){
    const [user,setUser] = useState<UserType |null>(null)
    const [loading,setLoading] = useState<boolean>(true)
const route = useRouter()


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
        let docRef = doc(db,'users',uid)
    
        try{
        const userFound = await getDoc(docRef)
    let user = userFound.data()
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







// import { onAuthStateChanged } from "firebase/auth";
// import { createContext, ReactNode, useContext, useEffect, useState } from "react";
// import { auth, db } from "../firebase/firebaseConfig";
// import { doc, getDoc } from "firebase/firestore";
// import { UserType } from "../type/user-type";
// import { User } from "firebase/auth/cordova";



// type AuthContextProviderType = {
//     children:ReactNode
// }

// type ContextType = {
//   user: UserType 
//   setUser: (user: UserType | null)=>void
// }


// const AuthContext = createContext<ContextType| null >(null)


// export default function AuthContextProvider({children}:AuthContextProviderType){
//     const [user,setUser] = useState<UserType | null>(null)

//     useEffect(()=>{
//       onAuthStateChanged(auth,(user)=>{
//           if(user){
//             fetchUser(user.uid)
//           }else{
//             setUser(null)
//           }
//       })
//     },[])
   

//     const fetchUser = async(uid:string)=>{
//       try{
//           let decRef = doc(db,'users',uid)

//        let userFound =  await getDoc(decRef)
            
//        let user = userFound.data()

//        if(!user) return

//        setUser(user as UserType)

//     } catch(e){
//            console.log('user not found');
           
//     }
//   }

//     return(
//           <AuthContext.Provider value={{user}}>
//             {children}
//           </AuthContext.Provider>
//     )
// }


// export const userAuthContext = ()=>useContext(AuthContext)