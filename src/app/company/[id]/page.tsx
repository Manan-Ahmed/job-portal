"use client";

import { db } from "@/app/firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface EditCardProps {
    params: {
        id: string;
    };
}

export default function EditCard({ params: { id } }: EditCardProps) {
    const [jobTitle, setJobTitle] = useState<string>('');
    const [jobType, setJobType] = useState<string>('');
    const [skills, setSkills] = useState<string>('');
    const [jobDescription, setJobDescription] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [salaryRange, setSalaryRange] = useState<string>('');
    const [qualification, setQualification] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const route = useRouter();

    useEffect(() => {
        const fetchJob = async () => {
            const docRef = doc(db, "jobs", id);
            try {
                const jobData = await getDoc(docRef);
                const job = jobData.data();

                if (job) {
                    setJobType(job.jobType || '');
                    setJobTitle(job.jobTitle || '');
                    setSkills(job.skills || '');
                    setJobDescription(job.jobDescription || '');
                    setAddress(job.address || '');
                    setSalaryRange(job.salaryRange || '');
                    setQualification(job.qualification || '');
                }
            } catch (e) {
                console.error(e);
                setError('Failed to fetch job data.');
            } finally {
                setLoading(false);
            }
        };

        fetchJob();
    }, ); // Fetch job again if id changes

    const editJob = async () => {
        const docRef = doc(db, "jobs", id);
        try {
            await updateDoc(docRef, {
                jobTitle,
                jobType,
                skills,
                jobDescription,
                address,
                salaryRange,
                qualification
            });
            route.push('/company/all-jobs');
        } catch (e) {
            console.error('Job not updated', e);
            setError('Failed to update job.');
        }
    };

    if (loading) {
        return <p>Loading...</p>; // Optional loading indicator
    }

    if (error) {
        return <p className="text-red-500">{error}</p>; // Display error message if any
    }

    return (
        <>
            <div className="max-w-sm mx-auto">
                <div className="mb-3">
                    <input
                        type="text"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        id="jobTitle"
                        placeholder="Job Title"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    />
                </div>

                <div className="mb-2">
                    <select
                        className="select select-bordered bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        value={jobType}
                        onChange={(e) => setJobType(e.target.value)}
                    >
                        <option disabled>Job Type</option>
                        <option value="internship">Internship</option>
                        <option value="contract">Contract</option>
                        <option value="part time">Part Time</option>
                        <option value="full time">Full Time</option>
                    </select>
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        value={qualification}
                        onChange={(e) => setQualification(e.target.value)}
                        id="qualification"
                        placeholder="Qualification"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        id="skills"
                        placeholder="Enter your skills"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        value={salaryRange}
                        onChange={(e) => setSalaryRange(e.target.value)}
                        id="salaryRange"
                        placeholder="Salary Range"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        id="address"
                        placeholder="Enter your address"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    />
                </div>

                <div>
                    <textarea
                        id="jobDescription"
                        rows={4}
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Job Description"
                    />
                </div>

                <button
                    className="btn btn-primary float-right m-3"
                    onClick={editJob}
                >
                    Update Job
                </button>
            </div>
        </>
    );
}
