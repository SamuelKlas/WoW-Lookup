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
            url : url
        }
    }

    componentDidMount() {
    }

    render(){
        return <div>
            <p>{this.state.url}</p>
            <a href="#" data-wowhead={this.state.url}>Wonky API endpoint</a>
        </div>

    }


}

