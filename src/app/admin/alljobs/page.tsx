"use client"

import AdminJobCard from "@/app/component/admin-alljobs"
import { db } from "@/app/firebase/firebaseConfig"
import { collection, doc, DocumentData, getDoc, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"

export default function AllJobs(){
 let [alljobs,setAllJobs] = useState<DocumentData[]>()
    useEffect(()=>{
        fetchJobs()
    },[])

    const fetchJobs = ()=>{
        const jobRef = collection(db,"jobs")

        let unsub = onSnapshot(jobRef,async(docSnapShot)=>{
       let alljobs =     docSnapShot.docs.map(async(job)=>{
                  let jobsData = job.data()
                  let jobsuid = job.data().uid

                  
                  const docRef = doc(db,"users",jobsuid)

                  const jobcreaterinfo = await getDoc(docRef)
                  console.log(jobcreaterinfo.data());

let obj ={
    ...jobsData,
   companyinfo: jobcreaterinfo.data(),
   docid: job.id
}
return obj
               })
               let allpromiseresolve = await Promise.all(alljobs)
               setAllJobs(allpromiseresolve)

        })
    }
    return(
        <>
         <h1>All jobs</h1>
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
    //  companyuid={""} 
     applied={false}        
        
        
        
        />
    ))


      
         }
        </>
    )
}