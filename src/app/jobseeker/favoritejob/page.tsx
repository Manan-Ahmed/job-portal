"use client"

import FavoriteJobCard from "@/app/component/favoritejobcard"
import Loading from "@/app/component/loading"
import { useAuthContext } from "@/app/context/authcontext"
import { auth, db } from "@/app/firebase/firebaseConfig"
import { collection, doc, DocumentData, getDoc, onSnapshot, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"

export default function FavoriteJob(){

    const [applyjob,setApplyJob] = useState<DocumentData[]>([])
    const {user} = useAuthContext()!
    const [loading,setLoading] = useState(true)

    const currentUser = auth.currentUser?.uid

        useEffect(()=>{
            if(currentUser){
                setLoading(false)
                fetchjob()
    
            }else{
                setLoading(false)
            }
        },[user])
    
        const fetchjob = ()=>{
            const jobsRef = collection(db,"applications")
    
            const condition = where('jobseekeruid','==',currentUser)
    
            const q = query(jobsRef,condition)
    
         onSnapshot(q,async (docSnapShot)=>{
                  const alljobs = docSnapShot.docs.map(async(job)=>{
    
                    const jobid = job.data().jobdocid
                    const uid = job.data().comanyid
                     
                    const compRef = doc(db,"users",uid)
                    const createjob =   await getDoc(compRef) 
                    
                    const comapnyinfo= createjob.data()
                    

                    const docRef = doc(db,"jobs",jobid)
                   const jobs =   await getDoc(docRef)    

        
                   
                        const obj = {
                            ...jobs.data(),
                           comapnyinfo,
                            jobid
                        }
                        console.log(obj);
                        
    return obj
                     
                         
                     
         })
                  const resolveallpromise = await Promise.all(alljobs)
                  setApplyJob(resolveallpromise)
            })
    
    
        }
    return(
        <>

           {
            loading ? <Loading/>
             :
            applyjob && applyjob.map(({jobTitle,jobType,jobDescription,address,skills,jobid,salaryRange})=>(
                 <FavoriteJobCard
                    key={jobid} jobTitle={jobTitle} jobType={jobType} jobDescription={jobDescription}
                    docId={jobid} address={address} skills={skills} salaryRange={salaryRange}     />
            ))
           }
        </>
    )
}