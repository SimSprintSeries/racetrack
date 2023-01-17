import { Component } from "react";

class Leagues extends Component {
    render() {
        return (
            <div className='grid grid-cols-2 p-10 bg-nav'>
                <LeagueLink leagueName='F1 Liga A' />
                <LeagueLink leagueName='F1 Liga B' />
                <LeagueLink leagueName='F1 Liga C' />
                <LeagueLink leagueName='ACC GT4 - sezon 1' />
            </div>
        )
    }
}

class LeagueLink extends Component {
    render() {
        return <div className="flex bg-green/75 m-4 justify-center items-center text-white rounded-xl text-[32px]">{this.props.leagueName}</div>
    }
}

export { Leagues }