const Archive = () => {
    return (
        <div className='flex flex-col items-center'>
            <div className='text-color text-center p-10 text-[24px] font-thin'>Nasze poprzednie ligi</div>
            <div className='lg:flex lg:flex-col grid grid-cols-2'>
                <LeagueArchive archiveName='F1 Liga A Jesień 2022' />
                <LeagueArchive archiveName='F1 Liga B Jesień 2022' />
                <LeagueArchive archiveName='F1 Liga C Jesień 2022' />
                <LeagueArchive archiveName='Praga R1 Cup AC' />
            </div>
        </div>
    )
}

const LeagueArchive = props => {
    return (
        <div className="flex lg:w-[600px] h-[100px] justify-center items-center cursor-pointer first:rounded-t-lg last:rounded-b-lg p-4 bg-[url('./images/bg.png')] bg-cover bg-bottom saturate-[25%] text-color/25 hover:bg-left hover:z-10 hover:saturate-100 hover:text-color/100 hover:scale-110 ease-linear duration-100">{props.archiveName}</div>
    )
}

export {Archive}