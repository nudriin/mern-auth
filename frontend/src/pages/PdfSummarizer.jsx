// Dashboard.js
import { useRef, useState } from "react";
import DashboardLayout from "../components/DashboardLayout"; // Import the DashboardLayout component
import pdf from "../assets/images/web_display/PDFSideBar.svg";
import empty from "../assets/images/web_display/empty.svg";
import { useSelector, useDispatch } from "react-redux";
import { buttonStart, buttonFinish, buttonFailed } from "../redux/user/userSlice";
const PdfSummarizer = () => {
  const fileRef = useRef();
  const [messages, setMessage] = useState({});
  const [pdfFile, setPdfFile] = useState(null);
  const { token, loading, errors } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const loadingStyle = 'px-4 py-2 text-white opacity-50 bg-pink rounded-xl';
  const notLoadingStyle = 'px-4 py-2 text-white bg-pink rounded-xl';


  const handleClick = async () => {
    try {
      const formData = new FormData();
      formData.append('pdfFile', pdfFile)
      dispatch(buttonStart());
      const response = await fetch("/api/summarize/pdf", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token?.data?.token}`
        },
        body: formData
      });
      const data = await response.json();
      if(data.errors){
        dispatch(buttonFailed(data.errors));
        return 
      }
      setMessage(data);
      dispatch(buttonFinish());
    } catch (e) {
      console.log(e);
      dispatch(buttonFailed(e));
    }
  }
  return (
    <DashboardLayout>
      <div className="min-h-screen">
        <div className="flex gap-4">
          <img src={pdf} alt="" className="h-[50px] w-[50px]" />
          <h1 className="text-[45px] font-futura leading-tight pb-8">PDF Summarizer</h1>
        </div>
        <div className="w-9/12 p-6 bg-white border rounded-xl">
          <form className="flex gap-2">
            <input type="file" hidden ref={fileRef} onChange={(event) => setPdfFile(event.target.files[0])} className="flex-1 p-2 rounded-xl border-slate-900" />
            <h1 onClick={() => fileRef.current.click()} className="flex-1 p-2 text-center text-white bg-gray-400 cursor-pointer rounded-xl">{pdfFile ? 'File berhasil di upload!' : 'Pilih file'}</h1>
            <button disabled={loading} onClick={handleClick} className={loading ? loadingStyle : notLoadingStyle}>{loading ? 'Loading...' : 'Kirim'}</button>
          </form>
        </div>
        {Object.keys(messages).length > 0 ? (<div className="flex items-start w-9/12 gap-4 px-6 py-5">
          <img src={pdf} className="w-8 h-8" />
          {!errors ? (
            <p>{messages?.data?.message}</p>
            ) : (
            <p>{errors}</p>
          )}
        </div>) : (<div className="flex flex-col items-center w-9/12 gap-4 mt-10">
          <img src={empty} className="w-72 h-72" />
          <h1 className="text-sm">Belum ada ringkasan.</h1>
        </div>)}
      </div>
    </DashboardLayout>
  );
};

export default PdfSummarizer;
