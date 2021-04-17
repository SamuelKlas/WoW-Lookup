import React from 'react';
import PvPBracket from "./PvPBracket";
import "bootstrap/dist/css/bootstrap.css";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";


export default class PvPSection extends React.Component{



    constructor(props){
        super(props)
        this.state = {}
    }

    /*Handling nonsensical API endpoint, no idea how to better write this*/
    mapPvPTierToIcon(bracket){
        let ret = "pvpTiers"

        if(bracket.rating >= 2950) return ret + "/gladiator.png"

        switch (bracket.tier){
            case 1 : case 8 : case 16 :
                ret += "/unranked.png"
                break;
            case 2 : case 9 : case 17 :
                ret += "/combatant.png"
                break;
            case 3 : case 11 : case 18 :
                ret += "/challenger.png"
                break;
            case 4 : case 12 : case 19 :
                ret += "/rival.png"
                break;
            case 5 : case 13 : case 20 :
                ret += "/duelist.png"
                break;
            case 6 : case 14 : case 21 :
                ret += "/elite.png"
                break;
            default :
                return ""

        }
        return ret
    }

    mapAllIdsToImages(){
        return this.props.data.map(bracket => this.mapPvPTierToIcon(bracket))
    }


    render(){
        let urls = this.mapAllIdsToImages()
        let ratings = this.props.data.map( bracket => bracket.rating)
        let statistics = this.props.data.map(bracket => bracket.seasonStatistics)

        return (

            <div className="pvpWrapper">
                <PvPBracket imgUrl = {urls[0]} rating = {ratings[0]} statistics = {statistics[0]} name = '2v2'/>
                <PvPBracket imgUrl = {urls[1]} rating = {ratings[1]} statistics = {statistics[1]} name = '3v3'/>
                <PvPBracket imgUrl = {urls[2]} rating = {ratings[2]} statistics = {statistics[2]} name = 'Rated Battlegrounds'/>
            </div>
        )

    }







}