import React, {Component} from 'react';
import Talent from "./Talent";

class TalentSection extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="equip">
                <p>Talents</p>

                <div className="items">
                    {this.props.data.map(talId => <Talent talentId = {talId[0]} level = {talId[1]} /> )}
                </div>
            </div>
        );
    }
}

export default TalentSection;