import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Character extends React.Component{
    constructor(props){
        super(props)
        this.state = {charUrl : props.charUrl,loaded : false}
        this.fetchDataDemo = this.fetchDataDemo.bind(this)
    }

    async getAccessToken(){
        let accessInfo = await fetch("accessInfo.json")
        let credentials = await accessInfo.json()

        let response = await fetch('https://us.battle.net/oauth/token', {
            method: 'POST',
            body: 'grant_type=client_credentials&client_id=' + credentials.clientId + '&client_secret=' +
                credentials.clientSecret,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        let json = await response.json()
        this.setState({accessToken :json.access_token})
        return json


    }

    async fetchDataDemo(){
        let response = await fetch(this.props.charUrl,{
            method : 'GET',
            headers: {
                Authorization: "Bearer " + this.state.accessToken
            }
        })
        let data = await response.json()
        console.log(data)
        return data
    }

    componentDidMount() {
        this.getAccessToken()
    }

    render(){
        return <div>
            <button type="button" onClick={this.fetchDataDemo}>Fetch data</button>
                </div>
    }

}


ReactDOM.render(
    <Character charUrl = "https://eu.api.blizzard.com/profile/wow/character/outland/trillethree/equipment?namespace=profile-eu&locale=en_GB" />
,
  document.getElementById('root')
);

