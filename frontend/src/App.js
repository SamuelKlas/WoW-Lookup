import React, {Component} from 'react';
import Character from "./Character";
import './styles.css'

class App extends Component {

    constructor(props) {
        super(props);

        Array.prototype.contains = function (s) {
            return this.indexOf(s) !== -1
        }

        this.state = {
            server: "",
            name: "",
            region: "eu",
            url: ""
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

    handleSubmit(event) {
        if(this.state.server === "" || this.state.name === ""){
            alert("Please fill out the name and server fields")
            return
        }
        /*convert server to serverSlug for api access*/
        let server = this.state.server.toLowerCase()
            .replace(" ", "-").replace("'", "")
        /*backend url*/
        this.setState((state) => {
            state.url = "https://calm-reaches-90919.herokuapp.com/backend/"
                + state.region + "/" + server + "/" + state.name.toLowerCase()
            return state
        });
        event.preventDefault();
    }

    render() {
        return (


            <div className="outerDiv">
                <h1>Spectral Site</h1>
                <div className="formWrapper">
                    <form style={{margin: "auto"}} autoComplete="off" onSubmit={this.handleSubmit}>
                        <label>Name:</label>
                        <br/>
                        <input name="name" type="text" value={this.state.name} onChange={this.handleInputChange}/>
                        <br/>
                        <label>Server:</label>
                        <br/>
                        <input name="server" type="text" value={this.state.server} onChange={this.handleInputChange}/>
                        <br/>
                        <select className="select" name="region" value={this.state.region}
                                onChange={this.handleInputChange}>
                            <option name="region" value="eu">eu</option>
                            <option name="region" value="us">us</option>
                        </select>
                        <br/>
                        <input style={{margin: "0"}} type="submit" value="Search"/>
                    </form>
                </div>
                {
                    this.state.url !== "" &&
                    <Character baseUrl={this.state.url}/>
                }
            </div>
        );
    }
}

export default App;