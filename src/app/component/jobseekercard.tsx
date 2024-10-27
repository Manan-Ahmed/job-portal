"use client"

import { useRouter } from "next/navigation"
import {  auth, db } from "../firebase/firebaseConfig"
import { addDoc, collection, getDocs, query, where } from "firebase/firestore"
import style from "./job-navbar.module.css"
import { useEffect, useState } from "react"

type CompanyInfoType = {
  name: string; // Adjust as per the actual structure of companyinfo
};

type jobCardType = {
    companyinfo:CompanyInfoType,jobTitle:string,jobType:string,jobDescription:string,
    docId:string,address:string,skills:string,salaryRange:string,companyuid:string,applied:boolean
}


export default function JobCard(
    {companyinfo,jobTitle,jobType,jobDescription,docId,address,skills,salaryRange,companyuid}:jobCardType
){
console.log('uid',companyuid,'jobdocid',docId,'currentuser',auth.currentUser?.uid);

const [isSaved,setIsSaved] = useState(false)  
const [isApplied,setIsApplied] = useState(false)  


useEffect(()=>{
const checkIfFavorite = async()=>{
  try{
    const favoritejob = await favoritejobFetch()
    if(favoritejob){
       setIsSaved(true)
    }
  }catch(e){
        console.log(e)
  }
}
checkIfFavorite()
},[])



useEffect(()=>{
  const checkapplyjobs = async()=>{
    try{
      const applyjobs = await appliedjobFetch()
      
      if(applyjobs){
        setIsApplied(true)
      }
    }catch(e){
      console.log(e);
      
    }
  }
  checkapplyjobs()
},[])




const route = useRouter()
const goToApply = ()=>{
    route.push(`/jobseeker/${docId}`)
}

    const favoritejob = async()=>{
        const favoriteObj = {
          jobdocid: docId,
          companyUid: companyuid,
          jobseekerid: auth.currentUser?.uid
        }
        
        const favoriteRef = collection(db,'favorites')
          
        try{
          await addDoc(favoriteRef,favoriteObj)
          console.log('favorite job saved');
      
        }catch(e){
          console.log('favorite job not saved',e);
          
        }
      }


const favoritejobFetch = async()=>{
 const q =  query(collection(db, "favorites"),
  where("jobseekerid","==",auth.currentUser?.uid),
  where('jobdocid','==',docId),
  where("companyUid",'==',companyuid))
                       const querySnapshot = await getDocs(q)
                         const jobs = querySnapshot.docs.map((job)=> job.data())
                         
                        return jobs.length > 0 ? jobs[0] : null
                   
}


const appliedjobFetch = async()=>{    

const q = query(collection(db,'applications'), 
where('jobseekeruid','==',auth.currentUser?.uid),where('jobdocid','==',docId))
const querySnapshot = await getDocs(q)

console.log('applied job',querySnapshot.docs);
const jobs = querySnapshot.docs.map((job)=> job.data())
return jobs.length > 0 ? jobs[0] : null
 

}

    return(
        <>
        <div className="p-4 md:w-1/2" >
        <div  className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
         
          <div className="p-6" >
            <h3 className="card-title">Company Name:{companyinfo.name} </h3>
            <h2 className="card-title m-2">Job Tittle: {jobTitle}
            </h2>
            <h2 className="card-title title-font text-lg font-medium text-gray-900 mb-3">
            Job Type: {jobType}
            </h2>
            <p className="leading-relaxed mb-3">
            Job Description: {jobDescription}
            </p>
            <p className="leading-relaxed mb-3">
            Address: {address}
            </p>
            <p className="leading-relaxed mb-3">
            Skills: {skills}
            </p>
            <p className="leading-relaxed mb-3">
            salaryRange: {salaryRange}
            </p>
            <div className="flex items-center flex-wrap ">
             

              <div>
              <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
               
               
                   <button className={style.btn} onClick={goToApply} disabled={isApplied} >
                  {
                    isApplied ? "applied" : 'Apply now'
                  } 
                    
                   </button>
              </span>
              <span className="text-gray-400 inline-flex items-center leading-none text-sm">
              <button className={style.btn} onClick={favoritejob} disabled={isSaved} >
               {isSaved ? 'Saved':'favorite'}
                </button>

                
              </span>
            </div>
          </div>
        </div>
      </div>

      </div>
        </>
    )
}