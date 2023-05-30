import { useHeader } from '@/hooks/useHeader'
import { Dropdown } from '@nextui-org/react'

export function DropdownLocales() {
  const { handleSelectionLanguage, locale, restOfLocales } = useHeader()

  return (
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
  )
}
