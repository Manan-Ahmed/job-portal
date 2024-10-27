"use client"

import { auth, db } from "@/app/firebase/firebaseConfig"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"

export default function AllApplications(){
   

    const currentUser = auth.currentUser?.uid
    const [loading,setLoading] = useState(true)

        useEffect(()=>{
            if(currentUser){
                fetchjob()
                setLoading(loading)
    
            }else{
                setLoading(false)
            }
        },[])
    
        
    const fetchjob = ()=>{
        const  jobsRef = collection(db,"applications")

        const  condition = where('companyid','==',currentUser)

        const  q = query(jobsRef,condition )

       onSnapshot(q,async (docSnapShot)=>{
        console.log(docSnapShot);

            
          
        })


    }






    return(
        <>
         <h1 className="text-center">No Application Recieved</h1>
       

    
        </>
    )


}