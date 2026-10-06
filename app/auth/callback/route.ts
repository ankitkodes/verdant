import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Sync the user to our Prisma database
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const res = await fetch(`${origin}/api/auth/sync`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // Pass the cookie so the sync endpoint is authenticated if needed
              'Cookie': request.headers.get('cookie') || '',
            },
            body: JSON.stringify({ 
              email: user.email,
              name: user.user_metadata?.full_name || user.user_metadata?.name,
              provider: user.app_metadata?.provider || 'email'
            }),
          });
          if (!res.ok) {
             console.error("Failed to sync user on callback", await res.text());
          }
        }
      } catch (err) {
        console.error("Error syncing user to prisma on callback:", err);
      }

      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/?error=auth-callback`)
}
