"use client"

import { useEffect, useState } from "react"
import { useAuthContext } from "../context/authcontext"
import { auth, db } from "../firebase/firebaseConfig"
import { collection, doc, DocumentData, getDoc, getDocs, onSnapshot, query, where } from "firebase/firestore"
import JobCard from "../component/jobseekercard"
import { useRouter } from "next/navigation"
import ApplyJobCard from "../component/apply-job-card"
import { relative } from "path"
// import { useRouter } from "next/router"
import style from './jobseeker.module.css'

export default function JobSeeker(){
const [myJob,setMyJob] = useState<DocumentData[]>([])
let [applied,setApplied] = useState<boolean>(false)
let [findJob,setFindJob] = useState('')
let [serchjob,setSearchJob] = useState<DocumentData[]>([])
let [show,setShow] = useState<boolean>(false)
let [cardShow,setCardShow] = useState<boolean>(true)

const route = useRouter()
    const {user} = useAuthContext()!
    useEffect(()=>{
        if(user){
            fetchjob()

        }
    },[user])

    const fetchjob = ()=>{
        let currentUser = auth.currentUser?.uid
        let jobRef = collection(db,"jobs")



     let unsub =  onSnapshot(jobRef,async (docSnapShot)=>{
              let alljobs = docSnapShot.docs.map(async(job)=>{

                let  jobdata = job.data()
                let  jobuid = job.data().uid


                      let docRef = doc(db,"users",jobuid)

                     let jobCreaterinfo =  await  getDoc(docRef)

                    //  console.log('all jobs',jobCreaterinfo.data());

                //      let q =  query(collection(db, "applications"), where("jobdocid", "==",job.id));
                //        let querySnapshot = await getDocs(q)
                         
                //    let applyFeature =    querySnapshot.docs.map((jobs)=>{
                //            let jobdocid =  jobs.data().jobdocid
                //                if(jobdocid === job.id){
                //                 setApplied(true)
                //                }
                               
                //        })
                       
                    
                     let obj = {
                        ...jobdata,
                        companyinfo: jobCreaterinfo.data(),
                        docid: job.id
                     }
                    //  console.log(obj);
                     
                   return obj
     })
     try{
        let resolveallpromise = await Promise.all(alljobs)
        setMyJob(resolveallpromise)
     }catch(e){
        <div>data not found</div>
     }
             
        })


    }

   

    const findjob =()=>{
        console.log(findJob);
        
    let searchjobs =    myJob.filter((job)=>(
                job.jobTitle.toLowerCase() === findJob.toLowerCase()
                
    ))
        console.log(searchjobs)
setShow(true)
        setSearchJob(searchjobs)

    } 


    const togglebtn = ()=>{
        setCardShow(false)
    }

    // const togglebtns = ()=>{
    //     setCardShow(true)
    // }
    return(
        <>

<div  className="text-center">
<div style={{display: 'flex',justifyContent: 'center',gap: '5px',marginTop: '23px',marginBottom: '7px'}}>
 
  <input
  style={{width: '330px'}}
    type="text"
    value={findJob}
    onChange={(e)=>{setFindJob(e.target.value)}}
    placeholder="enter your job Title"
    id="text"
    className="  bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  
  />
  <button 
  style={{backgroundColor: '#2557a7',color: '#ffffff',borderRadius: '4px',padding: '10px' }} onClick={findjob} >
              FindJob
                </button>
</div>

</div>
        



<div 
 style={{borderBottom: '1px solid #e4e2e0',padding: '10px',display: 'flex',justifyContent: 'space-evenly'}}>
    <div className={style.btn}>
        <button onClick={()=>{setCardShow(true)}}>Jobs for you</button>
    </div>
    <div className={style.btn}>
        <button onClick={togglebtn}>Recent Searches</button>
    </div>
</div>






{



cardShow ?




         <div className="md:flex flex-row justify-center ">








{
    show ? 
     
             serchjob.map(( 
                {jobTitle,jobType,jobDescription,address,companyinfo,skills,docid,salaryRange,uid})=>(
<JobCard key={docid} companyinfo={companyinfo.name} jobTitle={jobTitle} jobType={jobType} jobDescription={jobDescription}
 docId={docid} address={address} skills={skills} salaryRange={salaryRange} companyuid={uid} applied={applied}/>
                ))
                
         :
         myJob.map((
            {jobTitle,jobType,jobDescription,address,companyinfo,skills,docid,salaryRange,uid},i)=>(
                    
        <JobCard key={docid} companyinfo={companyinfo.name} jobTitle={jobTitle} jobType={jobType} jobDescription={jobDescription}
         docId={docid} address={address} skills={skills} salaryRange={salaryRange} companyuid={uid} applied={applied}/>
        
            ))


        
        }





       </div>


     :
     <div className="text-center " style={{position: 'relative',top: '70px'}}>
        <h1 className="font-bold">No Recent Search Yet</h1>
        <p>After you run a search,<br /> your recent searches will live here.</p>
        </div>

         


          }

        </>
    )
}