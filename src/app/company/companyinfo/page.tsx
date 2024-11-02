"use client";

import { auth, db, storage } from "@/app/firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CompanyInfo() {
    const [name, setName] = useState<string>('');
    const [logo, setLogo] = useState<File | null>(null); // Allow null initially
    const [phone, setPhone] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [description, setDescription] = useState<string>('');
const route = useRouter()

    const uploadLogo = () => {
        if (!logo) return; // Ensure logo is not null

        const storageRef = ref(storage, `images/${makeImageName()}`);
        const uploadTask = uploadBytesResumable(storageRef, logo);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                console.log(snapshot);
            },
            (error) => {
                console.error(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    saveCompanyInfo(downloadURL);
                });
            }
        );
    };

    const saveCompanyInfo = async (logoURL: string) => {
        const company = {
            name,
            description,
            address,
            phone,
            logo: logoURL
        };
        const docId = auth.currentUser?.uid;

        if (!docId) return; // Ensure docId is not null
        const userRef = doc(db, 'users', docId);

        try {
            await setDoc(userRef, company, { merge: true });
            route.push('/company')
        } catch (e) {
            console.error(e);
        }
    };

    const makeImageName = () => {
        if (!logo) return ''; // Ensure logo is not null

        const imageName = logo.name.split('.');
        const lastIndex = imageName.length - 1;
        const imageType = imageName[lastIndex]; // Get the file extension
        const newName = `${auth.currentUser?.uid}.${imageType}`;
        return newName;
    };

    return (
        <>


        <h1 className="text-center font-bold text-4xl m-4"> CompanyInfo</h1>
            <div className="max-w-sm mx-auto">
                <div className="mb-3">
                    <input
                        type="file"
                        onChange={(e) => {
                            const file = e.target.files;
                            if (file?.length) {
                                setLogo(file[0]);
                            }
                        }}
                        className="file-input w-full max-w-xs"
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Company Name"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Company Description"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Address"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone Number"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    />
                </div>
                <button
                    onClick={uploadLogo}
                    className="btn btn-primary float-right m-3"
                >
                    Publish Info
                </button>
            </div>
        </>
    );

  }