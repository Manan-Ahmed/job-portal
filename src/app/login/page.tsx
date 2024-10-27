"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { auth } from "../firebase/firebaseConfig";

import UserProtectedRoutes from "@/HOC/userprotectedroutes";
import AuthForm from "../component/authform";

export default function Login() {




  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
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




