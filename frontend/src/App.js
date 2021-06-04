import React, {Component} from 'react';
import Character from "./Character";

class App extends Component {

    constructor(props) {
        super(props);

        Array.prototype.contains = function(s) { return this.indexOf(s) !== -1 }

        this.state = {
            server: "",
            name: "",
            region: "eu",
            url : ""
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event){
            let server = this.state.server.toLowerCase().replace(" ","").replace("'","")
            this.setState((state)=> {
                state.url = "http://spectralsite-env-1.eba-hhxhkqbm.us-east-2.elasticbeanstalk.com/backend/"
                    + state.region +"/" + server +"/" + state.name.toLowerCase()
                return state
            });
            event.preventDefault();
            console.log(this.state)
    }

    render() {
        return (

            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input name ="name" type="text" value={this.state.name} onChange={this.handleInputChange}/>
                    </label>
                    <label>
                        Server:
                        <input name ="server" type="text" value={this.state.server} onChange={this.handleInputChange}/>
                    </label>
                    <select name = "region" value={this.state.region} onChange={this.handleInputChange}>
                        <option value="eu" selected>eu</option>
                        <option value="na">na</option>
                    </select>
                    <input type="submit" value="Search"/>
                </form>
                {
                    this.state.url !== "" &&
                    <Character baseUrl={this.state.url}/>
                }
            </div>
        );
    }
}

export default App;