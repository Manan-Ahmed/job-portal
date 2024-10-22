

"use client"

import { createUserWithEmailAndPassword } from "firebase/auth";
// import AuthForm from "../component/auth-form"
// import { UserRole } from "../type/user-role-type"
import { auth, db } from "../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore"; 
import Link from "next/link";
import { UserRole } from "../type/user-role";
import AuthForm from "../component/authform";
import UserProtectedRoutes from "@/HOC/userprotectedroutes";

export default function SignUp(){

    const signup = async (email:string,password:string,role?:UserRole)=>{
    
        try{
         let userCredional = await createUserWithEmailAndPassword(auth, email, password)
            const userData = userCredional.user

            saveUserInFirestore(email,userData.uid,role!)
        }catch(e){
         console.log(e);
         
        }
        


    }


    const saveUserInFirestore = async (email:string,uid:string,role:UserRole)=>{

        let userData = {email,uid,role}
          let docRef =  doc(db,'users',uid)
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




// "use client"

// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth, db } from "../firebase/firebaseConfig";
// import { UserRole } from "../type/user-role";
// import { addDoc, collection } from "firebase/firestore";
// import AuthForm from "../component/authform";
// import Link from "next/link";


// export default  function SignUp() {
//   const signup = async (email:string,password:string,role?:UserRole)=>{
    
//     try{
//      let userCredional = await createUserWithEmailAndPassword(auth, email, password)
//         const userData = userCredional.user

//         saveUserinFireStore(email,userData.uid,role!)
//     }catch(e){
//      console.log(e);
     
//     }
    


// }
  

//   const saveUserinFireStore = async (email:string, password:string,role?:UserRole)=>{
//          let docRef = collection(db,"users")
                
//             await    addDoc(docRef,{email,password,role})

//   }
//   return (
    
//   <>
//   <AuthForm signup={true} func={signup}  />

//   <div>
//     <p>Already have an Account <Link href={"/login"} >Login here</Link></p>
//   </div>
      

//   </>
//   )
// }

