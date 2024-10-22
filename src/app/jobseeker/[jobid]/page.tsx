"use client"

import { auth, db } from "@/app/firebase/firebaseConfig";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


type JobApplicationType = {
    params: {jobid:string}
}
export default function JobApplication({params: {jobid}}:JobApplicationType){
    const [companyUid,setCompanyUid] = useState('')
    const [coverLetter,setCoverLetter] = useState('')
const route = useRouter()


    useEffect(()=>{
           fetchData()
    },[])
    const fetchData = async()=>{
        let jobRef = doc(db,'jobs',jobid)

        let jobSnapShot = await getDoc(jobRef)
       
         let job = jobSnapShot.data()
        setCompanyUid(job?.uid)
        
      }
    

      const subApplication = async()=>{
        let obj = {
            comanyid: companyUid,
            jobdocid: jobid,
            jobseekeruid: auth.currentUser?.uid,
            coverLetter
        }

        let docRef = collection(db,'applications')
        try{
          await  addDoc(docRef,obj)
          console.log('application successfully');
          setCoverLetter('')

          route.push('/jobseeker')
          
        }catch(e){
            console.log(e);
            
        }
        }
    return(
        <>
           <h1>Applied Job</h1>

               
  <div className="text-center mt-7">
    
    <h1 className="text-center font-bold text-4xl"> Write a suitable cover letter</h1>
  
  <div className="mt-7">
  <textarea
    id="message"
    rows={4}
   value={coverLetter}
   onChange={(e)=>{setCoverLetter(e.target.value)}}
    className="block  p-2.5 m-auto w-2/4 h-34 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    placeholder="Job Description"
  />

  <button
    className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
   onClick={subApplication}
  >
   Submit Application
  </button>

  </div>
  </div>
        </>
    )
}

