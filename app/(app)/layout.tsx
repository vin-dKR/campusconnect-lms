import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()

  if (!user) {
    return redirect('/auth/login')
  }

  // Role-based sidebar can be implemented here
  return <div>{children}</div>
}
