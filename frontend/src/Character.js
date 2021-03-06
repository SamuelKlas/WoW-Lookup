import React from 'react';
import './index.css';
import PvPSection from "./PvPSection";
import TalentSection from "./TalentSection";
import SoulbindSection from "./SoulbindSection";
import RaidSection from "./RaidSection";
import EquipSection from "./EquipSection"
import './styles.css'
import DungeonSection from "./DungeonSection";
import "./loader.css"
import Loader from "./Loader"
import Summary from "./Summary";
export default class Character extends React.Component{
    constructor(props){
        super(props)
        this.state = {loaded : false}
    }



    fetchSummaryData = async () => {
        let summaryData = await (await fetch(this.props.baseUrl)).json()
        let nameTitle = summaryData.active_title === undefined ? summaryData.name :
            summaryData.active_title.display_string.replace("{name}",summaryData.name)

        let filteredData ={
            name : summaryData.name,
            class : summaryData.character_class.name,
            spec : summaryData.active_spec.name,
            title : nameTitle,
            covenant : summaryData.covenant_progress.chosen_covenant.name,
            renown : summaryData.covenant_progress.renown_level,
            faction : summaryData.faction.name,
            guild :summaryData.guild === undefined ? "" : summaryData.guild.name,
            level : summaryData.level,
            race : summaryData.race.name
        }
        return filteredData

}

    fetchCharacterMedia = async () => {
        let mediaData = await (await fetch(this.props.baseUrl + '/character-media')).json()
        return mediaData
    }

    fetchMythicPlusData = async () => {
        let dungeonData = await (await fetch(this.props.baseUrl + '/mythicPlus/raiderIO')).json()
        let bestRuns = dungeonData.mythic_plus_best_runs;
        let rioScore = bestRuns.map(run =>run.score).reduce((a, b) => a + b, 0)
        let filteredData = {
            bestRuns : bestRuns,
            score : rioScore,
            thumbnailUrl: dungeonData.thumbnail_url,
        }
        return filteredData;
    }

    fetchRaidData = async () => {
        let raidData = await (await fetch(this.props.baseUrl + '/encounters/raids')).json()
        let sLandsRaids = raidData.expansions.slice(-1)[0]
        let castleNathria = sLandsRaids.instances[0].modes
        return castleNathria

    }

    fetchEquipmentData = async() =>{
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

    fetchTalentData = async() =>{
        let allTalents = await (await fetch(this.props.baseUrl + "/talents")).json()
        let activeSpecId = allTalents.active_specialization.id

        let activeSpec = allTalents.specializations.filter(spec =>spec.specialization.id === activeSpecId)[0]
        let talentIds = activeSpec.talents.map(tal =>tal.spell_tooltip.spell.id)
        let levels = [15,25,30,35,40,45,50]
        let talentData = talentIds.map((e, i) => [e, levels[i]]);
        return talentData

    }
    fetchData = async () =>{
        this.setState({loaded:false,error:false})
        try {
            let [summaryData, filteredData, equipData, talentData, soulBindData, raidData, dungeonData, mediaData]
                = await Promise.all(
                    [this.fetchSummaryData(), this.fetchPvpData(), this.fetchEquipmentData(),
                           this.fetchTalentData(), this.fetchSoulbindData(), this.fetchRaidData(),
                           this.fetchMythicPlusData(), this.fetchCharacterMedia()
                           ]);
            this.setState({
                    summaryData: summaryData,
                    pvpData: filteredData,
                    talentData: talentData,
                    soulBindData: soulBindData,
                    raidData: raidData,
                    loaded: true,
                    error : false,
                    equipData: equipData,
                    dungeonData: dungeonData,
                    mediaData: mediaData

                }
            )
        }catch(err){
            this.setState({
                loaded:true,
                error : true,
                errMessage : "The specified character does not exist"
            })
        }
    }

    async componentDidMount() {
        await this.fetchData()
    }
    async componentDidUpdate(prevProps) {
        if (this.props.baseUrl !== prevProps.baseUrl) {
            await this.fetchData()
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

    fetchPvpData = async() =>{
        let pvp2v2Data = await (await fetch(this.props.baseUrl + '/pvp/2v2')).json()
        if(pvp2v2Data.status === 500){
            this.fillPvPData(pvp2v2Data)
        }
        let pvp3v3Data = await (await fetch(this.props.baseUrl + '/pvp/3v3')).json()
        if(pvp3v3Data.status === 500){
            this.fillPvPData(pvp3v3Data)
        }
        let pvpRbgData = await (await fetch(this.props.baseUrl + '/pvp/rbg')).json()
        if(pvpRbgData.status === 500){
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

    fetchSoulbindData = async() =>{
        let soulbindData = await (await fetch(this.props.baseUrl + "/covenant")).json()
        return soulbindData
    }

    render(){
         if(this.state.loaded === false){
            return <Loader/>
         }
        if(this.state.error){
            return <p>{this.state.errMessage}</p>
        }

        return <div>
            <Summary data = {this.state.summaryData} thumbnailUrl = {this.state.dungeonData.thumbnailUrl}
                     mainUrl = {this.state.mediaData.assets[2].value} covenant = {this.state.soulBindData.covenant} />
            <EquipSection equipData = {this.state.equipData} />
            <TalentSection data = {this.state.talentData}/>
            <SoulbindSection soulBindIds = {this.state.soulBindData.soulbinds}
                             soulbind = {this.state.soulBindData.soulbind}
                             conduits = {this.state.soulBindData.conduits}
                             covenant = {this.state.soulBindData.covenant}
            />
            <PvPSection data = {this.state.pvpData}/>
            <RaidSection data = {this.state.raidData} />
            <DungeonSection data = {this.state.dungeonData} />
        </div>


    }

}