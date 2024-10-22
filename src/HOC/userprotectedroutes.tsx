import { useAuthContext } from "@/app/context/authcontext"
import { auth } from "@/app/firebase/firebaseConfig"
import { onAuthStateChanged } from "firebase/auth"
import { useRouter } from "next/navigation"
import { ReactNode, useEffect, useState } from "react"


type UserProtectedRoutesType = {
    children:   ReactNode
}

export default function UserProtectedRoutes({children}:UserProtectedRoutesType){

const {user} = useAuthContext()!
const route = useRouter()
    useEffect(()=>{
   
           if(user){
            if(user.role === 'company'){
                 route.push('/company')
            }else if(user.role === 'job seeker'){
                route.push('/jobseeker')
            }else if(user.role === 'admin'){
              route.push('/admin')
            }
           }
    },[user])


    return(
         <>
         {children}
         </>
    )
}

