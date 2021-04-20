import React, {Component} from 'react';
import Talent from "./Talent";
import SoulBind from "./SoulBind";



export default class SoulbindSection extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                {this.props.soulBindIds.map(soulId => <SoulBind soulBindId = {soulId} /> )}
            </div>
        );
    }
}


