import { ReactNode } from "react"
import JobSeekerNavbar from "../component/jobseeker-Navbar"
import JobSeekerProtectedRoutes from "@/HOC/jobseeker-protected-routes"

type JobSeekerLayoutType = {
    children: ReactNode
}

export default function JobSeekerLayout({children}:JobSeekerLayoutType){
    return(
        <>
        <JobSeekerProtectedRoutes>
        <JobSeekerNavbar/>

         {children}

         </JobSeekerProtectedRoutes>
        </>
    )
}