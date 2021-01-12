import './App.css';
import React from 'react';
import {db} from "./plugins/firebase";
import "firebase/firestore"


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            age: '',
            devices: [
                {id : 0, name:'ゲームボーイ', checked: true},
                {id : 1, name:'ゲームボーイカラー', checked: false}
            ],
            titles: []
        }
        this.handleChangeAge = this.handleChangeAge.bind(this)
        this.handleChangeDevice = this.handleChangeDevice.bind(this)
        this.handleRequest = this.handleRequest.bind(this)
        this.handleResetRequest = this.handleResetRequest.bind(this)
    }

    handleChangeAge(event){
        this.setState({age: event.target.value})
    }

    handleChangeDevice(event){
        const devices = this.state.devices.slice().map((d) => ({id: d.id, name: d.name, checked: false}));
        devices[event.target.id] = {id: event.target.id, name: event.target.name, checked: true}
        this.setState({devices: devices})
    }

    handleRequest(event){
        const inputAge = event.target.value
        const pathName = (() => {
            if (inputAge < 30) {
                return "young"
            } else {
                return "fuga"
            }
        })()
        const docRef = db.collection('games').doc(pathName).get()
        docRef.then((value) => {
            this.setState({titles:value.data().titles})
        });
    }

    handleResetRequest(event){
        this.setState({age: '', titles:[]})
    }


    render() {
        return (
            <div className="main">
                <header className="app-header">
                    <h1>Retro Games Generator</h1>
                </header>
                <section>
                    <InputAge
                        value={this.state.age}
                        onChange={this.handleChangeAge}
                    />
                    <InputDevice
                        devices={this.state.devices}
                        onChange={this.handleChangeDevice}
                    />
                    <div className="buttons">
                    <ResultButton
                        onClick={this.handleRequest}
                        age={this.state.age}
                    />
                    <ResetButton
                        onClick={this.handleResetRequest}
                    />
                    </div>
                    <ResultView
                        titles={this.state.titles}
                        />
                </section>
            </div>
        );
    }
}

function InputAge(props){
    return(
    <div className="age">
        <p>年齢</p>
            <input
                className="inputAge"
                placeholder="入力してください"
                type="text"
                value={props.value}
                onChange={props.onChange}
            />
    </div>
    )
}

function InputDevice(props){
    const devices = props.devices
    const listDevices = devices.map((d) => {
        return(
        <label
           key={d.id}
           className="inputGames"
        >{d.name}
        <input
            type='radio'
            id={d.id}
            checked={d.checked}
            name={d.name}
            onChange={props.onChange}
        />
        </label>
        )
    })

    return(
    <div>
        <p>ゲーム機</p>
        {listDevices}
    </div>
    )
}

function ResultButton(props){
    return(
        <button
            className="resultButton"
            onClick={props.onClick}
            value={props.age}>表示する</button>
    )
}

function ResultView(props){
    return(
        props.titles.map((title) => {
            return (
                <div key={title}>{title}</div>
            )
            }
        )
    )
}

function ResetButton(props){
    return(
    <button
        className="resetButton"
        onClick={props.onClick}>リセットする</button>
    )
}



export default App;