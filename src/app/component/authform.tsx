
"use client"

import { useState } from "react"
import { UserRole } from "../type/user-role"
// import { UserRole } from "../type/user-role-type"
// import UserProtectedRoutes from "@/HOC/user-protected-route"

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
        <div className="card bg-base-100 w-96 shadow-xl " 
        style={{display: 'block',margin: 'auto',marginTop: '80px'}}>
      
    <label className="input input-bordered flex items-center gap-2  mt-3">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
    <path
      d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
  </svg>
  <input type="text" className="grow" placeholder="Email"  
   value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
</label>


<label className="input input-bordered flex items-center gap-5 mt-3">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="h-4 w-4 opacity-70">
    <path
      fillRule="evenodd"
      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
      clipRule="evenodd" />
  </svg>
  <input type="password" className="grow" 
  placeholder="password"
   value={password} onChange={(e)=>{setPassword(e.target.value)}}
  />
</label>

{
    signup &&
<select

          className="select select-bordered w-full  mt-2"
          value={role} onChange={(e)=>{setRole(e.target.value as UserRole)}}         
        >
<option  disabled selected >signup as?</option>
            <option value="company">company</option>
            <option value="job seeker">Job Seeker</option>

          {/* <option disabled selected>
            Signup as?
          </option>
          <option value={"company"}>Company</option>
          <option value={"job seeker"}>Job Seeker</option> */}
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
// "use client"

// import { useState } from "react"
// import { UserRole } from "../type/user-role"

// type SignupType = {
//     signup: boolean
//     func: (email:string,password:string,role?:UserRole)=>void
// }

// export default function AuthForm({signup,func}:SignupType){
//      const [email,setEmail] = useState('')
//      const [password,setPassword] = useState('')
//      const [role,setRole] = useState<UserRole>()

     
//     return(
//         <>
//         <div className="max-w-sm mx-auto">
//   <div className="mb-5">
//     <label
//       htmlFor="email"
//       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//     >
//       Your email
//     </label>
//     <input
//       type="email"
//       id="email"
//       value={email}
//       onChange={(e)=>{setEmail(e.target.value)}}
//       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//       placeholder="enter your email"
//     />
//   </div>
//   <div className="mb-5">
//     <label
//       htmlFor="password"
//       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//     >
//       Your password
//     </label>
//     <input
//       type="password"
//       id="password"
//       value={password}
//       onChange={(e)=>setPassword(e.target.value)}
//       className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//     />
//   </div>
//   <div className="flex items-start mb-5">
//     <div className="flex items-center h-5">
//       <input
//         id="remember"
//         type="checkbox"
//         defaultValue=""
//         className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
//       />
//     </div>


// {

//     signup &&
//     <select

//           className="select select-bordered w-full  mt-2"
//           value={role} onChange={(e)=>{setRole(e.target.value as UserRole)}}         
//         >
// <option  disabled selected >signup as?</option>
//             <option value="company">company</option>
//             <option value="job seeker">Job Seeker</option>

  
//         </select>

// }
  
//   </div>
//   <button
  
//     className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//     onClick={()=>{func(email,password,role)}}
//  >
//   {signup ? 'Signup' : 'login'}  
//   </button>
// </div>
//         </>
//     )
// }

