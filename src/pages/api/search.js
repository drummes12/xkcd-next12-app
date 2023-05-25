import algoliasearch from 'algoliasearch/lite'

const client = algoliasearch('KKMQU97UEN', '12bf855f6316c603ecdea5dfb99d9718')
const index = client.initIndex('prod_comics')

export default async function handler(req, res) {
  const { query } = req
  const { hits } = await index.search(query.q, {
    attributesToRetrieve: ['id', 'title', 'img', 'alt'],
    hitsPerPage: 10
  })
  return res.status(200).json(hits)
}
