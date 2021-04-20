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

    componentDidMount() {
        this.setState((state)=> {
            state = state
            return state
        });
    }



    render(){
        {console.log(window.$WowheadPower.refreshLinks())}
        return <div>
            <a href="#" data-wowhead={this.state.wowHeadUrl}>

            </a>
        </div>

    }


}

