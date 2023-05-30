import Masonry from 'react-masonry-css'

import { Comic } from '@/components/Comic'

export function ListOfComics({ latestComics }) {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  }
  return (
    <Masonry breakpointCols={breakpointColumnsObj} className='my-masonry-grid' columnClassName='my-masonry-grid_column'>
      {latestComics.map(Comic)}
    </Masonry>
  )
}
