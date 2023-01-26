import { Leagues } from "./Leagues.jsx";
import { Archive } from "./Archive.jsx";

const Content = () => {
    return (
        <div className='bg-gradient-to-t from-bg/50 backdrop-blur h-[1080px]'>
            <div id='section2' className='grid grid-cols-2'>
                <Archive/>
                <Leagues/>
            </div>
        </div>
    )
}

export { Content }