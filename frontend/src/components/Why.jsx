import secureSvg from "../assets/images/web_display/secure.svg"
import speedSvg from "../assets/images/web_display/speed.svg"

export default function Why() {
    return (
        <section className="mx-auto h-full text-white bg-slate-900">
            <div className="container w-9/12 mx-auto">
                <div className="flex items-center justify-center">
                    <div className="bg-gradient-to-t from-dark-purple via-purple to-pink rounded-3xl grow my-20 p-6 text-center">
                        <h1 className="text-[40px] font-bold font-futura text-left px-6 py-4 w-1/2">Mengapa <span className="text-white">Binary Talk Hub?</span></h1>
                        <div className="grid grid-cols-12 items-stretch justify-between gap-4 sm:p-6">
                            <div className="col-span-12 sm:col-span-4 flex">
                                <div className="bg-slate-800 w-full overflow-hidden rounded-2xl p-6">
                                    <img src={secureSvg} className="h-40 w-full object-contain object-top" />
                                    <h1 className="text-md font-bold font-rubik px-6 py-4">Keamanan Data yang Terjamin</h1>
                                    <p>Semua informasi yang diunggah, termasuk file PDF dan tautan video YouTube, dijamin keamanannya.</p>
                                </div>
                            </div>
                            <div className="col-span-12 sm:col-span-4 flex">
                                <div className="bg-purple w-full overflow-hidden rounded-2xl p-6">
                                    <img src={speedSvg} className="h-40 w-full object-contain object-top" />
                                    <h1 className="text-md font-bold font-rubik px-6 py-4">Proses Cepat dan Efisien</h1>
                                    <p>Pengguna dapat dengan cepat mengakses hasilnya tanpa harus menunggu waktu yang lama, meningkatkan produktivitas dan efisiensi dalam penggunaan platform.</p>
                                </div>
                            </div>
                            <div className="col-span-12 sm:col-span-4 flex-1">
                                <div className="flex flex-wrap items-stretch gap-4">
                                    <div className="bg-slate-800 w-full overflow-hidden rounded-2xl p-6">
                                        <h1 className="text-md font-bold font-rubik px-6 py-4">Kemudahan Penggunaan</h1>
                                        <p>Antarmuka yang sederhana dan intuitif membuat proses ini mudah dipahami oleh pengguna dari berbagai latar belakang.</p>
                                    </div>
                                    <div className=" bg-slate-800 w-full overflow-hidden rounded-2xl p-6">
                                        <h1 className="text-md font-bold font-rubik px-6 py-4">Kualitas Hasil</h1>
                                        <p>Teknologi yang kuat dan algoritma yang canggih digunakan untuk memastikan bahwa hasil yang dihasilkan akurat, relevan, dan informatif.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
