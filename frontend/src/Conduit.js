import React, {Component} from 'react';

class Conduit extends Component {
    render() {
        let wowHeadUrl = "spell=" + this.props.conduitId + "&ilvl=" + this.props.itemLevel
        console.log(wowHeadUrl)
        return (
            <div>
                <a href="#" data-wowhead={wowHeadUrl}/>
            </div>
        );
    }
}

export default Conduit;