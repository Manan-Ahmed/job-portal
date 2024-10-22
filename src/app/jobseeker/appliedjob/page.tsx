"use client"

import ApplyJobCard from "@/app/component/apply-job-card"
import { useAuthContext } from "@/app/context/authcontext"
import { auth, db } from "@/app/firebase/firebaseConfig"
import { collection, doc, DocumentData, getDoc, onSnapshot, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"

export default function AppliedJob(){


    const [applyjob,setApplyJob] = useState<DocumentData[]>([])
    const {user} = useAuthContext()!
    let currentUser = auth.currentUser?.uid

        useEffect(()=>{
            if(currentUser){
                fetchjob(currentUser)
    
            }
        },[user])
    
        const fetchjob = (uid:string)=>{
            let jobsRef = collection(db,"applications")
    
            let condition = where('jobseekeruid','==',currentUser)
    
            let q = query(jobsRef,condition)
    
         let unsub =  onSnapshot(q,async (docSnapShot)=>{
                  console.log(docSnapShot);
                  let alljobs = docSnapShot.docs.map(async(job)=>{
    
                    let jobid = job.data().jobdocid
                     
                    let docRef = doc(db,"jobs",jobid)
                   let jobs =   await getDoc(docRef)    
                          
                   console.log(jobs.id);
                   
                        let obj = {
                            ...jobs.data(),
                            jobid
                        }
                        console.log(obj);
                        
    return obj
                     
                         
                     
         })
                  let resolveallpromise = await Promise.all(alljobs)
                  setApplyJob(resolveallpromise)
            })
    
    
        }
    return(
        <>
           <h1>Applied Job</h1>

           {
            applyjob && applyjob.map(({jobTitle,jobType,jobDescription,address,skills,jobid,salaryRange},i)=>(
                 <ApplyJobCard
                    key={jobid} jobTitle={jobTitle} jobType={jobType} jobDescription={jobDescription}
                    docId={jobid} address={address} skills={skills} salaryRange={salaryRange} companyinfo={undefined}   />
            ))
           }
        </>
    )
}