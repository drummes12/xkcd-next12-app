import { Masonry } from 'masonic'
import { useEffect, useState } from 'react'

import { Comic } from '@/components/Comic'

export function ListOfComics() {
  const [lastestComics, setLastestComics] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch('/api/comics').then((res) => res.json())
        setLastestComics(data.lastestComics)
      } catch (error) {
        console.error('Error fetching comics:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <Masonry
      itemStyle={{ padding: '0 16px' }}
      items={lastestComics}
      render={Comic}
      columnGutter={20}
    />
  )
}
