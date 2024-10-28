"use client";

import ApplyJobCard from "@/app/component/apply-job-card";
import Loading from "@/app/component/loading";
import { auth, db } from "@/app/firebase/firebaseConfig";
import { collection, doc, DocumentData, getDoc, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState, useCallback } from "react";

export default function AppliedJob() {
    const [applyjob, setApplyJob] = useState<DocumentData[]>([]);
    const [loading, setLoading] = useState(true);
    const currentUser = auth.currentUser?.uid;

    const fetchjob = useCallback(async () => {
        if (!currentUser) return; // Early return if currentUser is not defined

        const jobsRef = collection(db, "applications");
        const condition = where('jobseekeruid', '==', currentUser);
        const q = query(jobsRef, condition);

        const unsubscribe = onSnapshot(q, async (docSnapShot) => {
            const alljobs = await Promise.all(
                docSnapShot.docs.map(async (job) => {
                    const applydata = job.data();
                    const jobid = applydata.jobdocid;

                    const applyRef = doc(db, "jobs", jobid);
                    const jobs = await getDoc(applyRef);

                    const compRef = doc(db, "users", applydata.comanyid);
                    const company = await getDoc(compRef);

                    return {
                        ...jobs.data(),
                        companyinfo: company.data(),
                        jobid
                    };
                })
            );

            setApplyJob(alljobs);
            setLoading(false); // Set loading to false after fetching jobs
        });

        // Cleanup function to unsubscribe from the snapshot listener
        return () => unsubscribe();
    }, [currentUser]);

    useEffect(() => {
        if (currentUser) {
            fetchjob(); // Call fetchjob if currentUser is defined
        } else {
            setLoading(false); // Set loading to false if no currentUser
        }
    }, [currentUser, fetchjob]); // Include fetchjob as a dependency

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                applyjob.length > 0 ? (
                    applyjob.map(({ companyinfo, jobTitle, jobType, jobDescription, address, skills, jobid, salaryRange }) => (
                        <ApplyJobCard
                            key={jobid}
                            companyinfo={companyinfo.name}
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
                    <p className="text-center">No applications found.</p> // Fallback message if no jobs
                )
            )}
        </>
    );
}
