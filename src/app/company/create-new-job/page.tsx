"use client"

import { auth, db } from "@/app/firebase/firebaseConfig"
import { addDoc, collection } from "firebase/firestore"
import { useState } from "react"

export default function CreateJob(){
    const [jobTitle,setJobTitle] = useState('')
    const [jobType,setJobType] = useState('')
    const [skills,setSkills] = useState('')
    const [jobDescription,setJobDescription] = useState('')
    const [address,setAddress] = useState('')
    const [salaryRange, setSalaryRange] = useState("");
    const [qualification, setQualification] = useState("");


    const createJob = async()=>{
        const currentUser = auth.currentUser?.uid
        const jobObj = {jobTitle,jobType,skills,jobDescription,address,uid:currentUser,salaryRange,qualification}
        const collectionRef = collection(db,"jobs")
try{
    await addDoc(collectionRef,jobObj)
       
}catch(e){
    console.log('job not save',e);
    
}
    }


    return(
        <>
               
<div className="max-w-sm mx-auto">


<div className="mb-3">
    <label
      htmlFor="password"
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
    </label>
    <input
      type="text"
      value={jobTitle} onChange={(e)=>{setJobTitle(e.target.value)}}
      id="jobTittle"
      placeholder="job Title"
      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
    />
  </div>



<div className="mb-2">
    <label
      htmlFor="repeat-password"
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
    </label>
   
      <select
                className="select select-bordered bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                value={jobType}
                onChange={(e) => { setJobType(e.target.value) }}
            >
                <option disabled>
                    Job Type
                </option>
                <option value={"internship"}>Internship</option>
                <option value={"contract"}>Contract</option>
                <option value={"part time"}>Part Time</option>
                <option value={"full time"}>Full Time</option>
            </select>
  </div>

  <div className="mb-3">
    <label
      htmlFor="password"
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
    </label>
    <input
      type="text"
      value={qualification} onChange={(e)=>{setQualification(e.target.value)}}
      id="qualification"
      placeholder=" qualification"
      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
    />
  </div>

 

  <div className="mb-3">
    <label
      htmlFor="password"
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
    </label>
    <input
      type="text"
      value={skills} onChange={(e)=>{setSkills(e.target.value)}}

            id="Description"
      placeholder="enter your skills"
      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
    />
  </div>

  <div className="mb-3">
    <label
      htmlFor="password"
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
    </label>
    <input
      type="text"
      value={salaryRange} onChange={(e)=>{setSalaryRange(e.target.value)}}

            id="Description"
      placeholder="salaryRange"
      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
    />
  </div>

  <div className="mb-3">
    <label
      htmlFor="password"
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
    </label>
    <input
      type="text"
      value={address} onChange={(e)=>{setAddress(e.target.value)}}

            id="Description"
      placeholder="enter your address "
      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
    />
  </div>

  <div>
  <label
    htmlFor="message"
    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  >
  </label>
  <textarea
    id="message"
    rows={4}
    value={jobDescription} onChange={(e)=>{setJobDescription(e.target.value)}}
    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    placeholder="Job Description"
  />
</div>
  <button  
        className="btn btn-primary float-right m-3" onClick={createJob}>
CreateJob
        </button>






  </div>
        
        </>
    )
}



