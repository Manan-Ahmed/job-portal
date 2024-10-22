import { UserRole } from "./user-role"

export type CompanyType = {
    name?:string
    logo?:string
    address?:string
    phone?:string
    description:string
    email:string
    uid:UserRole
    role:string
}