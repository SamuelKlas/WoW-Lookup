import React, {Component} from 'react';
import "./pvpItem.css"
import "./classColors.css"


class Summary extends Component {
    render() {
        return (
            <div className="equip">
                <h2>{this.props.data.title}</h2>
                <div>
                    <p>
                        {this.props.data.guild}
                    </p>
                    <p>
                        <span className={this.props.data.faction.toLowerCase()}>{this.props.data.race + " "}</span>
                        <span
                            className={this.props.data.class.toLowerCase().replace(" ","")}>
                            {this.props.data.spec + " " + this.props.data.class}
                        </span>
                    </p>


                    {/*<div>*/}
                    {/*    <img src={"/covenants/" + this.props.covenant + ".jpg"} alt=""/>*/}
                    {/*    <ToolTip className="summaryTooltip" renown={this.props.data.renown}/>*/}
                    {/*    <p>{this.props.covenant}</p>*/}

                    {/*</div>*/}

                    <img className="backImage" src={this.props.mainUrl} alt=""/>
                </div>
            </div>
        );
    }
}

export default Summary;