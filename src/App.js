import React from 'react';
import './App.css';
import Deck from './components/Deck'
import Text from './components/Text';
import LikeBtn from './components/LikeBtn';
import styles from './styles/styles.module.css'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            dataLoaded: false,
            display: 0,
            likes: Array(5).fill(false)
        };
    }

    loadData() {
        fetch(
            "https://api.nasa.gov/planetary/apod?count=5&api_key=lCjAdHarFLEcr03k6FzDdDxfkksPRPhEcRuXKCLe")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json,
                    dataLoaded: true,
                    display: json.length - 1
                });
            })
    }

    componentDidMount() {
        this.loadData()
    }

    nextCard = () => {
        this.setState(prevState => {
            const newDisplay = prevState.display == 0 ? prevState.items.length - 1 : prevState.display - 1
            return {
                display: newDisplay
            }
        })
    }

    likePost = () => {
        this.setState(prevState => {
            const updatedLikes = []
            prevState.likes.forEach((value, key) => {
                updatedLikes.push(key == prevState.display ? !value : value)
            })
            return {
                likes: updatedLikes
            }
        })
    }

    refreshPage() {
        window.location.reload(false);
    }

    render() {
        const { dataLoaded, items, display, likes } = this.state;
        if (!dataLoaded) return (
            <main className={styles.container}>
                <p className="text-5xl text-white font-serif">Spacey is loading</p>
            </main>);

        return (
            <main className={styles.container}>
                <div className="container grid grid-cols-1 md:grid-cols-2 mx-auto flex flex-wrap justify-center relative text-white font-serif">
                    <Deck cards={items} nextCard={this.nextCard} />
                    <div className="py-6 flex flex-wrap justify-end">
                        <div className="h-5/6">
                            <Text number={items.length} cards={items} flip={display} />
                        </div>
                        <a target="_blank" href="https://github.com/nhungoc1508/Spacey" className="mx-5 h-12 text-amber-200 text-xs"><span className="font-sans">SPACEY</span> by Ngoc Hoang</a>
                        <LikeBtn liked={likes[display]} likePost={this.likePost}/>
                        <button title="Load new images" className="border border-white px-5 rounded-lg h-12" onClick={this.refreshPage}>Load new images</button>
                    </div>
                </div>
            </main>
        );
    }
}

export default App;
