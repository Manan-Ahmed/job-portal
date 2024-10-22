"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { auth } from "../firebase/firebaseConfig";
// import AuthForm from "../component/auth-form";
import { useAuthContext } from "../context/authcontext";
import { useRouter } from "next/navigation";
import UserProtectedRoutes from "@/HOC/userprotectedroutes";
import AuthForm from "../component/authform";
// import UserProtectedRoutes from "@/HOC/user-protected-route";

export default function Login() {
const {user} = useAuthContext()!
const route = useRouter()



  const login = async (email: string, password: string) => {
    try {
      let userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userData = userCredential.user;
      console.log(userData, "userData");
    } catch (e) {
      console.error(e);
    }
  };

  return (

<UserProtectedRoutes>
        
          {
    
    <div className="flex flex-col justify-center items-center mt-20">
      
      <AuthForm func={login} />
      <div>
        <p>
          Does have not an account? <Link href={"/signup"}>Signup here.</Link>
        </p>
      </div>
    </div>
}
    </UserProtectedRoutes >


  );
}







// // "use client"

// // import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// // import { auth, db } from "../firebase/firebaseConfig";
// // import { UserRole } from "../type/user-role";
// // import { addDoc, collection } from "firebase/firestore";
// // import AuthForm from "../component/authform";
// // import Link from "next/link";


// // export default  function Login() {
// //   const login = async (email:string,password:string)=>{
    
// //     try{
// //    let userCreditional = await signInWithEmailAndPassword(auth, email, password)
   
// //    let user = userCreditional.user
// //    console.log('login===>',user);
   
    
// //   }catch(e){
// //     console.log(e);
    
// //   }
      
// //     }
    



  

 
// //   return (
    
// //   <>

// //   <div className="flex flex-col justify-center items-center mt-20" >
// //   <AuthForm func={login} />

// //   <div>
// //     <p>Does not have an Account <Link href={"/signup"} >Signup here</Link></p>
// //   </div>
// //   </div>

// //   </>
// //   )
// // }

