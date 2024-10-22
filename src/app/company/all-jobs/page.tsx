"use client"

import CompanyJobCard from "@/app/component/companyjobcard"
import CompanyJob from "@/app/component/companyjobcard"
import { useAuthContext } from "@/app/context/authcontext"
import { auth, db } from "@/app/firebase/firebaseConfig"
import { collection, doc, DocumentData, getDoc, onSnapshot, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"


export default function AllJobs(){
    const [companyjob,setCompanyJob] = useState<DocumentData[]>([])
const {user} = useAuthContext()!
    useEffect(()=>{
        if(user){
            fetchjob()

        }
    },[user])

    const fetchjob = ()=>{
        let currentUser = auth.currentUser?.uid
        let jobsRef = collection(db,"jobs")

        let condition = where('uid','==',currentUser)

        let q = query(jobsRef,condition)

     let unsub =  onSnapshot(q,async (docSnapShot)=>{
              console.log(docSnapShot);
              let alljobs = docSnapShot.docs.map(async(job)=>{

                let  jobdata = job.data()
                let  jobuid = job.data().uid


                      let docRef = doc(db,"users",jobuid)

                     let jobCreaterinfo =  await  getDoc(docRef)

                     console.log('company data',jobCreaterinfo.data());

                     let obj = {
                        ...jobdata,
                        companyinfo: jobCreaterinfo.data(),
                        docid: job.id
                     }
                     console.log(obj);
                     
                   return obj
     })
              let resolveallpromise = await Promise.all(alljobs)
              setCompanyJob(resolveallpromise)
        })


    }

   

    return(
        <>
           <h1>all jobs</h1>

           {
            companyjob && companyjob.map((
        {jobTitle,jobType,address,docid,jobDescription,companyinfo,skills,salaryRange})=>(
                   
                <CompanyJobCard  key={docid} address={address} skills={skills} salaryRange={salaryRange} companyinfo={companyinfo.name} jobTitle={jobTitle} jobType={jobType} jobDescription={jobDescription} docId={docid} />
        ))
           }
        </>
    )
}