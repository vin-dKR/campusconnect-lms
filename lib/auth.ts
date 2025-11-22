import { createClient } from '@/lib/supabase/server'

export async function getCurrentUser() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    return null
  }

  return {
    id: data.user.id,
    email: data.user.email,
    role: data.user.user_metadata.role || null, // Default to null if no role is set
  }
}
