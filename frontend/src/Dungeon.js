import React, {Component} from 'react';
import "./styles.css"

function Affix(props) {
    return <div className="tooltiptext pvpTooltip">
        <h5>{props.name}</h5>
        <p>{props.description}</p>
    </div>;
}

class Dungeon extends Component {

     pad(n, z) {
        z = z || 2;
        return ('00' + n).slice(-z);
    }

        msToTime(s) {
        let ms = s % 1000;
        s = (s - ms) / 1000;
        let secs = s % 60;
        s = (s - secs) / 60;
        let mins = s % 60;
        let hrs = (s - mins) / 60;

        return this.pad(hrs,1) + ':' + this.pad(mins) + ':' + this.pad(secs)
    }

    render() {
        return (
            <tr>
                <td><img className="dungeonImage" src={"dungeons/" + this.props.data.dungeon + ".jpg"}  alt ="" /> </td>
                <td>{this.props.data.dungeon}</td>
                <td>{"+" + this.props.data.mythic_level}</td>
                <td>{this.props.data.score}</td>
                <td>{this.props.data.score !== 0 ? this.msToTime(this.props.data.clear_time_ms) : "0:00:00"}</td>
                <td>
                    {this.props.data.affixes.map(affix =>
                        <div key = {affix.name} className="affix">
                            <img className="affixImage" src={"affixes/"+ affix.name +".png"} alt =""/>
                            <Affix name={affix.name} description={affix.description} />
                        </div>
                    )}
                </td>
            </tr>
        );
    }
}

export default Dungeon;