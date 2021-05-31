import React, {Component} from 'react';
import SoulBind from "./SoulBind";
import Conduit from "./Conduit";


const ToolTip = (props) => {
    return <div className="tooltiptext">
        <p>{"Renown : " + props.renown}</p>
    </div>
}

export default class SoulbindSection extends Component {

    componentDidMount() {
        this.setState((state) => {
            state = state
            return state
        });
    }

    render() {

        return (
            <div className="equip">
                <h2>Covenant</h2>
                <div>
                    <img className="covenantText covenantImage"
                         src={"/covenants/" + this.props.covenant + ".jpg"} alt=""/>
                    <p className="covenantText">{this.props.soulbind}</p>
                </div>
                <section className="soulbindWrapper">
                    <div className="items soulbind">
                        {this.props.soulBindIds.map(soulId => <SoulBind soulBindId={soulId}/>)}
                    </div>

                    <div className="items soulbind">
                        {this.props.conduits.map(soulId => <Conduit conduitId={soulId.id}
                                                                    itemLevel={soulId.itemLevel}/>)}
                    </div>

                </section>


            </div>
        );
    }
}


