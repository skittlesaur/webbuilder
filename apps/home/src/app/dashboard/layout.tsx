import EnsureLoggedIn from '@/components/ensure-logged-in'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <EnsureLoggedIn />
      {children}
    </>
  )
}

export default DashboardLayout
