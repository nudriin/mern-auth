export default function Hero() {
    return (
        <section id="1" className="flex items-center justify-center bg-slate-900 h-screen text-white">
            <div className="container w-9/12">
                <div className="col-span-4 mx-auto text-center">
                    <p className="opacity-65 mb-7">Top AI Platform</p>
                    <h1 className="text-[45px] font-bold font-futura leading-tight "><span className="text-purple">PDF ke GPT & YouTube Summarizer</span> <br />Transformasi Cepat dan Efisien!</h1>
                    <p className="my-7 opacity-65">Chat with the smartest AI - Experience teh power of AI</p>
                    <div className="flex justify-center items-center gap-4">
                        <button className="bg-gradient-to-t from-pink to-purple py-2 px-4 rounded-full text-dark-white hover:shadow-sm hover:shadow-purple">Mulai</button>
                        <button>Tutorial</button>
                    </div>
                </div>
            </div>
            <div className="hidden sm:block absolute left-8 md:left-28  bg-gradient-to-t from-purple to-pink shadow-xl shadow-pink h-96 w-4 rounded-full"> </div>
        </section>
    )
}
