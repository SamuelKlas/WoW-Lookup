import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Character extends React.Component{
    constructor(props){
        super(props)
        this.fetchDataDemo = this.fetchDataDemo.bind(this)
    }


    async fetchDataDemo(){
        let data = await this.fetchMythicPlusData()
        console.log(data)
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

    async componentDidMount() {
        let filteredData = await this.fetchPvpData()
        this.setState({pvpData : filteredData})
    }

    async fetchPvpData(){
        let pvp2v2Data = await (await fetch(this.props.baseUrl + '/pvp/2v2')).json()
        let pvp3v3Data = await (await fetch(this.props.baseUrl + '/pvp/3v3')).json()
        let pvpRbgData = await (await fetch(this.props.baseUrl + '/pvp/rbg')).json()

        let filteredData = Array.of(pvp2v2Data,pvp3v3Data,pvpRbgData).map(data =>
            ({
                bracket : data.bracket.type,
                rating : data.rating,
                seasonStatistics : data.season_match_statistics,
                weeklyStatistics : data.weekly_match_statistics

            })
        )
        return filteredData
    }

    render(){
        return <div>
            <button type="button" onClick={this.fetchDataDemo}>Fetch data</button>
                </div>
    }

}


ReactDOM.render(
    <Character baseUrl = "http://localhost:8080/backend/eu/drakthul/adaldo" />
,
  document.getElementById('root')
);

