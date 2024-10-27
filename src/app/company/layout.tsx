"use client"
import CompanyProtectedRoutes from "@/HOC/company-protected-Route"
import {  ReactNode } from "react"
import CompanyNavbar from "../component/company-Navbar"

CompanyProtectedRoutes

type CompanyLayoutType ={
    children: ReactNode
}

export default function CompanyLayout({children}:CompanyLayoutType){
    return(
        <CompanyProtectedRoutes>
                <CompanyNavbar/>

            {children}
        </CompanyProtectedRoutes>
    )
}