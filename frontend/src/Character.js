import React from 'react';
import './index.css';
import PvPSection from "./PvPSection";

export default class Character extends React.Component{
    constructor(props){
        super(props)
        this.fetchDataDemo = this.fetchDataDemo.bind(this)
        this.fetchPvpData = this.fetchPvpData.bind(this)
        this.state = {loaded : false}
    }


    async fetchDataDemo(){
        this.fetchRaidData()
    }

    async fetchMythicPlusData(){
        let dungeonData = await (await fetch(this.props.baseUrl + '/mythicPlus/raiderIO')).json()
        let bestRuns = dungeonData.mythic_plus_best_runs;
        let rioScore = bestRuns.map(run =>run.score).reduce((a, b) => a + b, 0)

        let filteredData = {
            bestRuns : bestRuns,
            score : rioScore,
        }

        return filteredData;
    }

    async fetchRaidData(){
        let raidData = await (await fetch(this.props.baseUrl + '/encounters/raids')).json()
        let sLandsRaids = raidData.expansions[8]
        let castleNathria = sLandsRaids.instances[0].modes
        console.log(castleNathria)

    }

    async componentDidMount() {
        let filteredData = await this.fetchPvpData()
        this.setState({pvpData : filteredData,loaded : true})
    }

    async fetchPvpData(){
        let pvp2v2Data = await (await fetch(this.props.baseUrl + '/pvp/2v2')).json()
        let pvp3v3Data = await (await fetch(this.props.baseUrl + '/pvp/3v3')).json()
        let pvpRbgData = await (await fetch(this.props.baseUrl + '/pvp/rbg')).json()
        console.log(pvp2v2Data)
        let filteredData = Array.of(pvp2v2Data,pvp3v3Data,pvpRbgData).map(data =>
            ({
                bracket : data.bracket.type,
                rating : data.rating,
                tier : data.tier.id,
                seasonStatistics : data.season_match_statistics,
                weeklyStatistics : data.weekly_match_statistics

            })
        )
        console.log(filteredData)
        return filteredData
    }

    render(){
        if(this.state.loaded == false) return "loading"
        return <div>
            <button type="button" onClick={this.fetchDataDemo}>Fetch data</button>
            <button type="button" onClick={this.fetchPvpData}>pvp data</button>
            <PvPSection data = {this.state.pvpData}/>
        </div>
    }

}