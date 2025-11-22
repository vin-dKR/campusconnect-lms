import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  if (!user) {
    return redirect('/auth/login')
  }

  if (user.role !== 'teacher') {
    return redirect('/onboarding')
  }

  return (
    <div className='flex min-h-screen'>
      <aside className='w-64 bg-gray-800 text-white p-4'>
        <h1 className='text-2xl font-bold'>Teacher Dashboard</h1>
        <nav className='mt-8'>
          <ul>
            <li>
              <a href='/teacher/attendance' className='block py-2 px-4 rounded hover:bg-gray-700'>
                Attendance
              </a>
            </li>
            {/* Add more links as needed */}
          </ul>
        </nav>
      </aside>
      <main className='flex-1 p-8'>{children}</main>
    </div>
  )
}
