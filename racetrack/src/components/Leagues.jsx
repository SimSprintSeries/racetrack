import { Component } from "react";

class Leagues extends Component {
    render() {
        return (
            <div>
                <LeagueLink leagueName='F1 Liga A' />
                <LeagueLink leagueName='F1 Liga A' />
                <LeagueLink leagueName='F1 Liga A' />
                <LeagueLink leagueName='F1 Liga A' />
            </div>
        )
    }
}

class LeagueLink extends Component {
    render() {
        return <div className="flex bg-green/50 w-4/5 h-12 m-4 justify-center items-center">{this.props.leagueName}</div>
    }
}

export { Leagues }