export default function Feature() {
    return (
        <section className="mx-auto h-screen text-slate-900 bg-white">
            <div className="container w-9/12 mx-auto">
                <h1 className="text-[45px] font-bold font-futura text-center my-20 pt-20">Fitur utama kami</h1>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap">
                    <div className="max-w-sm rounded-2xl bg-gradient-to-r  overflow-hidden shadow-2xl text-center flex-1">
                        <div className="px-6 py-6">
                            <h1 className="font-futura font-bold">PDF Summarizer with ChatGPT</h1>
                            <p className="mt-2 text-justify">Pengguna dapat dengan mudah mendapatkan ringkasan dari dokumen PDF tanpa perlu membacanya secara keseluruhan. Ini sangat berguna untuk mengekstrak informasi kunci dari dokumen yang panjang</p>
                        </div>
                    </div>
                    <div className="max-w-sm rounded-2xl bg-gradient-to-r overflow-hidden shadow-2xl text-center flex-1">
                        <div className="px-6 py-6">
                            <h1 className="font-futura font-bold">Youtube Summarizer with ChatGPT</h1>
                            <p className="mt-2 text-justify">Dengan menggunakan teknologi ChatGPT, pengguna dapat mendapatkan ringkasan cepat dari video YouTube tanpa perlu menonton seluruhnya. Fitur ini membantu menghemat waktu dan memudahkan pengguna dalam mengakses informasi penting dari video</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
