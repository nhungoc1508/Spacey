import logo from './logo.svg';
import './App.css';
import Deck from './Deck'
import styles from './styles.module.css'
import React from 'react';

class App extends React.Component {

    // Constructor
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            imageUrls: [],
            DataisLoaded: false,
            cardTitle: ""
        };
    }

    // ComponentDidMount is used to
    // execute the code
    loadData() {
        fetch(
            "https://api.nasa.gov/planetary/apod?count=5&api_key=lCjAdHarFLEcr03k6FzDdDxfkksPRPhEcRuXKCLe")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json,
                    DataisLoaded: true,
                    imageUrls: json.map(item => item.url),
                    cardTitle: json[json.length - 1].title,
                    explanation: json[json.length - 1].explanation
                });
            })
    }

    componentDidMount() {
        this.loadData()
    }

    handleChange = (event) => {
        this.setState({
            cardTitle: event.target.value
        })
    }

    handleNewCard = (id) => {
        const item = this.state.items[id]
        this.setState({
            cardTitle: item.title,
            explanation: item.explanation
        })
    }

    refreshPage() {
        window.location.reload(false);
    }

    render() {
        const { DataisLoaded, items, imageUrls, cardTitle, explanation } = this.state;
        if (!DataisLoaded) return <div>
            <h1> Pleses wait some time.... </h1> </div>;

        return (
            // <main className="bg-gradient-to-b from-blueGray-900 to-sky-800 body-font h-screen">
            <main className={styles.container}>
                <div className="container grid grid-cols-1 md:grid-cols-2 mx-auto flex flex-wrap justify-center relative text-white font-serif">
                    {/* <div className="flex flex-col justify-center text-black bg-gray-400"> */}
                    <Deck cards={items} cardTitle={cardTitle} explanation={explanation} handleChange={this.handleChange} handleNewCard={this.handleNewCard} />
                    {/* </div> */}
                    {/* <div className="py-6 bg-sky-300">
                        <p className="text-4xl text-right font-semibold w-100">Abc</p>
                    </div> */}
                    {/* <div className="py-6 grid">
                        <p className="text-6xl text-right w-100 pt-5 pb-0">{cardTitle}</p>
                        <p className="text-sm text-right w-100 pt-0 pb-5">{explanation}</p>
                        <button className="border border-white justify-self-end px-5 rounded-lg h-12" onClick={this.refreshPage}>Load new images</button>
                    </div> */}
                </div>
                {/* <input type="text" onChange={this.handleChange}
                    value={this.state.cardTitle} />
                <p>{this.state.cardTitle}</p> */}
            </main>
        );
    }
}

export default App;
