import React, {Component} from 'react';
import Talent from "./Talent";
import SoulBind from "./SoulBind";
import Conduit from "./Conduit";



export default class SoulbindSection extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.setState((state)=> {
            state = state
            return state
        });
    }

    render() {

        return (
            <div className="equip">
                <p>SoulBinds and Conduits</p>
                <section className="soulbindWrapper">
                    <div className="items soulbind">
                        {this.props.soulBindIds.map(soulId => <SoulBind soulBindId = {soulId} /> )}
                    </div>

                    <div className="items soulbind">
                        {this.props.conduits.map(soulId => <Conduit conduitId = {soulId.id} itemLevel = {soulId.itemLevel} /> )}
                    </div>

                </section>


            </div>
        );
    }
}


