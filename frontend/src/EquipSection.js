import React, {Component} from 'react';
import EquipmentItem from "./EquipmentItem";

class EquipSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            averageItemLevel : (this.props.equipData.map(e => e.level).reduce((a,b)=> a+b,0) /
                this.props.equipData.length).toFixed(2)
        }
    }

    render() {
        return (
            <div className="equip">
                <p>Equipment</p>
                <p>Average Item level : {this.state.averageItemLevel}</p>
                <div className="items">
                    {this.props.equipData.map(item =><EquipmentItem data = {item} /> )}
                </div>

            </div>
                );
    }
}

export default EquipSection;