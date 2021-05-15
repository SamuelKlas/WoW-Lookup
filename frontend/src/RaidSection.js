import React, {Component} from 'react';
import RaidDifficulty from "./RaidDifficulty";
class RaidSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            difficulty : "Normal",
            id : 0,
        }
        console.log(props)
    }

    handleMythicClick = () => {
        this.setState({difficulty : "Mythic",id : 0})
    }

    handleHeroicClick = () => {
        this.setState({difficulty : "Heroic",id : 1})
    }

    handleNormalClick = () => {
        this.setState({difficulty : "Normal",id : 2})
    }

    getBossesKilledInDiff(difficulty){
        let diff = this.props.data.filter(d=>d.difficulty.name === difficulty)[0]
        if(diff === null || diff === undefined)return 0;
        return diff.progress.completed_count

    }



    render() {
        let diff = this.props.data.filter(d=>d.difficulty.name === this.state.difficulty)[0]
        return (
            <div className="equip">
                <h1>Castle Nathria</h1>
                <button onClick={this.handleNormalClick} type="button">Normal</button>
                <button onClick={this.handleHeroicClick} type="button">Heroic</button>
                <button onClick={this.handleMythicClick} type="button">Mythic</button>
                <p>{this.state.difficulty + " : " + this.getBossesKilledInDiff(this.state.difficulty) + "/10"} </p>

                    <RaidDifficulty data = {diff}/>

            </div>
        );
    }
}

export default RaidSection;