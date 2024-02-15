import HeroHeading from './HeroHeading';
export default function Hero() {
    return (
        <section id="1" className="flex items-center justify-center h-screen text-white">
            <video className='fixed top-12 -z-10 w-full brightness-[.3] object-cover object-center h-[800px] sm:h-full' autoPlay loop muted id='video'>
                <source src='https://cdn.dribbble.com/users/975591/screenshots/17828888/media/779c17a59721322b4a111f010aaa438d.mp4' type='video/mp4'></source>
            </video>
            <div className="container w-9/12">
                <div className="col-span-4 mx-auto text-center">
                    <p className="opacity-65 mb-7 mt-7 sm:mt-0">Top AI Platform</p>
                    <HeroHeading />
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
