

"use client"

import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth, db } from "../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore"; 
import Link from "next/link";
import { UserRole } from "../type/user-role";
import AuthForm from "../component/authform";
import UserProtectedRoutes from "@/HOC/userprotectedroutes";

export default function SignUp(){

    const signup = async (email:string,password:string,role?:UserRole)=>{
    
        try{
         const userCredional = await createUserWithEmailAndPassword(auth, email, password)
            const userData = userCredional.user

            saveUserInFirestore(email,userData.uid,role!)
        }catch(e){
         console.log(e);
         
        }
        


    }


    const saveUserInFirestore = async (email:string,uid:string,role:UserRole)=>{

        const userData = {email,uid,role}
        const docRef =  doc(db,'users',uid)
          await setDoc(docRef,userData)
    }
    return(

      <UserProtectedRoutes>
        {
    <div className="flex flex-col justify-center items-center mt-20">
    <AuthForm signup={true} func={signup} />
    <div>
      <p>
        Already have an account? <Link href={"/login"}>Login here.</Link>
      </p>
    </div>
  </div>
}
  </UserProtectedRoutes>
    )
}

