import { Component } from 'react'
import Popup from 'reactjs-popup';
import InfiniteScroll from 'react-infinite-scroll-component';
import 'reactjs-popup/dist/index.css';
import Modal from 'react-bootstrap'

class PokemonList extends Component {

    state = { pokeList: [], previous: '', next: 'https://pokeapi.co/api/v2/pokemon?limit=20', total: 0, hasMore: true, selected: {} }


    componentDidMount() {
        this.loadMorePokemons();
    }

    loadMorePokemons = async () => {
        const { next, pokeList,total } = this.state;
        let res = await fetch(next);

        res.json().then((response) => {
            if (response && response.results) {
                let newList = pokeList.concat(response.results);
                if (response.next == null) {
                    this.setState({ pokeList: newList, total: total+20, next: response.next, hasMore: false })
                } else {
                    this.setState({ pokeList: newList, total: total+20, previous: response.previous, next: response.next })
                }

            }
        }).catch((err) => {
            console.log(err);
        });


    }

    setSelected = async(pokemon) => {
        //this.setState({ selected: pokemon })
        console.log(pokemon)
        let res = await fetch(pokemon.url);
        res.json().then((poke)=> {
            this.setState({selected: poke})
        }).catch((err)=>{
            alert("error while fetching");
        })
    }

    render() {
        const { pokeList, total, hasMore, selected } = this.state;
        
        return (
            <div className='container'>


                <InfiniteScroll dataLength={pokeList.length} next={this.loadMorePokemons} hasMore={hasMore}
                    loader={<h4>Loading...</h4>} endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }>
                    {
                        pokeList.map(pokemon => {
                            return (
                                <Popup key={pokemon.name}
                                    trigger={open => (
                                        <div className='row'> <button className="button" onClick={() => this.setSelected(pokemon)} style={{"padding": "10px"}}>{pokemon.name+" -  "+pokemon.url}
                                        </button>
                                        </div>
                                    )}
                                    position="right center"
                                    modal
                                    closeOnDocumentClick
                                >
                                    {pokemon.name + "  - "+selected.id}
                                    {JSON.stringify(selected)}
                                </Popup>

                            )
                        })

                    }
                </InfiniteScroll>
            </div>
        )
    }
}

export default PokemonList