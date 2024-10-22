"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { app, auth, db } from "../firebase/firebaseConfig"
import { addDoc, collection, doc, updateDoc } from "firebase/firestore"
// import { useRouter } from "next/router"

type AdminJobCardType = {
    companyinfo:any,jobTitle:string,jobType:string,jobDescription:string,
    hold?: boolean,deleted?:boolean,
    docId:string,address:string,skills:string,salaryRange:string,companyuid?:string,applied:boolean
}


export default function AdminJobCard(
{companyinfo,jobTitle,jobType,jobDescription,docId,address,skills,salaryRange,applied,hold,deleted}:AdminJobCardType
){
const route = useRouter()
const goToApply = ()=>{
    route.push(`/jobseeker/${docId}`)
}

    const changePublishStatus = ()=>{
        let docRef = doc(db,"jobs",docId)
        console.log(docId);
        
        if(hold){
            updateDoc(docRef,{hold: false})
        }else{
            updateDoc(docRef,{hold: true})
        }
    }

    
    const changeDeleteStatus = ()=>{
        let docRef = doc(db,"jobs",docId)
        if(deleted){
            updateDoc(docRef,{deleted: false})
        }else{
            updateDoc(docRef,{deleted: true})
        }
    }
    return(
        <>
        {/* <div className="md:flex flex-row"> */}
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
               
               
                   <button className="btn btn-primary" onClick={changePublishStatus} >
                  {
                    hold ? "Publish" : "Hold"
                  } 
                    
                   </button>
              </span>
              <span className="text-gray-400 inline-flex items-center leading-none text-sm">
              <button className="btn btn-primary" onClick={changeDeleteStatus} >
             {
                deleted ? "Recover" : 'Delete'
             }
                </button>

                
              </span>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>

      </div>
        </>
    )
}