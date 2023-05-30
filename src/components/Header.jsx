import { Dropdown, Input, Navbar, Text } from '@nextui-org/react'
import Link from 'next/link'

import { useI18N } from '@/context/i18n'
import { useHeader } from '@/hooks/useHeader'

export function Header() {
  const {
    results,
    resetResults,
    searchRef,
    getValue,
    handleChange,
    handleSelectionLanguage,
    locale,
    restOfLocales
  } = useHeader()
  const { t } = useI18N()

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
          <div>
            <Input
              className='[&_button]:right-2 focus:bg-black'
              clearable
              onClearClick={() => resetResults()}
              bordered
              ref={searchRef}
              onChange={handleChange}
              aria-label={t('SEARCH')}
              placeholder={t('SEARCH')}
              aria-labelledby={t('SEARCH')}
            />
            <div className='relative'>
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
