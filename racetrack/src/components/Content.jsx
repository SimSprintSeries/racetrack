import { Leagues } from "./Leagues.jsx";
import { Archive } from "./Archive.jsx";
import { Socials } from "./Socials.jsx";

const Content = () => {
    return (
        <div className='bg-gradient-to-t from-bg/50 backdrop-blur h-[1080px]'>
            <div id='section1' className='flex flex-col-reverse lg:grid lg:grid-cols-2'>
                <Archive/>
                <Leagues/>
            </div>
            <div id='section2' className='mt-32'>
                <Socials/>
            </div>
            <footer className='absolute w-full bottom-0 p-2 text-color/50'><p className='w-full text-center'>Copyrights by SSS</p></footer>
        </div>
    )
}

export { Content }