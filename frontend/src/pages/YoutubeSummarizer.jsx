import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout"; // Import the DashboardLayout component
import youtube from "../assets/images/web_display/YoutubeSideBar.svg";
import empty from "../assets/images/web_display/empty.svg";
import { useSelector, useDispatch } from "react-redux";
import { buttonStart, buttonFinish, buttonFailed } from "../redux/user/userSlice";

const YoutubeSummarizer = () => {
  const [messages, setMessage] = useState({});
  const [formData, setFormData] = useState({});
  const { token, loading, errors } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const loadingStyle = 'px-4 py-2 text-white opacity-50 bg-purple rounded-xl';
  const notLoadingStyle = 'px-4 py-2 text-white bg-purple rounded-xl';

  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.id]: e.target.value
    });
    console.log(formData);
    console.log(token?.data?.token);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(buttonStart());
      const response = await fetch("/api/summarize/youtube", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token?.data?.token}`
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.errors) {
        dispatch(buttonFailed(data.errors));
        return
      }
      setMessage(data);
      dispatch(buttonFinish());
    } catch (e) {
      console.log(e);
      dispatch(buttonFinish());
    }
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen">
        <div className="flex gap-4">
          <img src={youtube} alt="" className="h-[50px] w-[50px]" />
          <h1 className="text-[45px] font-futura leading-tight pb-8">YouTube Summarizer</h1>
        </div>
        <div className="w-9/12 p-6 bg-white border rounded-xl">
          <form className="flex gap-2">
            <input type="text" id="message" placeholder="Your YouTube URL" onChange={handleChange} className="flex-1 p-2 rounded-xl border-slate-900" />
            <button disabled={loading} className={loading ? loadingStyle : notLoadingStyle} onClick={handleSubmit}>{loading ? 'Loading...' : 'Kirim'}</button>
          </form>
        </div>
        {Object.keys(messages).length > 0 ? (<div className="flex items-start w-9/12 gap-4 px-6 py-5">
          <img src={youtube} className="w-8 h-8" />
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

export default YoutubeSummarizer;
