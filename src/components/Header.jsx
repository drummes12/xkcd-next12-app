import { Dropdown, Input, Navbar, Text } from '@nextui-org/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'

import { useI18N } from '@/context/i18n'

export function Header() {
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState([])
  const searchRef = useRef()
  const router = useRouter()

  const { t } = useI18N()

  const getValue = () => searchRef.current?.value

  const handleChange = () => {
    const query = getValue()
    if (!query) return
    fetch(`/api/search?q=${query}`)
      .then((res) => res.json())
      .then(({ results: searchResults }) => {
        setResults(searchResults)
      })
  }

  const handleSearchEnter = () => setShowResults(true)

  const handleSearchLeave = () => setShowResults(false)

  const { pathname, query, asPath } = router
  const handleSelectionLanguage = (selected) =>
    router.push(
      {
        pathname,
        query
      },
      asPath,
      { locale: selected.currentKey }
    )

  const { locale, locales } = router
  const restOfLocales = locales.filter((l) => l !== locale)

  return (
    <Navbar className='flex' isBordered variant='floating'>
      <Navbar.Brand className='flex flex-grow basis-0'>
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
          <Dropdown>
            <Dropdown.Button color='default' light>
              {locale}
            </Dropdown.Button>
            <Dropdown.Menu
              css={{ $$dropdownMenuMinWidth: '60px', $$dropdownMenuWidth: '60px' }}
              aria-label='Language'
              selectionMode='single'
              onSelectionChange={handleSelectionLanguage}
            >
              {restOfLocales.map((locale) => (
                <Dropdown.Item key={locale}>{locale}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Item>
      </Navbar.Content>
      <Navbar.Content className='flex flex-grow basis-0 justify-end'>
        <Navbar.Item>
          <div onMouseLeave={handleSearchLeave}>
            <Input
              className='[&_button]:right-2 focus:bg-black'
              clearable
              bordered
              ref={searchRef}
              onChange={handleChange}
              aria-label={t('SEARCH')}
              placeholder={t('SEARCH')}
              aria-labelledby={t('SEARCH')}
              onFocus={handleSearchEnter}
            />
            <div className={`${showResults ? '' : 'hidden '}relative`}>
              {Boolean(results.length) && (
                <div className='absolute top-1 left-0 w-full'>
                  <ul className='overflow-hidden border rounded-lg shadow-xl bg-white border-gray-50'>
                    <li className='m-0'>
                      <Link
                        className='text-gray-400 italic px-2 py-1 block text-sm hover:bg-slate-200 truncate'
                        href={`/search?q=${getValue()}`}
                      >
                        {t('SEE_RESULTS', results.length)}
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
    </Navbar>
  )
}
