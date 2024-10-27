"use client"

import AdminJobCard from "@/app/component/admin-alljobs"
import { db } from "@/app/firebase/firebaseConfig"
import { collection, doc, DocumentData, getDoc, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"

export default function AllJobs(){
 const [alljobs,setAllJobs] = useState<DocumentData[]>()
    useEffect(()=>{
        fetchJobs()

      
    },[])

    const fetchJobs = ()=>{
        const jobRef = collection(db,"jobs")

         onSnapshot(jobRef,async(docSnapShot)=>{
       const alljobs =     docSnapShot.docs.map(async(job)=>{
                  const jobsData = job.data()
                  const jobsuid = job.data().uid

                  
                  const docRef = doc(db,"users",jobsuid)

                  const jobcreaterinfo = await getDoc(docRef)
                  console.log(jobcreaterinfo.data());

const obj ={
    ...jobsData,
   companyinfo: jobcreaterinfo.data(),
   docid: job.id
}
return obj
               })
               const allpromiseresolve = await Promise.all(alljobs)
               setAllJobs(allpromiseresolve)

        })
    }
    return(
        <>
         {
      alljobs && alljobs.map(( 
    {jobTitle,jobType,address,docid,jobDescription,companyinfo,skills,salaryRange,hold,deleted})=>(

        <AdminJobCard
        key={docid}
     companyinfo={companyinfo.name} 
     jobTitle={jobTitle} 
     jobType={jobType} 
     jobDescription={jobDescription} 
     docId={docid} 
     address={address} 
     skills={skills} 
     salaryRange={salaryRange} 
     hold={hold}
     deleted={deleted}
     applied={false}        
        
        
        
        />
    ))


      
         }
        </>
    )
}