import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function AppPage() {
  const user = await getCurrentUser()

  if (!user) {
    return redirect('/auth/login')
  }

  if (!user.role) {
    return redirect('/onboarding')
  }

  switch (user.role) {
    case 'admin':
    case 'superadmin':
      return redirect('/admin/dashboard')
    case 'teacher':
      return redirect('/teacher/attendance')
    case 'student':
      return redirect('/student/materials')
    default:
      return redirect('/landing')
  }
}
