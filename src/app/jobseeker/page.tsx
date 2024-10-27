"use client"

import { useEffect, useState } from "react"
import { useAuthContext } from "../context/authcontext"
import {  db } from "../firebase/firebaseConfig"
import { collection, doc, DocumentData, getDoc,onSnapshot } from "firebase/firestore"
import JobCard from "../component/jobseekercard"

import style from './jobseeker.module.css'
import Loading from "../component/loading"

export default function JobSeeker(){
const [myJob,setMyJob] = useState<DocumentData[]>([])
const [applied] = useState<boolean>(false)
const [findJob,setFindJob] = useState('')
const [serchjob,setSearchJob] = useState<DocumentData[]>([])
const [show,setShow] = useState<boolean>(false)
const [cardShow,setCardShow] = useState<boolean>(true)
const [loading,setLoading] = useState(true)
    const {user} = useAuthContext()!
    useEffect(()=>{

        if(user){
            setLoading(false)
            fetchjob()

        }else{
            setLoading(false)
            
        }
    },[user])

    const fetchjob = ()=>{
        const jobRef = collection(db,"jobs")



     onSnapshot(jobRef,async (docSnapShot)=>{
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
     try{
        const resolveallpromise = await Promise.all(alljobs)
        setMyJob(resolveallpromise)
     }catch(e){
        console.log(e)
     }
             
        })


    }

   

    const findjob =()=>{
        console.log(findJob);
        
    const searchjobs =    myJob.filter((job)=>(
                job.jobTitle.toLowerCase() === findJob.toLowerCase()
                
    ))
        console.log(searchjobs)
setShow(true)
        setSearchJob(searchjobs)

    } 


    const togglebtn = ()=>{
        setCardShow(false)
    }

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
loading ? <Loading/>

:
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
            {jobTitle,jobType,jobDescription,address,companyinfo,skills,docid,salaryRange,uid})=>(
                    
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