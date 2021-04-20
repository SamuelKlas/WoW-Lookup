import React from 'react';
import './index.css';
import PvPSection from "./PvPSection";
import EquipmentItem from "./EquipmentItem";
import TalentSection from "./TalentSection";
import SoulbindSection from "./SoulbindSection";
import Conduit from "./Conduit";

export default class Character extends React.Component{
    constructor(props){
        super(props)
        this.fetchDataDemo = this.fetchDataDemo.bind(this)
        this.fetchPvpData = this.fetchPvpData.bind(this)
        this.fetchEquipmentData = this.fetchEquipmentData.bind(this)
        this.fetchTalentData = this.fetchTalentData.bind(this)
        this.fetchSoulbindData = this.fetchSoulbindData.bind(this)
        this.fetchConduitData = this.fetchConduitData.bind(this)

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
        /*Shadowlands is the 9th expansion*/
        let sLandsRaids = raidData.expansions[8]
        let castleNathria = sLandsRaids.instances[0].modes
        return castleNathria

    }

    async fetchEquipmentData(){
        let equipData = await (await fetch(this.props.baseUrl + '/equipment')).json()
        console.log(equipData)
        let filteredData = equipData.equipped_items.map(item =>
            ({
                id : item.item.id,
                level : item.level.value,
                enchantments : item.enchantments !== undefined ? item.enchantments.map(ench => ench.enchantment_id) : [],
                sockets : item.sockets !== undefined ? item.sockets.map(socket => socket.item.id) : []


            }))
        return filteredData

    }

    async fetchTalentData(){
        let allTalents = await (await fetch(this.props.baseUrl + "/talents")).json()
        let activeSpecId = allTalents.active_specialization.id

        let activeSpec = allTalents.specializations.filter(spec =>spec.specialization.id === activeSpecId)[0]
        let talentIds = activeSpec.talents.map(tal =>tal.spell_tooltip.spell.id)
        return talentIds

    }

    async componentDidMount() {
        let filteredData = await this.fetchPvpData()
        let equipData = await this.fetchEquipmentData()
        let talentData = await this.fetchTalentData()
        let soulBindData = await this.fetchSoulbindData()
        let conduitData = await this.fetchConduitData()
        let raidData = await this.fetchRaidData()
        this.setState({
                pvpData : filteredData,
                talentData :talentData,
                soulBindData : soulBindData,
                conduitData : conduitData,
                raidData : raidData,
                loaded : true,
                equipData : equipData
        }
            )
        console.log(raidData)
    }

    async fetchPvpData(){
        let pvp2v2Data = await (await fetch(this.props.baseUrl + '/pvp/2v2')).json()
        let pvp3v3Data = await (await fetch(this.props.baseUrl + '/pvp/3v3')).json()
        let pvpRbgData = await (await fetch(this.props.baseUrl + '/pvp/rbg')).json()
        let filteredData = Array.of(pvp2v2Data,pvp3v3Data,pvpRbgData).map(data =>
            ({
                bracket : data.bracket.type,
                rating : data.rating,
                tier : data.tier.id,
                seasonStatistics : data.season_match_statistics,
                weeklyStatistics : data.weekly_match_statistics

            })
        )
        return filteredData
    }

    async fetchSoulbindData(){
        let soulbindData = await (await fetch(this.props.baseUrl + "/covenant/soulbinds")).json()
        return soulbindData
    }
    async fetchConduitData(){
        let conduitData = await (await fetch(this.props.baseUrl + "/covenant/conduits")).json()
        return conduitData
    }

    render(){
        if(this.state.loaded === false) return "loading"
        return <div>
            <button type="button" onClick={this.fetchSoulbindData}>Fetch data</button>
            <button type="button" onClick={this.fetchMythicPlusData.bind(this)}>pvp data</button>
            <div className="yeeter">
                {this.state.equipData.map(item =><EquipmentItem data = {item} /> )}
                <TalentSection talentIds = {this.state.talentData} />
            </div>
            {this.state.conduitData.map(cond => <Conduit conduitId = {cond.id} itemLevel = {cond.itemLevel}/>)}
            <SoulbindSection soulBindIds = {this.state.soulBindData} />
            <PvPSection data = {this.state.pvpData}/>
        </div>
    }

}