"use client"

import { useEffect, useState } from "react"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "@/app/firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function JobSeekerInfo(){
  const [name,setName] = useState('')
  const [pic,setPic] = useState<File>()
  const [resume,setResume] = useState<File>()

  const [picUrl,setPicUrl] = useState('')
  const [resumeURL,setResumeURL] = useState('')

  const [phone,setPhone] = useState('')
  const [address,setAddress] = useState('')
  const [description,setDescription] = useState('')

const route = useRouter()
const uploadFiles = ()=>{
  if(!name || !pic || !resume || !phone || !address || !description) return
  uploadPic()
  uploadResume()
}


const uploadPic = ()=>{

const storage = getStorage();
const storageRef = ref(storage, `jobseekerimages/${makeimageName()}`);

const uploadTask = uploadBytesResumable(storageRef, pic!);


uploadTask.on('state_changed', 
  (snapshot) => {
  console.log(snapshot);
  
   
  }, 
  (error) => {
    console.log(error);
    
  }, 
  () => {
    
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      setPicUrl(downloadURL)
    });
  }
);
}



  const savejobseekerinfo = async ()=>{
    const docId = auth.currentUser?.uid
    const jobseeker = {name,picture:picUrl,resume:resumeURL,phone,address,description}

    const jobseekerRef = doc(db,'users',docId!)
    try{
   await setDoc(jobseekerRef,jobseeker,{merge:true})
   console.log('succesfull job save');

   route.push('/jobseeker')
   
  }catch(e){
    console.log(e);
    
  }

}
useEffect(()=>{
  if(picUrl && resumeURL ){
    savejobseekerinfo()
  }
},[picUrl,resumeURL])

const uploadResume = ()=>{
  const storageRef = ref(storage, `resume/${makeimageName()}`);
  
  const uploadTask = uploadBytesResumable(storageRef, resume!);
  
  
  uploadTask.on('state_changed', 
    (snapshot) => {
     
      console.log(snapshot);

    }, 
    (error) => {
      console.log(error);

     
    }, 
    () => {
  
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
      setResumeURL(downloadURL)
     
  
      });
    }
  );
  }


const makeimageName = ()=>{
  const imageName = pic?.name.split('.')
  const lastName = imageName!?.length - 1
  const newName = `${auth.currentUser?.uid}.${lastName}` 
  return newName
}
    return(
        <>


          <div className="max-w-sm mx-auto">

<div className="mb-3">
    <label
      htmlFor="password"
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      Uload Picture
    </label>
<input type="file"  onChange={(e)=>{
        const file = e.target.files 
        if(file?.length){
            setPic(file[0])
        }
    }}
        className="file-input w-full max-w-xs" />
    </div>

    <div className="mb-3">
    <label
      htmlFor="password"
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      Upload CV
    </label>
<input type="file"  onChange={(e)=>{
        const file = e.target.files 
        if(file?.length){
            setResume(file[0])
        }
    }}
        className="file-input w-full max-w-xs" />
    </div>

<div className="mb-3">
    <label
      htmlFor="password"
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
    </label>
    <input
      type="text"
      value={name} onChange={(e)=>{setName(e.target.value)}}
      id="jobTittle"
      placeholder="user Name"
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
      value={description} onChange={(e)=>{setDescription(e.target.value)}}
            id="Description"
      placeholder="Description"
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
      placeholder="Address"
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
      value={phone} onChange={(e)=>{setPhone(e.target.value)}}

            id="Description"
      placeholder="Phone Number"
      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
    />
  </div>

  <button  
        className="btn btn-primary float-right m-3" onClick={uploadFiles}>
Save Info
        </button>






  </div>
        </>
    )
}