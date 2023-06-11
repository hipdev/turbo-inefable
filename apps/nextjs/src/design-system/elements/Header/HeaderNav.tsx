import Link from 'next/link'

const links = [
  { name: 'Home', path: '/' },
  { name: 'Providers', path: '/providers' },
  { name: 'Contact us', path: '/contact-us' },
  { name: 'Contracts', path: '/contracts' },
  { name: 'Blog', path: '/blog' },
]

const HeaderNav = () => {
  return (
    <nav className='hidden gap-4 font-medium text-black/70 lg:flex xl:gap-8'>
      {links.map((link) => (
        <Link key={link.path} href={link.path} className='hover:text-black/90'>
          {link.name}
        </Link>
      ))}
    </nav>
  )
}

export default HeaderNav
