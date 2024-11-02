"use client";

import FavoriteJobCard from "@/app/component/favoritejobcard";
import Loading from "@/app/component/loading";
import { auth, db } from "@/app/firebase/firebaseConfig";
import { collection, doc, DocumentData, getDoc, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function FavoriteJob() {
    const [applyJob, setApplyJob] = useState<DocumentData[]>([]);
    const [loading, setLoading] = useState(true);
    const currentUser = auth.currentUser?.uid;

    useEffect(() => {
        const fetchJobs = async () => {
            if (currentUser) {
                setLoading(true);
                const jobsRef = collection(db, "favorites");
                const condition = where("jobseekerid", "==", currentUser);
                const q = query(jobsRef, condition);

                const unsubscribe = onSnapshot(q, async (docSnapShot) => {
                    console.log('docsnap',docSnapShot.docs);
                    
                    const allJobsPromises = docSnapShot.docs.map(async (job) => {
                        const jobId = job.data().jobdocid;
                        const uid = job.data().companyUid;
console.log('favorite',job.data());



// const applyRef = doc(db, "jobs", jobid);
// const jobs = await getDoc(applyRef);

// const compRef = doc(db, "users", applydata.comanyid);
// const company = await getDoc(compRef);

                        const companyRef = doc(db, "users", uid);
                        const companyDoc = await getDoc(companyRef);
                        const companyInfo = companyDoc.data();

                        const jobRef = doc(db, "jobs", jobId);
                        const jobDoc = await getDoc(jobRef);
console.log('jobdoc',companyInfo);


                        return {
                            ...jobDoc.data(),
                            companyInfo,
                            jobid: jobId,
                        };
                    });

                    const resolvedJobs = await Promise.all(allJobsPromises);
                    setApplyJob(resolvedJobs);
                    setLoading(false);
                });

                return () => unsubscribe(); // Cleanup subscription
            } else {
                setLoading(false);
            }
        };

        fetchJobs();
    },[]); // Updated dependency array

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                applyJob.length > 0 ? (
                    applyJob.map(({ jobTitle, jobType, jobDescription, address, skills, jobid, salaryRange }) => (
                        <FavoriteJobCard
                            key={jobid}
                            jobTitle={jobTitle}
                            jobType={jobType}
                            jobDescription={jobDescription}
                            docId={jobid}
                            address={address}
                            skills={skills}
                            salaryRange={salaryRange}
                        />
                    ))
                ) : (
                    <h2 className="text-center text-3xl font-bold " 
                    style={{position: 'relative',top: '180px'}}>No favorite jobs found.</h2>
                )
            )}
        </>
    );
}
