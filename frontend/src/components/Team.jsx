import profileSvg from "../assets/images/profile.svg"
import nurdin from "../assets/images/web_display/nurdin.jpg"
export default function Team() {
    return (
        <section className="mx-auto h-full text-slate-900 bg-white">
            <div className="container w-9/12 mx-auto pt-1 pb-20">
                <h1 className="text-[45px] font-bold font-futura text-center my-20">Tim kami</h1>
                <div className="flex items-stretch sm:flex-row justify-center gap-4 flex-wrap">
                    <div className="w-full md:w-1/4 rounded-2xl overflow-hidden shadow-lg text-center bg-white hover:bg-dark-purple hover:text-white">
                        <div className="px-6 py-4">
                            <img src={nurdin} className="mx-auto h-[190px] w-[190px] object-cover object-center rounded-full " />
                            <h1 className="font-futura font-bold my-2">Nurdin</h1>
                            <p>NIM : 213130503177</p>
                        </div>
                    </div>
                    <div className="w-full md:w-1/4 rounded-2xl overflow-hidden shadow-lg text-center bg-white hover:bg-dark-purple hover:text-white">
                        <div className="px-6 py-4">
                            <img src={profileSvg} className="mx-auto h-[190px] w-[190px] object-cover object-center rounded-full " />
                            <h1 className="font-futura font-bold my-2">Anggota 2</h1>
                            <p>NIM :</p>
                        </div>
                    </div>
                    <div className="w-full md:w-1/4 rounded-2xl overflow-hidden shadow-lg text-center bg-white hover:bg-dark-purple hover:text-white">
                        <div className="px-6 py-4">
                            <img src={profileSvg} className="mx-auto h-[190px] w-[190px] object-cover object-center rounded-full " />
                            <h1 className="font-futura font-bold my-2">Anggota 3</h1>
                            <p>NIM :</p>
                        </div>
                    </div>
                    <div className="w-full md:w-1/4 rounded-2xl overflow-hidden shadow-lg text-center bg-white hover:bg-dark-purple hover:text-white">
                        <div className="px-6 py-4">
                            <img src={profileSvg} className="mx-auto h-[190px] w-[190px] object-cover object-center rounded-full " />
                            <h1 className="font-futura font-bold my-2">Anggota 4</h1>
                            <p>NIM :</p>
                        </div>
                    </div>
                    <div className="w-full md:w-1/4 rounded-2xl overflow-hidden shadow-lg text-center bg-white hover:bg-dark-purple hover:text-white">
                        <div className="px-6 py-4">
                            <img src={profileSvg} className="mx-auto h-[190px] w-[190px] object-cover object-center rounded-full " />
                            <h1 className="font-futura font-bold my-2">Anggota 5</h1>
                            <p>NIM :</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}