import React from 'react'
import useBookSearch from './useBookSearch'

function App() {
  const [query, setQuery] = React.useState('')
  const [pageNumber, setPageNumber] = React.useState(1)

  const {loading, error, books, hasMore} = useBookSearch(query, pageNumber)

  const observer = React.useRef()
  const lastBookElementRef = React.useCallback(node => {
    if(loading) return
    if(observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && hasMore){
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if(node) observer.current.observe(node)
  }, [loading, hasMore])

  function handleSearch(e){
    setQuery(e.target.value)
    setPageNumber(1)
  }

  return (
    <>
      <input type="text" value={query} onChange={handleSearch}></input>
      {
        books.map((book, index) => {
          if(books.length === index + 1){
            return <div ref={lastBookElementRef} key={book}>{book}</div>
          }
          return <div key={book}>{book}</div>
        })
      }
      <div> {loading && 'Loading...'} </div>
      <div> {error && 'Error...'} </div>
    </>
  );
}

export default App;
