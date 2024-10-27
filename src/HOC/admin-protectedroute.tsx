"use client"
import { useAuthContext } from "@/app/context/authcontext"
import { useRouter } from "next/navigation"
import { ReactNode, useEffect } from "react"


type AdminProtectedRoutesType = {
    children:   ReactNode
}

export default function AdminProtectedRoutes({children}:AdminProtectedRoutesType){
  
const {user} = useAuthContext()!
const route = useRouter()
    useEffect(()=>{
   
         if(user?.role === 'company'){
              route.push('/company')
         }
         else if(user?.role === 'job seeker'){
           route.push('/job seeker')
         }
        
 },[])


    return(
         <>
         {children}
         </>
    )
}