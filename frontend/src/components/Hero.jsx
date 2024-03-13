import HeroHeading from './HeroHeading';
import { Link } from 'react-router-dom';
export default function Hero() {
    return (
        <section id="1" className="flex items-center justify-center min-h-screen text-white">
            <video className='fixed top-12 -z-10 w-full brightness-[.3] object-cover object-center h-[800px] sm:h-full' autoPlay loop muted id='video'>
                <source src='https://cdn.dribbble.com/users/975591/screenshots/17828888/media/779c17a59721322b4a111f010aaa438d.mp4' type='video/mp4'></source>
            </video>
            <div className="container w-9/12">
                <div className="col-span-4 mx-auto text-center">
                    <p className="opacity-65 mb-7 mt-7 sm:mt-0">Top AI Platform</p>
                    <HeroHeading />
                    <p className="my-7 opacity-65">Chat with the smartest AI - Experience teh power of AI</p>
                    <div className="flex items-center justify-center gap-4">
                        <Link to="/pdfsummarizer">
                            <button className="px-4 py-2 rounded-full bg-gradient-to-t from-pink to-purple text-dark-white hover:shadow-sm hover:shadow-purple">Mulai</button>
                        </Link>
                        <button>Tutorial</button>
                    </div>
                </div>
            </div>
            <div className="absolute hidden w-4 rounded-full shadow-xl sm:block left-8 md:left-28 bg-gradient-to-t from-purple to-pink shadow-pink h-96"> </div>
        </section>
    )
}
