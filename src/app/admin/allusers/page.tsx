"use client"

import AllUsres from "@/app/component/company-allusers"
import { db } from "@/app/firebase/firebaseConfig"
import { collection, DocumentData, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"

export default function AllUsers(){
const [allUsers,setAllUsers] = useState<DocumentData[]>()
    useEffect(()=>{
        fetchJobs()
    },[])

    const fetchJobs = ()=>{
        const jobRef = collection(db,"users")

        onSnapshot(jobRef,async(docSnapShot)=>{
         const alluser =    docSnapShot.docs.map((user)=> ({...user.data()})
                       

                     

            )
            
            setAllUsers(alluser )

    })

    }
    return(
        <>



         <div className="overflow-x-auto">
  <table className="table">
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