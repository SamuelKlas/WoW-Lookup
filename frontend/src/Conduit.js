import React, {Component} from 'react';

class Conduit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            yeet: "yeet"
        }
    }

    componentDidMount() {
        this.setState((state)=> {
            state = state
            return state
        });
    }

    render() {
        let wowHeadUrl = "spell=" + this.props.conduitId + "&ilvl=" + this.props.itemLevel
        let a = window.$WowheadPower.refreshLinks()
        return (
            <div>
                <a href="#" data-wowhead={wowHeadUrl}/>
            </div>
        );
    }
}

export default Conduit;