const Leagues = () => {

        return (
            <div className='flex flex-col items-center'>
                <div className='text-color text-center p-10 text-[24px] font-thin'>Nasze trwające ligi</div>
                <div className='flex -skew-x-6'>
                    <LeagueLink leagueName='F1 Liga A' />
                    <LeagueLink leagueName='F1 Liga B' />
                    <LeagueLink leagueName='F1 Liga C' />
                    <LeagueLink leagueName='ACC GT4 - sezon 1' />
                </div>
            </div>
        )
}

const LeagueLink= (props) => {
        return <div className="flex w-[150px] h-[400px] justify-center items-center cursor-pointer first:rounded-l-lg last:rounded-r-lg p-4 bg-[url('./images/bg.png')] bg-cover bg-left text-color/25 hover:bg-center hover:text-color/100 hover:scale-110 ease-linear duration-100">{props.leagueName}</div>
}

export { Leagues }