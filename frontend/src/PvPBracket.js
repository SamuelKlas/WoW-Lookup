import React from 'react'
import './pvpItem.css'

const PopupContent = (props) => (
    <div className="tooltiptext">
        <h5>Season Statistics</h5>
        <p>Won   : {props.data.won}</p>
        <p>Lost  : {props.data.lost}</p>
        <p>Total : {props.data.played}</p>
        <p>Won   : {props.data.played === 0 ? "0%" :
            Math.round(props.data.won / (props.data.won + props.data.lost) * 100) + "%"}</p>

    </div>
)


export default class PvPBracket extends React.Component {

    render() {

        return (

        <div className="pvpItem">
            <p>{this.props.name}</p>
            <img className="image"  src={this.props.imgUrl} alt=""/>
            <PopupContent data ={this.props.statistics}/>
            <p>{this.props.rating}</p>
        </div>
        )
    }

}

