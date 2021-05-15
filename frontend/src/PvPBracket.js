import React from 'react'
import './pvpItem.css'

import "bootstrap/dist/css/bootstrap.css";

import {Popup} from 'semantic-ui-react'


const PopupContent = (props) => (
    <div>
        <h5>Season Statistics</h5>
        <p>Won   : {props.data.won}</p>
        <p>Lost  : {props.data.lost}</p>
        <p>Total : {props.data.played}</p>
        <p>Won   : {props.data.played === 0 ? "0%" :
            Math.round(props.data.won / (props.data.won + props.data.lost) * 100) + "%"}</p>

    </div>
)

const style = {
    borderRadius: 0,
    padding: '2em',
    backgroundColor:"#0f0f0f",
    color: "white",
}


export default class PvPBracket extends React.Component {

    render() {

        return (

        <div>
            <p>{this.props.name}</p>
            <Popup basic
                   trigger={<img className="image"  src={this.props.imgUrl} alt=""/>}
                   style={style}>
                <PopupContent data ={this.props.statistics}/>
            </Popup>
            <p>{this.props.rating}</p>
        </div>
        )
    }

}

