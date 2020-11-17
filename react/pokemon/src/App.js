import React from 'react'
import PokemonList from './PokemonList'
import Pagination from './Pagination'
import axios from 'axios'

function App() {
  // data, update data
  const [pokemon, setPokemon] = React.useState([]) // default state
  const [currentPageUrl, setCurrentPageUrl] = React.useState(["https://pokeapi.co/api/v2/pokemon"])
  const [prevPageUrl, setPrevPageUrl] = React.useState([])
  const [nextPageUrl, setNextPageUrl] = React.useState([])
  const [loading, setLoading] = React.useState([])
  
  React.useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false)
      setPrevPageUrl(res.data.previous)
      setNextPageUrl(res.data.next)
      setPokemon(res.data.results.map(pokemon => pokemon.name))
    })
    return () => cancel()
  }, [currentPageUrl, setCurrentPageUrl])

  function gotoPrevPage(){
    setCurrentPageUrl(prevPageUrl)
  }

  function gotoNextPage(){
    setCurrentPageUrl(nextPageUrl)
  }

  if(loading) return "Loading..."

  return (
    <>
      <PokemonList pokemon={pokemon}/>
      <Pagination 
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
        gotoNextPage={nextPageUrl ? gotoNextPage : null} 
      />
    </>
  );
}

export default App;
