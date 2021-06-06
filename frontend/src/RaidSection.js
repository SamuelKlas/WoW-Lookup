import React, {Component} from 'react';
import RaidDifficulty from "./RaidDifficulty";

class RaidSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            difficulty: "Normal",
            id: 0,
        }
        console.log(props.data)
    }

    handleMythicClick = () => {
        this.setState({difficulty: "Mythic", id: 0})
    }

    handleHeroicClick = () => {
        this.setState({difficulty: "Heroic", id: 1})
    }

    handleNormalClick = () => {
        this.setState({difficulty: "Normal", id: 2})
    }

    getBossesKilledInDiff(difficulty) {
        let diff = this.props.data.filter(d => d.difficulty.name === difficulty)[0]
        if (diff === null || diff === undefined) return 0;
        return diff.progress.completed_count

    }

    getTotalBossKillsInDiff(difficulty) {
        let diff = this.props.data.filter(d => d.difficulty.name === difficulty)[0]
        if (diff === null || diff === undefined) return 0;
        return diff.progress.encounters.map(enc => enc.completed_count).reduce((a, b) => a + b, 0)

    }


    render() {
        let diff = this.props.data.filter(d => d.difficulty.name === this.state.difficulty)[0]
        return (
            <section className="equip">
                <h1>Castle Nathria</h1>
                <button onClick={this.handleNormalClick} type="button">Normal</button>
                <button onClick={this.handleHeroicClick} type="button">Heroic</button>
                <button onClick={this.handleMythicClick} type="button">Mythic</button>
                <p>{this.state.difficulty + " : " + this.getBossesKilledInDiff(this.state.difficulty) + "/10"} </p>
                <p>Total Boss Kills : {this.getTotalBossKillsInDiff(this.state.difficulty)}</p>
                <RaidDifficulty data={diff}/>

            </section>
        );
    }
}

export default RaidSection;