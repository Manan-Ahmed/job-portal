"use client"

import CompanyJobCard from "@/app/component/companyjobcard"
import Loading from "@/app/component/loading"
import { useAuthContext } from "@/app/context/authcontext"
import { auth, db } from "@/app/firebase/firebaseConfig"
import { collection, doc, DocumentData, getDoc, onSnapshot, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"


export default function AllJobs(){
    const [companyjob,setCompanyJob] = useState<DocumentData[]>([])
const {user} = useAuthContext()!
const [loading,setLoading] = useState(true)

    useEffect(()=>{
        if(user){
            fetchjob()
            setLoading(false)

        }else{
            setLoading(false)

        }

       
    },[user])

    const fetchjob = ()=>{
        const currentUser = auth.currentUser?.uid
        const jobsRef = collection(db,"jobs")

        const condition = where('uid','==',currentUser)

        const q = query(jobsRef,condition)

       onSnapshot(q,async (docSnapShot)=>{
              console.log(docSnapShot);
              const alljobs = docSnapShot.docs.map(async(job)=>{

                const  jobdata = job.data()
                const  jobuid = job.data().uid


                      const docRef = doc(db,"users",jobuid)

                     const jobCreaterinfo =  await  getDoc(docRef)


                     const obj = {
                        ...jobdata,
                        companyinfo: jobCreaterinfo.data(),
                        docid: job.id
                     }
                     console.log(obj);
                     
                   return obj
     })
              const resolveallpromise = await Promise.all(alljobs)
              setCompanyJob(resolveallpromise)
        })


    }

   

    return(
        <>

           {
            loading ? <Loading/> :
            companyjob && companyjob.map((
        {jobTitle,jobType,address,docid,jobDescription,companyinfo,skills,salaryRange})=>(
                   
                <CompanyJobCard  key={docid} address={address} skills={skills} salaryRange={salaryRange} companyinfo={companyinfo} jobTitle={jobTitle} jobType={jobType} jobDescription={jobDescription} docId={docid} />
        ))
           }
        </>
    )
}