import React, {Component} from 'react';
import Talent from "./Talent";

class TalentSection extends Component {

    render() {
        return (
            <section className="equip">
                <h2>Talents</h2>

                <div className="items">
                    {this.props.data.map(talId => <Talent key={talId[0]} talentId={talId[0]} level={talId[1]}/>)}
                </div>
            </section>
        );
    }
}

export default TalentSection;