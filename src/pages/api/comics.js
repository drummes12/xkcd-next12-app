import fs from 'fs/promises'

export default async function handler(req, res) {
  const files = await fs.readdir('./comics')
  const lastestComicsFiles = files.slice(-8, files.length)

  const promisesReadFiles = lastestComicsFiles.map(async (file) => {
    const content = await fs.readFile(`./comics/${file}`, 'utf8')
    return JSON.parse(content)
  })
  const lastestComics = await Promise.all(promisesReadFiles)

  res.status(200).json({ lastestComics })
}
