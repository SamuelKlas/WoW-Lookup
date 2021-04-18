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
        <p>Won   : {Math.round(props.data.won / (props.data.won+ props.data.lost) * 100)}%</p>

    </div>
)


export default class PvPBracket extends React.Component {

    render() {
        return (

        <div className="pvpItem">
            <p>{this.props.name}</p>
            <Popup basic content={<PopupContent data ={this.props.statistics}/>}
                   trigger={<img className="image"  src={this.props.imgUrl} alt=""/>}
            />
            <p>{this.props.rating}</p>
        </div>
        )
    }

}

