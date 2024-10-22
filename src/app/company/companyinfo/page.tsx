"use client"

import { auth, db, storage } from "@/app/firebase/firebaseConfig"
import { doc, setDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { useState } from "react"
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { auth, db, storage } from "@/app/firebase/firebaseConfig";
// import { doc } from "firebase/firestore";
// import { setDoc } from "firebase/firestore/lite";

export default function CompanyInfo(){
    const [name,setName] = useState('')
    const [logo,setLogo] = useState<File>()
    const [phone,setPhone] = useState('')
    const [address,setAddress] = useState('')
    const [description,setDescription] = useState('')


    const uploadLogo = ()=>{
    

const storageRef = ref(storage, `images/${makeimageName()}`);

const uploadTask = uploadBytesResumable(storageRef, logo!);


uploadTask.on('state_changed', 
  (snapshot) => {
  
   
  }, 
  (error) => {

  }, 
  () => {
   
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      saveCompanyInfo(downloadURL)
    });
  }
);
    }


//     const companyinfosave =async (logoURL:string)=>{
       
//             let company ={name,logo:logoURL,phone,address,description}

// let docId = auth.currentUser?.uid
//     let UserRef = doc(db,"users",docId!)
//     console.log(docId,company);
    
//     try{ 
//     let comapnySave =  await  setDoc(UserRef,company,{merge: true})
// console.log(comapnySave);
//         }catch(e){
//             console.log('companyinfo not save');
            
//         }
//     }

const saveCompanyInfo = async (logoURL: any)=>{
    let company = {
        name,description,address,phone,logo:logoURL
    }
    let docId = auth.currentUser?.uid
    const userRef = doc(db, 'users', docId!);

    try{
        await setDoc(userRef,company,{merge: true})

    }catch(e){
       console.log(e)
    }
}
    const makeimageName = ()=>{
        let imageName = logo?.name.split('.')
        let lastIndex = imageName!?.length -1
        let  imageType= lastIndex
        let newName = `${auth.currentUser?.uid}.${imageType}`
        return newName
    }

    return(
        <>
         <h1>company</h1>


         
<div className="max-w-sm mx-auto">

<div className="mb-3">
    <label
      htmlFor="password"
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
    </label>
<input type="file"  onChange={(e)=>{
        let file = e.target.files 
        if(file?.length){
            setLogo(file[0])
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
      placeholder="Company Name"
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
      placeholder="company Description"
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

  <button  onClick={uploadLogo}
        className="btn btn-primary float-right m-3">
PublishInfo
        </button>






  </div>

        </>
    )
}