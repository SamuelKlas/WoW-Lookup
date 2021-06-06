import React, {Component} from 'react';
import "./styles.css"
import "./colors.css"


class Summary extends Component {
    render() {
        return (
            <section className="equip" style={{
                backgroundImage: `url(/factions/${this.props.data.faction.toLowerCase()}.jpg)`
                , backgroundRepeat: "no-repeat", backgroundPosition: "50% 0"
            }}>
                <h2>{this.props.data.title}</h2>
                <div>
                    <p>
                        {this.props.data.guild}
                    </p>
                    <p>Level {this.props.data.level}</p>
                    <p>
                        <span className={this.props.data.faction.toLowerCase()}>{this.props.data.race + " "}</span>
                        <span
                            className={this.props.data.class.toLowerCase().replace(" ", "")}>
                            {this.props.data.spec + " " + this.props.data.class}
                        </span>
                    </p>
                    <img className="backImage" src={this.props.mainUrl} alt=""/>
                </div>
            </section>
        );
    }
}

export default Summary;