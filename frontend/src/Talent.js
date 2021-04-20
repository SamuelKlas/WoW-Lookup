import React, {Component} from 'react';

class Talent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let wowHeadUrl = "spell=" + this.props.talentId
        return (
            <div>
                <a href="#" data-wowhead={wowHeadUrl}/>
            </div>
        );
    }
}

export default Talent;