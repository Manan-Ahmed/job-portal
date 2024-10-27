"use client"



type CompanyJobCardType = {
    companyinfo:string,jobTitle:string,jobType:string,jobDescription:string,
    docId:string,address:string,skills:string,salaryRange:string,
}


export default function ApplyJobCard(
    {companyinfo,jobTitle,jobType,jobDescription,address,skills,salaryRange}:CompanyJobCardType
){
   
    return(
        <>
        <div className="p-4 md:w-1/3">
        <div  className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
         
          <div className="p-6" >
            <h3 className="card-title">Company Name:{companyinfo} </h3>
            <h2 className="card-title m-2">Job Tittle: {jobTitle}
            </h2>
            <h2 className="card-title title-font text-lg font-medium text-gray-900 mb-3">
            Job Type: {jobType}
            </h2>
            <p className="leading-relaxed mb-3">
            Job Description: {jobDescription}
            </p>
            <p className="leading-relaxed mb-3">
            Address: {address}
            </p>
            <p className="leading-relaxed mb-3">
            Skills: {skills}
            </p>
            <p className="leading-relaxed mb-3">
            salatyRange: {salaryRange}
            </p>
            <div className="flex items-center flex-wrap ">
             

           
            </div>
          </div>
        </div>
      </div>
        </>
    )
}