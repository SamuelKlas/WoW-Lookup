import React from 'react'
import './pvpItem.css'

import "bootstrap/dist/css/bootstrap.css";

import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

export default class PvPBracket extends React.Component {

    constructor(props) {
        super(props);
    }



    render() {

        return (
        <div className="pvpItem">
            <p>{this.props.name}</p>
                <img className="image"  src={this.props.imgUrl} alt=""/>
            <p>{this.props.rating}</p>
        </div>
        )
    }

}