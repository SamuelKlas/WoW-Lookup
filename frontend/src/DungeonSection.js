import React, {Component} from 'react';
import Dungeon from "./Dungeon";
import "./pvpItem.css"
class DungeonSection extends Component {
    constructor(props) {
        super(props);
        let dungeonNames = [
            "Mists of Tirna Scithe",
            "Plaguefall",
            "The Necrotic Wake",
            "Halls of Atonement",
            "Sanguine Depths",
            "Theater of Pain",
            "Spires of Ascension",
            "De Other Side"
        ]
        let dungeons = dungeonNames.map(name => ({
            dungeon : name,
            clear_time_ms : "N/A",
            mythic_level : 0,
            score : 0,
            affixes : []
        })
        )
        let clearedDungeons = this.props.data.bestRuns.map(run => run.dungeon)
        let defaultDungeons = dungeons.filter(d => !clearedDungeons.contains(d.dungeon))
        let finalData = this.props.data.bestRuns.concat(defaultDungeons)
        this.state = {
            bestRuns : finalData
        }

    }

    render() {
        return (
            <div className="equip">
                <h1>Dungeons</h1>
                <table>
                <tr>
                    <td></td>
                    <td>Name</td>
                    <td>Level</td>
                    <td>Score</td>
                    <td>Time</td>
                    <td>Affixes</td>
                </tr>
                    {this.state.bestRuns.map(run =>
                        <Dungeon data = {run} />
                    )}

                </table>
            </div>
        );
    }
}

export default DungeonSection;