import { Navbar } from '@nextui-org/react'

import { Brand } from '@/components/Brand'
import { DropdownLocales } from '@/components/DropdownLocales'
import { Autocomplete } from '@/components/Autocomplete'

export function Header() {

  return (
    <Navbar className='flex' isBordered variant='floating'>
      <Navbar.Brand className='flex flex-grow basis-0'>
        <Brand />
      </Navbar.Brand>
      <Navbar.Content>
        <Navbar.Item>
          <DropdownLocales />
        </Navbar.Item>
      </Navbar.Content>
      <Navbar.Content className='flex flex-grow basis-0 justify-end'>
        <Navbar.Item>
          <Autocomplete />
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  )
}
