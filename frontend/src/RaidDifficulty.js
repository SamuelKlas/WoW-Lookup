import React, {Component} from 'react';



class RaidDifficulty extends Component {

    constructor(props) {
        super(props);
        console.log(props)
    }

    getBossImages = () => {
        let bossNames = ["Shriekwing","Huntsman Altimor","Sun King's Salvation","Artificer Xy'mox",
        "Hungering Destroyer","Lady Inerva Darkvein","The Council of Blood","Sludgefist",
        "Stone Legion Generals","Sire Denathrius"]
        let images = bossNames.map(boss =>
            ({
                name :boss,
                timesKilled : 0,
                lastKilled : "No kill",
                style : "empty"
            })
        )

        if (this.props.data === null || this.props.data === undefined) return images
        let data = this.props.data.progress.encounters
        for(let i = 0; i< data.length;i++){
            let boss = data[i]
            for(let j = 0; j < images.length;j++){
                if(images[j].name === boss.encounter.name){
                    images[j].timesKilled = boss.completed_count
                    images[j].style = "filled"
                    images[j].lastKilled = boss.last_kill_timestamp
                }
            }
        }
        return images

    }
    render() {
        return (
            <div className="tryout">
                {
                this.getBossImages().map(encounter =>
                    <div>
                        <img className={"raidImage " + encounter.style} src={"/raidBosses/" + encounter.name + ".jpg"}/>
                        <p>{encounter.name}</p>
                        <p>{encounter.timesKilled}</p>
                    </div>)
                }
            </div>
        );
    }
}

export default RaidDifficulty;