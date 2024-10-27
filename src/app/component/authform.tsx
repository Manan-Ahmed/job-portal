
"use client"

import { useState } from "react"
import { UserRole } from "../type/user-role"


type SignupType = {
    signup?: boolean,
    func: (email:string,password:string,role?:UserRole)=>void
}

export default function AuthForm({signup,func}:SignupType){
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [role,setRole] = useState<UserRole>()

    return(
        <>
        <div 
        style={{display: 'block',margin: 'auto',marginTop: '80px',width: '280px'}}>
      
   
<div className="mb-6">
        <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
        <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" id="email" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="enter your email" required />
    </div> 



<div className="mb-6">
        <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
        <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" id="password" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="enter your password" required />
    </div> 

{
    signup &&
<select

          className="select select-bordered w-full  mt-2"
          value={role} onChange={(e)=>{setRole(e.target.value as UserRole)}}         
        >
<option  disabled selected >signup as?</option>
            <option value="company">company</option>
            <option value="job seeker">Job Seeker</option>

        </select>
}
        <button  onClick={()=>{func(email,password,role)}}
        className="btn btn-primary float-right m-3">
            {signup?"signup":'login'}

        </button>
        </div>
 
        </>
      
    )
}
