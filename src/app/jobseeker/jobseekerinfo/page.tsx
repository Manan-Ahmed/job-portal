"use client";

import {  useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "@/app/firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function JobSeekerInfo() {
  const [name, setName] = useState('');
  const [pic, setPic] = useState<File | null>(null);
  const [resume, setResume] = useState<File | null>(null);
  const [picUrl, setPicUrl] = useState('');
  const [resumeURL, setResumeURL] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  
  const route = useRouter();

  const uploadFiles = async () => {
    if (!name || !pic || !resume || !phone || !address || !description) return;
    setLoading(true); // Start loading

    try {
      await Promise.all([uploadPic(), uploadResume()]); // Wait for both uploads to complete
      saveJobSeekerInfo(); // Only save if uploads are successful
    } catch (error) {
      console.error("Upload failed", error);
      setLoading(false); // End loading on error
    }
  };

  const uploadPic = () => {
    return new Promise((resolve, reject) => {
      const storage = getStorage();
      const storageRef = ref(storage, `jobseekerimages/${makeImageName(pic!)}`);
      const uploadTask = uploadBytesResumable(storageRef, pic!);

      uploadTask.on('state_changed', 
        (snapshot) => {
          // Handle progress (optional)
          console.log(snapshot);
        }, 
        (error) => {
          console.error("Picture upload error:", error);
          reject(error); // Reject promise on error
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setPicUrl(downloadURL);
            resolve(downloadURL); // Resolve promise with the download URL
          });
        }
      );
    });
  };

  const uploadResume = () => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `resume/${makeImageName(resume!)}`);
      const uploadTask = uploadBytesResumable(storageRef, resume!);

      uploadTask.on('state_changed', 
        (snapshot) => {
          // Handle progress (optional)
          console.log(snapshot);
        }, 
        (error) => {
          console.error("Resume upload error:", error);
          reject(error); // Reject promise on error
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setResumeURL(downloadURL);
            resolve(downloadURL); // Resolve promise with the download URL
          });
        }
      );
    });
  };

  const makeImageName = (file: File) => {
    const ext = file.name.split('.').pop(); // Get file extension
    return `${auth.currentUser?.uid}.${ext}`;
  };

  const saveJobSeekerInfo = async () => {
    const docId = auth.currentUser?.uid;
    const jobseeker = { name, picture: picUrl, resume: resumeURL, phone, address, description };
    const jobseekerRef = doc(db, 'users', docId!);

    try {
      await setDoc(jobseekerRef, jobseeker, { merge: true });
      console.log('Successful job save');
      route.push('/jobseeker');
    } catch (e) {
      console.error("Failed to save job seeker info:", e);
      setLoading(false); // End loading on error
    }
  };

  return (
    <div className="max-w-sm mx-auto">
      <div className="mb-3">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload Picture</label>
        <input type="file" onChange={(e) => {
          const file = e.target.files;
          if (file?.length) {
            setPic(file[0]);
          }
        }} className="file-input w-full max-w-xs" />
      </div>

      <div className="mb-3">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload CV</label>
        <input type="file" onChange={(e) => {
          const file = e.target.files;
          if (file?.length) {
            setResume(file[0]);
          }
        }} className="file-input w-full max-w-xs" />
      </div>

      <div className="mb-3">
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="User Name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
      </div>

      <div className="mb-3">
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
      </div>

      <div className="mb-3">
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
      </div>

      <div className="mb-3">
        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
      </div>

      <button className="btn btn-primary float-right m-3" onClick={uploadFiles} disabled={loading}>
        {loading ? 'Saving...' : 'Save Info'}
      </button>
    </div>
  );
}
