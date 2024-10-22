"use client"
import { useAuthContext } from "@/app/context/authcontext"
import { useRouter } from "next/navigation"
// import { useRouter } from "next/router"
import { ReactNode, useEffect, useState } from "react"


type JobSeekerProtectedRoutesType = {
    children:   ReactNode
}

export default function JobSeekerProtectedRoutes({children}:JobSeekerProtectedRoutesType){
  
const {user} = useAuthContext()!
const route = useRouter()
    useEffect(()=>{
   
         if(user?.role === 'company'){
              route.push('/company')
         }
         else if(user?.role === 'admin'){
           route.push('/admin')
         }if(user && user.role === 'job seeker' && !("name" in user)){
            route.push('/jobseeker/jobseekerinfo')
         }
        
 },[user])


    return(
         <>
         {children}
         </>
    )
}