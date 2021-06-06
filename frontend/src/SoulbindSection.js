import React, {Component} from 'react';
import SoulBind from "./SoulBind";
import Conduit from "./Conduit";
import "./colors.css"

export default class SoulbindSection extends Component {

    componentDidMount() {
        this.setState((state) => {
            state = state
            return state
        });
    }

    render() {

        return (

            <section className="equip" style={{backgroundImage :
                    `url(/covenants/${this.props.covenant.replace(" ","")}.png),
                     url(/covenants/${this.props.covenant.replace(" ","")}.png)`,
                backgroundPosition: "right 0,left 0",
                backgroundRepeat:"no-repeat",}}>
                <h2>Covenant</h2>
                <div>
                    <h5 className={this.props.covenant.replace(" ","").toLowerCase()}>{this.props.covenant}</h5>
                    <h5 style={{margin:"10px"}} className={this.props.covenant.replace(" ","").toLowerCase()}>{this.props.soulbind}</h5>
                </div>
                <section className="soulbindWrapper">
                    <div className="items soulbind">
                        {this.props.soulBindIds.map(soulId => <SoulBind key = {soulId} soulBindId={soulId}/>)}
                    </div>

                    <div className="items soulbind">
                        {this.props.conduits.map(condId => <Conduit key = {condId.id} conduitId={condId.id}
                                                                    itemLevel={condId.itemLevel}/>)}
                    </div>

                </section>


            </section>
        );
    }
}


