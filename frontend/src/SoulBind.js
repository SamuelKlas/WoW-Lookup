import React, {Component} from 'react';

class SoulBind extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let wowHeadUrl = "spell=" + this.props.soulBindId
        return (
            <div>
                <a href="#" data-wowhead={wowHeadUrl}/>
            </div>
        );
    }
}

export default SoulBind;