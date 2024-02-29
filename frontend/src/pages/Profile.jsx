import { useSelector, useDispatch } from "react-redux"
import { useRef, useState, useEffect } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"; // ! import fireabase storage
import { app } from "../firebase";
import { buttonFinish, buttonStart, updateUserFailed, updateUserStart, updateUserSuccess } from "../redux/user/userSlice";
import { persistor } from "../redux/Store";
import swal from "sweetalert2";
export default function Profile() {
    const fileRef = useRef(null); // membuat referensi object untuk input
    const { curUser, token, loading } = useSelector((state) => state.user);
    const [image, setImage] = useState(undefined); // state untuk memilih images
    const [imageProgress, setImageProgress] = useState(0); // membuat state untuk progress images 
    const [imageError, setImageError] = useState(false); // membuat state untuk progress images 
    const [imageSuccess, setImageSuccess] = useState(false); // membuat state untuk progress images 
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        if (image) {
            handleUpload(image);
            setImageSuccess(false);
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
                dispatch(buttonStart());
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
                dispatch(buttonFinish());
            }
        );
        setImageSuccess(false);
    }
    console.log(curUser.data.profile_pic);

    const handleChange = async (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    console.log(formData);

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            dispatch(updateUserStart());
            const response = await fetch("/v1/api/users/current", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token?.data?.token}`
                },
                body: JSON.stringify(formData)
            });
            const user = await response.json();
            console.log(user);
            if (!user.errors) {
                dispatch(updateUserSuccess(user));
                swal.fire({
                    title: "Success",
                    text: "Update profile success!",
                    icon: "success",
                    customClass: 'bg-slate-900 text-purple rounded-xl'
                });
            } else {
                dispatch(updateUserFailed(user));
                swal.fire({
                    title: "Errors",
                    text: user.errors,
                    icon: "error",
                    customClass: 'bg-slate-900 text-purple rounded-xl'
                });
            }
        } catch (e) {
            console.log(e);
            dispatch(updateUserFailed(e));
            swal.fire({
                title: "Errors",
                text: e.message,
                icon: "error",
                customClass: 'bg-slate-900 text-purple rounded-xl'
            });
        }
    }

    const handleCancel = async (e) => {
        e.preventDefault();
        if (formData.profile_pic) {
            try {
                const storage = getStorage(app);
                const fileRef = storage.refFromURL(formData.profile_pic);
                if (fileRef.exist()) {
                    const response = await fileRef.delete();
                    console.log(response);
                }
            } catch (e) {
                console.log(e);
            }
        }
    }

    const handleLogout = async () => {
        swal.fire({
            title: "Are you sure?",
            text: "You will logging out!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#7E30E1",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes",
            customClass: 'bg-slate-900 text-purple rounded-xl'
        }).then((result) => {
            if (result.isConfirmed) {
                swal.fire({
                    title: "Success",
                    text: "Logout success",
                    icon: "success",
                    showConfirmButton : false,
                    customClass: 'bg-slate-900 text-purple rounded-xl'
                });
                persistor.purge();
                window.location.reload(true);
            }
        });


    }

    return (
        <div className="max-w-lg min-h-screen p-3 mx-auto">
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
                <img src={formData.profile_pic ? formData.profile_pic : curUser.data.profile_pic} onClick={() => fileRef.current.click()} onChange={handleChange} className="self-center object-cover object-center w-40 h-40 rounded-full cursor-pointer" />
                {/* <img src="https://lh3.googleusercontent.com/a/ACg8ocLJbvT2mR74yHN8mfxyms5rPLUU2K7vXBSZPOJ7IB4nhT0=s96-c" className="mx-auto h-[190px] w-[190px] object-cover object-center rounded-full " /> */}

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
                <input defaultValue={curUser?.data?.username} type="text" placeholder="Username" id="username" onChange={handleChange} disabled={true} className="p-3 bg-slate-300 rounded-xl" />
                <input defaultValue={curUser?.data?.email} type="text" placeholder="Email" id="email" onChange={handleChange} disabled={true} className="p-3 bg-slate-300 rounded-xl" />
                <input defaultValue={curUser?.data?.name} type="text" placeholder="Name" id="name" onChange={handleChange} className="p-3 bg-slate-200 rounded-xl" />
                <button disabled={loading} className="p-3 text-white bg-gradient-to-b from-pink to-purple rounded-xl hover:opacity-95" onClick={handleClick}>Simpan</button>
                <button disabled={loading} className="p-3 text-white bg-gradient-to-br from-red-400 to-red-600 rounded-xl hover:opacity-95" onClick={handleCancel}>Batal</button>
            </form>
            <div className="text-right">
                <span disabled={loading} onClick={handleLogout} className="p-2 text-red-500 cursor-pointer">Keluar</span>
            </div>
        </div>
    )
}
