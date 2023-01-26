import { Component } from "react";

class Leagues extends Component {
    render() {
        return (
            <div>
                <div className='text-color text-center p-10 text-[24px] font-thin'>Nasze trwające ligi</div>
                <div className='flex px-12'>
                    <LeagueLink leagueName='F1 Liga A' />
                    <LeagueLink leagueName='F1 Liga B' />
                    <LeagueLink leagueName='F1 Liga C' />
                    <LeagueLink leagueName='ACC GT4 - sezon 1' />
                </div>
            </div>
        )
    }
}

class LeagueLink extends Component {
    render() {
        return <div className="flex w-[200px] h-[450px] justify-center items-center cursor-pointer p-4 bg-[url('./images/bg.png')] bg-cover bg-left text-color/0 hover:text-color/100 hover:scale-110 ease-linear duration-100">{this.props.leagueName}</div>
    }
}

export { Leagues }