import { useEffect, useState } from 'react'
import { useStateComponent } from './useStateComponent'

export function useLastesComics() {
  const [lastestComics, setLastestComics] = useState([])
  const {
    stateComponent: stateComics,
    updateStateComponent: updateStateComics
  } = useStateComponent()

  useEffect(() => {
    async function fetchData() {
      try {
        updateStateComics('loading', true)
        const data = await fetch('/api/comics').then((res) => res.json())
        setLastestComics(data.lastestComics)
        updateStateComics('loading', false)
      } catch (_) {
        updateStateComics('loading', false)
        updateStateComics('error', 'Error fetching comics')
      }
    }

    fetchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    lastestComics,
    stateComics
  }
}
