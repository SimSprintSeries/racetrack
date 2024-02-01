import React from "react";
import {Link} from "react-router-dom";


const EventsPanel = () => {

    return (
        <div className='text-color flex flex-col w-full h-screen p-16 space-y-16 lg:space-y-0 lg:flex-row lg:gap-x-4 lg:items-center lg:justify-center '>
                <Link to='/events/activeSeasons' className='group w-full lg:w-1/3 flex h-1/2 lg:h-full grow lg:flex-grow-0 p-2 text-center items-end text-center relative overflow-hidden border-l rounded-xl' >
                    <h1 className=' text-2xl'>Aktualne sezony</h1>
                    <div className='absolute bg-[url("./images/miami-race.png")] opacity-90 brightness-[.40] bg-cover bg-left-top w-full left-0 bottom-0 h-full z-[-99999] group-hover:brightness-[.70]'></div>
                </Link>
                <Link to='/events/archiveSeasons' className='group w-full lg:w-1/3 flex h-1/2 lg:h-full grow lg:flex-grow-0 p-2 text-center items-end text-center relative overflow-hidden border-l rounded-xl' >
                    <h1 className=' text-2xl'>Archiwalne sezony</h1>
                    <div className='absolute bg-[url("./images/miami-race.png")] opacity-90 brightness-[.40] bg-cover bg-left-top w-full left-0 bottom-0 h-full z-[-99999] group-hover:brightness-[.70]'></div>
                </Link>
            </div>
    )
}

export default EventsPanel;