import React, {Component} from 'react';
import EquipmentItem from "./EquipmentItem";

class EquipSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            averageItemLevel: (this.props.equipData.map(e => e.level).reduce((a, b) => a + b, 0) /
                this.props.equipData.length).toFixed(2)
        }
    }

    render() {
        return (
            <section className="equip">
                <h2>Equipment</h2>
                <p>Average Item level : {this.state.averageItemLevel}</p>
                <div className="items">
                    {this.props.equipData.map(item => <EquipmentItem key={item.id} data={item}/>)}
                </div>

            </section>
        );
    }
}

export default EquipSection;