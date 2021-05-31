import React, {Component} from 'react';

class SoulBind extends Component {
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
        let a = window.$WowheadPower.refreshLinks()
        let wowHeadUrl = "spell=" + this.props.soulBindId
        return (
            <div style={{margin:"0.5rem "}}>
                <a href="#" data-wowhead={wowHeadUrl}/>
            </div>
        );
    }
}

export default SoulBind;