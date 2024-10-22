"use client"

import { deleteDoc, doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase/firebaseConfig"



type AllUsresType = {
    name:string,
    email:string,
    role:string,
    index: number,
    uid:string,
    block?:boolean
}
export default function AllUsres(
    {name,email,role,index,uid,block}:AllUsresType
){



  const deletedUser = async()=>{
    let docRef = doc(db,"users",uid)
    try{
    await deleteDoc(docRef);
    console.log('data  delete');
}catch(e){
    console.log('data not delete');
    
}  
}

const blockUser = ()=>{
    let docRef = doc(db,"users",uid)
    if(block){
           updateDoc(docRef,{block: false})
    }else{
        updateDoc(docRef,{block: true})
    }
}

    return(
       <>
   
      {/* row 1 */}
      <tr>
        <th>{index + 1}</th>
        <td>
        <div className="flex items-center gap-3">
          
          <div>
            <div className="font-bold">{name}</div>
            <div className="text-sm opacity-50">{email}</div>
          </div>
        </div>
      </td>
        {/* <td>{name}</td>
        <td>{email}</td> */}
        <td>{role}</td>
        <td>
            <button onClick={deletedUser}>Delete</button>
            <button onClick={blockUser}>
                {block ? 'UnBlock' : "Block"}</button>

        {/* <select className="select select-bordered w-full max-w-xs">
          <option selected>Select Action</option>
          <option>Delete</option>
          <option>Block</option>
        </select> */}
            </td>
              </tr>
      
      
   
       </>
    )
}