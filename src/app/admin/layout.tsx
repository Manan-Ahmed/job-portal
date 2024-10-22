"use client"

import AdminProtectedRoutes from "@/HOC/admin-protectedroute"
import { ReactNode } from "react"
import AdminNavbar from "../component/admin-Navbar"



type AdminLayoutType ={
    children: ReactNode
}

export default function AdminLayout({children}:AdminLayoutType){
    return(
        <>

        <AdminProtectedRoutes>
        <AdminNavbar/>

        {children}
        </AdminProtectedRoutes>
        </>
    )
}