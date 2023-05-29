import algoliasearch from 'algoliasearch/lite'

const client = algoliasearch('KKMQU97UEN', '12bf855f6316c603ecdea5dfb99d9718')
const index = client.initIndex('prod_comics')

const CACHE = {}

export const search = async ({ query }) => {
  if (CACHE[query]) return { results: CACHE[query] }
  const { hits } = await index.search(query, {
    attributesToRetrieve: ['id', 'title', 'img', 'alt'],
    hitsPerPage: 10
  })
  CACHE[query] = hits

  return { results: hits }
}
