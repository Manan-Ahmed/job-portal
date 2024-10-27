"use client"

import { deleteDoc, doc } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { db } from "../firebase/firebaseConfig"


type CompanyInfoType = {
  name: string; // Adjust as per the actual structure of companyinfo
};


type CompanyJobCardType = {
    companyinfo:CompanyInfoType,jobTitle:string,jobType:string,jobDescription:string,
    docId:string,address:string,skills:string,salaryRange:string
}


export default function CompanyJobCard(
    {companyinfo,jobTitle,jobType,jobDescription,docId,address,skills,salaryRange}:CompanyJobCardType
){
const route = useRouter()
    const editpage = ()=>{
        route.push(docId)
    }


    const deletedJob= async()=>{
      const docRef = doc(db,"jobs",docId)
      try{
      await deleteDoc(docRef);
      console.log('data  delete');
  }catch(e){
      console.log('data not delete',e);
      
  }  
  }
    return(
        <>
        <div className="p-4 md:w-1/3" >
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
            salatyRange: {salaryRange}
            </p>
            <div className="flex items-center flex-wrap ">
             

              <div>
              <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
               
               
                   <button className="btn btn-primary" onClick={editpage} >
                   Edit
                    
                   </button>
              </span>
              <span className="text-gray-400 inline-flex items-center leading-none text-sm">
              <button className="btn btn-primary" onClick={deletedJob} >
               Delete
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