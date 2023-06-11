export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <div className='main-wrapper'></div>
      {children}
    </main>
  )
}
