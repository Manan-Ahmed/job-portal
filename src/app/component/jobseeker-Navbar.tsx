"use client"
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "../firebase/firebaseConfig";
import style from "./job-navbar.module.css"
export default function JobSeekerNavbar() {
  const route = useRouter();

  const logOut = async () => {
    await signOut(auth).then(() => {
      route.push("/login");
    });
  };


  return (

    <>
  <div  className={style.navbar}>
 <div className="navbar bg-base-100 " >
        <div className="navbar-start">
            <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 ">
                    <li><Link href={"/jobseeker"} className={style.list}>Home</Link></li>
                    <li><Link href={"/jobseeker/appliedjob" }>Applied Job</Link></li>
                    <li><Link href={"/jobseeker/favoritejob"}>Favorite Job</Link></li>
                </ul>
            </div>
            <a className="text-xl">Jobs.com</a>
        </div>
        <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
                <li><Link href={"/jobseeker"}  className={style.list}> Home</Link></li>
               
                <li><Link href={"/jobseeker/appliedjob"}>Applied Job</Link></li>
                <li><Link href={"/jobseeker/favoritejob"}>Favorite Job</Link></li>

            </ul>
        </div>
        <div className="navbar-end">
          <div className="mr-4">
            <button  onClick={logOut} style={{color: '#2557a7'}}>logout</button>
        </div>

        </div>
        </div>
    </div>

    </>
  )
}