import { UserRole } from "./user-role"

export type JobSeekerType = {
    email:string
    uid:string
    role:UserRole
    name?:string
    phone?:string
    pic?:string
    description?:string
    address?:string
   resume?:string
}