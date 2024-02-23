/* eslint-disable no-unused-vars */
import profileSvg from "../assets/images/profile.svg"
import nurdin from "../assets/images/web_display/nurdin.jpg"
export default function Team() {
    return (
        <section className="h-full mx-auto text-white bg-slate-900">
            <div className="container w-9/12 pt-1 pb-20 mx-auto">
                <div className="p-6 my-20 text-center bg-gradient-to-t from-dark-purple via-purple to-pink rounded-3xl grow">
                    <h1 className="text-[45px] text-white font-bold font-futura text-left my-10 ml-24">Tim kami</h1>
                    <div className="flex flex-wrap items-stretch justify-center gap-4 sm:flex-row">
                        <div className="w-full overflow-hidden text-center shadow-lg md:w-1/4 rounded-2xl bg-slate-900 hover:bg-dark-purple hover:text-white">
                            <div className="px-6 py-4">
                                <img src={profileSvg} className="mx-auto h-[190px] w-[190px] object-cover object-center rounded-full " />
                                <h1 className="my-2 font-bold font-futura">Nurdin</h1>
                                <p>NIM : 213130503177</p>
                            </div>
                        </div>
                        <div className="w-full overflow-hidden text-center shadow-lg md:w-1/4 rounded-2xl bg-slate-900 hover:bg-dark-purple hover:text-white">
                            <div className="px-6 py-4">
                                <img src={profileSvg} className="mx-auto h-[190px] w-[190px] object-cover object-center rounded-full " />
                                <h1 className="my-2 font-bold font-futura">Yukandri</h1>
                                <p>NIM : 223010503006</p>
                            </div>
                        </div>
                        <div className="w-full overflow-hidden text-center shadow-lg md:w-1/4 rounded-2xl bg-slate-900 hover:bg-dark-purple hover:text-white">
                            <div className="px-6 py-4">
                                <img src={profileSvg} className="mx-auto h-[190px] w-[190px] object-cover object-center rounded-full " />
                                <h1 className="my-2 font-bold font-futura">Rafif Dhia Yusrana</h1>
                                <p>NIM : 223020503053</p>
                            </div>
                        </div>
                        <div className="w-full overflow-hidden text-center shadow-lg md:w-1/4 rounded-2xl bg-slate-900 hover:bg-dark-purple hover:text-white">
                            <div className="px-6 py-4">
                                <img src={profileSvg} className="mx-auto h-[190px] w-[190px] object-cover object-center rounded-full " />
                                <h1 className="my-2 font-bold font-futura">Septian Dwi Saputra</h1>
                                <p>NIM : 223020503058</p>
                            </div>
                        </div>
                        <div className="w-full overflow-hidden text-center shadow-lg md:w-1/4 rounded-2xl bg-slate-900 hover:bg-dark-purple hover:text-white">
                            <div className="px-6 py-4">
                                <img src={profileSvg} className="mx-auto h-[190px] w-[190px] object-cover object-center rounded-full " />
                                <h1 className="my-2 font-bold font-futura">Imam Syahrohim</h1>
                                <p>NIM : 223020503067</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}