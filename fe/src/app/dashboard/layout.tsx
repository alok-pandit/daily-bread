export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <section className="max-h-screen relative w-screen">{children}</section>
  )
}
