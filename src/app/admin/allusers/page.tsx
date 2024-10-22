"use client"

import AllUsres from "@/app/component/company-allusers"
import { db } from "@/app/firebase/firebaseConfig"
import { collection, DocumentData, onSnapshot, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"

export default function AllUsers(){
let [allUsers,setAllUsers] = useState<DocumentData[]>()
    useEffect(()=>{
        fetchJobs()
    },[])

    const fetchJobs = ()=>{
        const jobRef = collection(db,"users")
// let condition = where('block','!=',false)

// let q = query(jobRef,condition)
        let unsub = onSnapshot(jobRef,async(docSnapShot)=>{
         let alluser =    docSnapShot.docs.map((user)=> ({...user.data()})
                       

                     

            )
            console.log(alluser);
            
            setAllUsers(alluser )

    })

    }
    return(
        <>
         <h1>All Users</h1>



         <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>User Type</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>

{
    allUsers ? allUsers.map(({name,email,role,uid,block},i)=>(
<AllUsres key={uid} name={name} email={email} role={role} uid={uid} block={block} index={i}/>
    )) 
      :  ''
}


</tbody>
    </table>
        </div>
        </>
    )
}