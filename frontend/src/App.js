import React, {Component} from 'react';
import Character from "./Character";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            server: "",
            name: "",
            region: "",
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
            this.setState((state)=> {
                state.url = "http://localhost:8080/backend/" + state.region +"/" +state.server +"/" + state.name
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
                        Name:
                        <input name ="server" type="text" value={this.state.server} onChange={this.handleInputChange}/>
                    </label>
                    <select name = "region" value={this.state.region} onChange={this.handleInputChange}>
                        <option value="eu">eu</option>
                        <option value="na">na</option>
                    </select>
                    <input type="submit" value="Submit"/>
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