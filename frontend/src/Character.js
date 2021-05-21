import React from 'react';
import './index.css';
import PvPSection from "./PvPSection";
import EquipmentItem from "./EquipmentItem";
import TalentSection from "./TalentSection";
import SoulbindSection from "./SoulbindSection";
import Conduit from "./Conduit";
import RaidSection from "./RaidSection";
import EquipSection from "./EquipSection"
import './pvpItem.css'
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

    fetchMythicPlusData = async () => {
        let dungeonData = await (await fetch(this.props.baseUrl + '/mythicPlus/raiderIO')).json()
        let bestRuns = dungeonData.mythic_plus_best_runs;
        let rioScore = bestRuns.map(run =>run.score).reduce((a, b) => a + b, 0)

        let filteredData = {
            bestRuns : bestRuns,
            score : rioScore,
        }
        return filteredData;
    }

    fetchRaidData = async () => {
        let raidData = await (await fetch(this.props.baseUrl + '/encounters/raids')).json()
        /*Shadowlands is the 9th expansion*/
        let sLandsRaids = raidData.expansions.slice(-1)[0]
        let castleNathria = sLandsRaids.instances[0].modes
        return castleNathria

    }

    async fetchEquipmentData(){
        let equipData = await (await fetch(this.props.baseUrl + '/equipment')).json()
        let filteredData = equipData.equipped_items.filter(item => item.inventory_type.name !== "Tabard" &&
            item.inventory_type.name !== "Shirt")
            .map(item =>
            ({
                id : item.item.id,
                level : item.level.value,
                enchantments : item.enchantments !== undefined ? item.enchantments.map(ench => ench.enchantment_id) : [],
                sockets : item.sockets !== undefined ? item.sockets.map(socket => socket.item.id) : [],
                quality : item.quality.name

            }))
        return filteredData

    }

    async fetchTalentData(){
        let allTalents = await (await fetch(this.props.baseUrl + "/talents")).json()
        let activeSpecId = allTalents.active_specialization.id

        let activeSpec = allTalents.specializations.filter(spec =>spec.specialization.id === activeSpecId)[0]
        let talentIds = activeSpec.talents.map(tal =>tal.spell_tooltip.spell.id)
        let levels = [15,25,30,35,40,45,50]
        let talentData = talentIds.map((e, i) => [e, levels[i]]);
        return talentData

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
                equipData : equipData,

        }
            )
    }
    async componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.baseUrl !== prevProps.baseUrl) {
            this.setState({loaded:false})
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
                    equipData : equipData,

                }
            )
        }
    }


    fillPvPData(pvpData){
        pvpData.bracket = {}
        pvpData.bracket.type = "2v2"
        pvpData.rating = 0
        pvpData.tier = {}
        pvpData.tier.id = 1
        pvpData.season_match_statistics = {
            won : 0, lost : 0, played : 0
        }
    }

    async fetchPvpData(){
        let pvp2v2Data = await (await fetch(this.props.baseUrl + '/pvp/2v2')).json()
        if(pvp2v2Data.status == 500){
            this.fillPvPData(pvp2v2Data)
        }
        let pvp3v3Data = await (await fetch(this.props.baseUrl + '/pvp/3v3')).json()
        if(pvp3v3Data.status == 500){
            this.fillPvPData(pvp3v3Data)
        }
        let pvpRbgData = await (await fetch(this.props.baseUrl + '/pvp/rbg')).json()
        if(pvpRbgData.status == 500){
            this.fillPvPData(pvpRbgData)
        }

        let filteredData = Array.of(pvp2v2Data,pvp3v3Data,pvpRbgData).map(data =>
            ({
                bracket : data.bracket.type,
                rating : data.rating,
                tier : data.tier.id,
                seasonStatistics : data.season_match_statistics,

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

        return <div className="outer">
            <button type="button" onClick={this.fetchMythicPlusData}>Fetch data</button>
            <EquipSection equipData = {this.state.equipData} />
            <TalentSection data = {this.state.talentData}/>
            <SoulbindSection soulBindIds = {this.state.soulBindData} conduits = {this.state.conduitData} />
            <PvPSection data = {this.state.pvpData}/>
            <RaidSection data = {this.state.raidData} />
        </div>


    }

}