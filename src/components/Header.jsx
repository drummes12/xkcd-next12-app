import { Input, Navbar, Text } from '@nextui-org/react'
import Link from 'next/link'
import { useRef, useState } from 'react'

export function Header() {
  const [results, setResults] = useState([])
  const searchRef = useRef()

  const getValue = () => searchRef.current?.value
  const collapseItems = []

  const handleChange = () => {
    const query = getValue()
    if (!query) return
    fetch(`/api/search?q=${query}`)
      .then((res) => res.json())
      .then(({ results: searchResults }) => {
        setResults(searchResults)
      })
  }

  return (
    <Navbar isBordered variant='floating'>
      <Navbar.Brand>
        <Text h2 className='font-bold text-xl' color='inherit'>
          <Link href='/' className='transition hover:opacity-80'>
            next
            <Text span style={{ fontWeight: 'lighter' }}>
              xkcd
            </Text>
          </Link>
        </Text>
      </Navbar.Brand>
      <Navbar.Content>
        <Navbar.Item>
          <div>
            <Input bordered ref={searchRef} onChange={handleChange} aria-label='search' aria-labelledby='search' />
            <div className='relative'>
              {Boolean(results.length) && searchRef.current.value !== '' && (
                <div className='absolute top-1 left-0 w-full'>
                  <ul className='overflow-hidden border rounded-lg shadow-xl bg-white border-gray-50'>
                    <li className='m-0'>
                      <Link
                        className='text-gray-400 italic px-2 py-1 block text-sm hover:bg-slate-200 truncate'
                        href={`/search?q=${getValue()}`}
                      >
                        Ver {results.length} resultados
                      </Link>
                    </li>
                    {results.map(({ id, title }) => (
                      <li className='m-0' key={id}>
                        <Link className='px-2 py-1 block text-sm hover:bg-slate-200 truncate' href={`/comic/${id}`}>
                          {title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </Navbar.Item>
      </Navbar.Content>
      {Boolean(collapseItems.length) && (
        <Navbar.Content activeColor='primary' hideIn='xs' gap={16} variant='highlight'>
          {collapseItems.map(({ title, href }) => (
            <Navbar.Item
              key={`navbar-collapse-${title.toLowerCase()}`}
              id={`navbar-collapse-${title.toLowerCase()}`}
              as={Link}
              href={href}
            >
              {title}
            </Navbar.Item>
          ))}
        </Navbar.Content>
      )}
      {Boolean(collapseItems.length) && <Navbar.Toggle aria-label='toggle navigation' showIn='xs' />}
      {Boolean(collapseItems.length) && (
        <Navbar.Collapse showIn='xs'>
          {collapseItems.map(({ title, href }) => (
            <Navbar.CollapseItem
              key={`navbar-collapse-${title.toLowerCase()}`}
              id={`navbar-collapse-${title.toLowerCase()}`}
              as={Link}
              href={href}
            >
              {title}
            </Navbar.CollapseItem>
          ))}
        </Navbar.Collapse>
      )}
    </Navbar>
  )
}
