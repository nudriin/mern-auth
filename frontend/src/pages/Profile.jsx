import { useSelector } from "react-redux"
import { useRef, useState, useEffect } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"; // ! import fireabase storage
import { app } from "../firebase";
export default function Profile() {
    const fileRef = useRef(null); // membuat referensi object untuk input
    const { curUser } = useSelector((state) => state.user);
    const [image, setImage] = useState(undefined); // state untuk memilih images
    const [imageProgress, setImageProgress] = useState(0); // membuat state untuk progress images 
    const [imageError, setImageError] = useState(false); // membuat state untuk progress images 
    const [imageSuccess, setImageSuccess] = useState(false); // membuat state untuk progress images 
    const [formData, setFormData] = useState({});
    useEffect(() => {
        if (image) {
            handleUpload(image);
        }
    }, [image]);

    const handleUpload = async (image) => {
        const storage = getStorage(app); // * membuat storagenya
        const fileName = new Date().getTime() + image.name; // * membuat nama filenya
        const storageRef = ref(storage, `profiles/${fileName}`); // * membuat referensi nama dan storagenya dan memasukan ke folder profiles
        const uploadTask = uploadBytesResumable(storageRef, image); // * upload data imagesnya ke referensi storage dengan nama berdasarkan fileName
        // 
        uploadTask.on("state_changed", (snapshot) => {
            // membuat progressnya dari 1% - 100%
            const progress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setImageProgress(progress);
        },
            (error) => {
                setImageSuccess(false);
                setImageError(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                    setFormData({ ...formData, profile_pic: downloadUrl });
                    console.log(downloadUrl);
                });
                setImageError(false);
                setImageSuccess(true);
            }
        );
        setImageSuccess(false);
    }

    return (
        <div className="max-w-lg p-3 mx-auto">
            <h1 className="text-3xl font-bold text-center font-rubik mt-28">Profile</h1>
            <form className="flex flex-col gap-4 mb-[1rem]">
                {/*
                FIREBASE RULES
                allow read; 
                allow write: if 
                request.resource.size < 2 * 1024 * 1024 &&
                request.resource.contentType.matches('image/.*') */}
                <input type="file" ref={fileRef} hidden accept="image/*" onChange={(event) => setImage(event.target.files[0])} />
                {/* Jika img di klik maka akan tampil pilihan file */}
                <img src={formData.profile_pic ? formData.profile_pic : curUser?.data?.profile_pic} onClick={() => fileRef.current.click()} className="self-center object-cover object-center w-40 h-40 rounded-full cursor-pointer" />
                <p className="text-sm text-center">
                    {imageError ? (
                        <span className="text-red-500">Gagal mengunggah foto (File maksimal berukuran 2MB)</span>
                    ) : imageProgress > 0 && imageProgress < 100 ? (
                        <span>Mengunggah foto {imageProgress}%</span>
                    ) : imageSuccess ? (
                        <span className="text-green-500">Gambar berhasil di unggah</span>
                    ) : (
                        ''
                    )}
                </p>
                <input defaultValue={curUser?.data?.username} type="text" placeholder="Username" disabled={true} className="p-3 bg-slate-300 rounded-xl" />
                <input defaultValue={curUser?.data?.email} type="text" placeholder="Email" disabled={true} className="p-3 bg-slate-300 rounded-xl" />
                <input defaultValue={curUser?.data?.name} type="text" placeholder="Name" className="p-3 bg-slate-200 rounded-xl" />
                <input type="text" placeholder="Old password" className="p-3 bg-slate-200 rounded-xl" />
                <input type="text" placeholder="New password" className="p-3 bg-slate-200 rounded-xl" />
                <button className="p-3 text-white bg-gradient-to-b from-pink to-purple rounded-xl hover:opacity-95">Simpan</button>
            </form>
            <div className="text-right">
                <span className="p-2 text-red-500">Keluar</span>
            </div>
        </div>
    )
}
