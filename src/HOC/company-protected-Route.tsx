import { useAuthContext } from "@/app/context/authcontext"
import { useRouter } from "next/navigation"
import { ReactNode, useEffect } from "react"


type CompanyProtectedRoutesType = {
    children:   ReactNode
}

export default function CompanyProtectedRoutes({children}:CompanyProtectedRoutesType){
  
const {user} = useAuthContext()!
const route = useRouter()
    useEffect(()=>{
   
         if(user?.role === 'job seeker'){
              route.push('/jobseeker')
         }
         else if(user?.role === 'admin'){
           route.push('/admin')
         }if(user && user.role === 'company' && !("name" in user)){
            route.push('/company/companyinfo')
         }
        
 },[user])


    return(
         <>
         {children}
         </>
    )
}