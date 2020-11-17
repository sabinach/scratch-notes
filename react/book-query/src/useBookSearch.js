import React from 'react'
import axios from 'axios'

export default function useBookSearch(query, pageNumber) {
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(false)
  const [books, setBooks] = React.useState([])
  const [hasMore, setHasMore] = React.useState(false)

  React.useEffect(() => {
    setBooks([])
  }, [query])

  React.useEffect(() => {
    setLoading(true)
    setError(false)

    let cancel

    axios({
      method: 'GET',
      url: 'http://openlibrary.org/search.json',
      params: {q: query, page: pageNumber},
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setBooks(prevBooks => {
        return Array.from(new Set([...prevBooks, ...res.data.docs.map(book => book.title)]))
      })
      setHasMore(res.data.docs.length > 0)
      setLoading(false)
    }).catch(e => {
      if(axios.isCancel(e)) return
      setError(true)
    })

    return () => cancel()
  }, [query, pageNumber])

  return {loading, error, books, hasMore}
}
