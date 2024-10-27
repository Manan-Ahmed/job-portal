"use client"

import { deleteDoc, doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase/firebaseConfig"
import { MdDelete } from "react-icons/md"



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
    const docRef = doc(db,"users",uid)
    try{
    await deleteDoc(docRef);
    console.log('data  delete');
}catch(e){
    console.log('data not delete',e);
    
}  
}

const blockUser = ()=>{
    const docRef = doc(db,"users",uid)
    if(block){
           updateDoc(docRef,{block: false})
    }else{
        updateDoc(docRef,{block: true})
    }
}

    return(
       <>
   
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
       
        <td>{role}</td>
        <td>
            <button onClick={deletedUser}> <MdDelete size={20}/>
            </button>
            <button onClick={blockUser}  className="w-14 rounded">
                {block ? 'UnBlock' : "Block"}</button>

            </td>
              </tr>
      
      
   
       </>
    )
}