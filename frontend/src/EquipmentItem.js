import React from 'react';



export default class EquipmentItem extends React.Component{

    constructor(props) {
        super(props);
        let url = 'item=' + this.props.data.id + '&ilvl=' + this.props.data.level
        if (this.props.data.sockets.length > 0){
            url += '&gems=' + this.props.data.sockets[0]
        }

        if (this.props.data.enchantments.length > 0){
            url += '&ench=' + this.props.data.enchantments[0]
        }

        this.state = {
            wowHeadUrl : url,
        }
    }
    /*Need this to render wowhead tooltip correctly*/
    componentDidMount() {
        this.setState((state)=> {
            state = state
            return state
        });
    }



    render(){
        let a = window.$WowheadPower.refreshLinks()
        return <div className="equipItem">
            <a href="#" data-wowhead={this.state.wowHeadUrl}>

            </a>
            <p className={this.props.data.quality.toLowerCase()}>{this.props.data.level}</p>
        </div>

    }


}

