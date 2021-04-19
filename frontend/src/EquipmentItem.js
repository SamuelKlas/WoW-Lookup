import React from 'react';

function imgError(image,url) {
    image.onError = "";
    image.src = url
    return true;
}

export default class EquipmentItem extends React.Component{

    constructor(props) {
        super(props);
        this.getImgUrlFromAPI = this.getImgUrlFromAPI.bind(this)
        let url = 'item=' + this.props.data.id + '&ilvl=' + this.props.data.level
        if (this.props.data.sockets.length > 0){
            url += '&gems=' + this.props.data.sockets[0]
        }

        if (this.props.data.enchantments.length > 0){
            url += '&ench=' + this.props.data.enchantments[0]
        }

        this.state = {
            wowHeadUrl : url,
            imgUrl : ""
        }
    }

    componentDidMount() {
        this.getImgUrlFromAPI()
    }



    async getImgUrlFromAPI(){
        let response = await fetch('http://localhost:8080/backend/equipment/media/'+this.props.data.id)
        let imgUrl = await response.text()
        console.log(imgUrl)
        this.setState((state)=> {
           state.imgUrl = imgUrl
           return state
        });
        return imgUrl

    }
/* <img src = {"equipmentImages/"+this.props.data.id + ".png"}  />*/

    render(){
        if(this.state.loaded === false)return "loading"
        return <div>
            <a href="#" data-wowhead={this.state.wowHeadUrl}>
                <img src = {this.state.imgUrl}  />
            </a>
        </div>

    }


}

