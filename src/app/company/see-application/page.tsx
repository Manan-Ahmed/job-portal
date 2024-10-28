"use client";

import { auth, db } from "@/app/firebase/firebaseConfig";
import { collection, DocumentData, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function AllApplications() {
    const currentUser = auth.currentUser?.uid;
    const [loading, setLoading] = useState(true);
    const [applications, setApplications] = useState<DocumentData[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (currentUser) {
            const jobsRef = collection(db, "applications");
            const condition = where("companyid", "==", currentUser);
            const q = query(jobsRef, condition);

            const unsubscribe = onSnapshot(q, (docSnapshot) => {
                const jobs = docSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setApplications(jobs);
                setLoading(false);
            }, (error) => {
                console.error("Error fetching applications:", error);
                setError("Failed to fetch applications.");
                setLoading(false);
            });

            // Cleanup subscription on unmount
            return () => unsubscribe();
        } else {
            setLoading(false);
        }
    }, [currentUser]);

    if (loading) {
        return <h1 className="text-center">Loading...</h1>;
    }

    if (error) {
        return <h1 className="text-center text-red-500">{error}</h1>;
    }

    if (applications.length === 0) {
        return <h1 className="text-center">No Applications Received</h1>;
    }

    return (
        <div>
            <h1 className="text-center">Applications Received</h1>
            <ul>
                {applications.map((application) => (
                    <li key={application.id} className="text-center">
                        <h2>{application.jobTitle}</h2>
                        <p>Applicant ID: {application.applicantId}</p>
                        {/* Add more application details as needed */}
                    </li>
                ))}
            </ul>
        </div>
    );
}
