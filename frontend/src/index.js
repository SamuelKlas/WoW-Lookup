import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Character extends React.Component{
    constructor(props){
        super(props)
        this.state = {charUrl : props.charUrl,loaded : false}
        this.fetchDataDemo = this.fetchDataDemo.bind(this)
    }


    async fetchDataDemo(){
        let response = await fetch('http://localhost:8080/backend/eu/outland/trillethree/pvp/2v2')

        let data = await response.json()
        console.log(data)
        let response2 = await fetch('http://localhost:8080/backend/eu/outland/trillethree/pvp/3v3')

        let data2 = await response2.json()
        console.log(data2)
        return data
    }

    componentDidMount() {

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

