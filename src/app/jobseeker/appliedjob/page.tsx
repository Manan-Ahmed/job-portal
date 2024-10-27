"use client"

import ApplyJobCard from "@/app/component/apply-job-card"
import Loading from "@/app/component/loading"
import { useAuthContext } from "@/app/context/authcontext"
import { auth, db } from "@/app/firebase/firebaseConfig"
import { collection, doc, DocumentData, getDoc, onSnapshot, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"

export default function AppliedJob(){


    const [applyjob,setApplyJob] = useState<DocumentData[]>([])
    const {user} = useAuthContext()!
    const currentUser = auth.currentUser?.uid
    const [loading,setLoading] = useState(true)

        useEffect(()=>{
            if(currentUser){
                fetchjob()
                setLoading(loading)
    
            }else{
                setLoading(false)
            }
        },[user])
    
        const fetchjob = ()=>{
            const  jobsRef = collection(db,"applications")
    
            const  condition = where('jobseekeruid','==',currentUser)
    
            const  q = query(jobsRef,condition )
    
       onSnapshot(q,async (docSnapShot)=>{
                  const alljobs = docSnapShot.docs.map(async(job)=>{
                 
                    
                    const applydata = job.data()
                    const jobid = job.data().jobdocid
                    
                   const applyRef = doc(db,"jobs",applydata.jobdocid)

                       const jobs =  await getDoc(applyRef)
                      
                       const compRef = doc(db,"users",applydata.comanyid)

                       const company =  await getDoc(compRef)
                        const obj = {
                             
                            ...jobs.data(),
                            companyinfo: company.data(),
                            jobid
                        }
                        console.log('job',obj);
                        
    return obj
                     
                         
                     
         })
                  const resolveallpromise = await Promise.all(alljobs)
                  setApplyJob(resolveallpromise)
            })
    
    
        }
    return(
        <>
           <h1>Applied Job</h1>

           {
            loading ? <Loading/> :
            applyjob && applyjob.map(({companyinfo,jobTitle,jobType,jobDescription,address,skills,jobid,salaryRange})=>(
                 <ApplyJobCard
                    key={jobid} companyinfo={companyinfo.name} jobTitle={jobTitle} jobType={jobType} jobDescription={jobDescription}
                    docId={jobid} address={address} skills={skills} salaryRange={salaryRange} />
            ))
           }
        </>
    )
}