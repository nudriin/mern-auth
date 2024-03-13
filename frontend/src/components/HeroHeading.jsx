import { TypeAnimation } from 'react-type-animation';

export default function HeroHeading() {
    return (
        <div className='text-[45px] font-bold font-futura leading-tight '>
            <TypeAnimation
                sequence={[
                    'PDF ke GPT Summarizer', // Types 'PDF ke GPT & YouTube Summarizer'
                    5000, // Waits 1s
                    '',
                    () => {
                        // console.log('Sequence completed');
                    },
                ]}
                wrapper="h1"
                cursor={true}
                repeat={Infinity}
                // style={{ fontSize: '2em', display: 'inline-block' }}
                className='text-purple'
            />
            <h1 className="">Transformasi Cepat dan Efisien!</h1>
        </div>
    )
}
