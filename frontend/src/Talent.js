import React, {Component} from 'react';

class Talent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            yeet: "yeet"
        }
    }

    /*Need this to render wowhead tooltip correctly*/
    componentDidMount() {
        this.setState((state)=> {
            state = state
            return state
        });
    }

    render() {
        let a = window.$WowheadPower.refreshLinks()
        let wowHeadUrl = "spell=" + this.props.talentId
        return (
            <div className="equipItem">
                <a href="#" data-wowhead={wowHeadUrl}/>
                <p>{this.props.level}</p>
            </div>
        );
    }
}

export default Talent;