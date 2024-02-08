export default function Home() {
    return (
        <>
            <section id="1" className="flex items-center justify-center bg-slate-900 h-screen text-white">
                <div className="col-span-4 mx-auto text-center">
                    <p className="opacity-65 mb-7">Top AI Platform</p>
                    <h1 className="text-[55px] font-bold font-futura leading-none"><span className="text-purple">Artificial intellegence</span> <br />Contribute to your support</h1>
                    <p className="my-7 opacity-65">Chat with the smartest AI - Experience teh power of AI</p>
                    <div className="flex justify-center items-center gap-4">
                        <button className="bg-gradient-to-r from-purple to-pink py-2 px-4 rounded-full text-dark-white hover:shadow-sm hover:shadow-purple">Get Started</button>
                        <button>Tutorial</button>
                    </div>
                </div>
            </section>
        </>
    )
}
