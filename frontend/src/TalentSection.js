import React, {Component} from 'react';
import Talent from "./Talent";
class TalentSection extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                {this.props.talentIds.map(talId => <Talent talentId = {talId} /> )}
            </div>
        );
    }
}

export default TalentSection;