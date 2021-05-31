import React, {Component} from 'react';
import Talent from "./Talent";

class TalentSection extends Component {

    render() {
        return (
            <div className="equip">
                <h2>Talents</h2>

                <div className="items">
                    {this.props.data.map(talId => <Talent talentId = {talId[0]} level = {talId[1]} /> )}
                </div>
            </div>
        );
    }
}

export default TalentSection;