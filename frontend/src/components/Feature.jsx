import yotubeSvg from "../assets/images/web_display/youtube_to_text.svg";
import pdfSvg from "../assets/images/web_display/pdf.svg";
export default function Feature() {
    return (
        <section className="mx-auto h-full text-slate-900 bg-white">
            <div className="container w-9/12 mx-auto pt-1 pb-20">
                <h1 className="text-[45px] font-bold font-futura text-center my-20">Fitur utama kami</h1>
                <div className="flex flex-col items-stretch sm:flex-row justify-center gap-4 flex-wrap">
                    <div className="max-w-sm rounded-2xl bg-gradient-to-r overflow-hidden shadow-2xl text-center flex-1 hover:bg-dark-purple hover:text-white">
                            <img src={pdfSvg} className="h-60 w-full object-cover object-top" />
                            <div className="px-6 py-4">
                                <h1 className="font-futura font-bold">PDF Summarizer with ChatGPT</h1>
                                <p className="mt-2 text-justify">Pengguna dapat dengan mudah mendapatkan ringkasan dari dokumen PDF tanpa perlu membacanya secara keseluruhan. Ini sangat berguna untuk mengekstrak informasi kunci dari dokumen yang panjang</p>
                            </div>
                    </div>
                    <div className="max-w-sm rounded-2xl bg-gradient-to-r overflow-hidden shadow-2xl text-center flex-1 hover:bg-dark-purple hover:text-white">
                            <img src={yotubeSvg} className="h-60 w-full object-cover object-top" />
                            <div className="px-6 py-4">
                                <h1 className="font-futura font-bold">Youtube Summarizer with ChatGPT</h1>
                                <p className="mt-2 text-justify">Dengan menggunakan teknologi ChatGPT, pengguna dapat mendapatkan ringkasan cepat dari video YouTube tanpa perlu menonton seluruhnya. Fitur ini membantu menghemat waktu dan memudahkan pengguna dalam mengakses informasi penting dari video</p>
                            </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
