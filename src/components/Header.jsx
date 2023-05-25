import { Navbar, Text } from '@nextui-org/react'
import Link from 'next/link'

export function Header() {
  const collapseItems = [
    { title: 'Home', href: '/' },
    { title: 'Search', href: '/search' }
  ]

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
      <Navbar.Toggle aria-label='toggle navigation' showIn='xs' />
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
    </Navbar>
  )
}
