import NextAuth from "next-auth"
import { SupabaseAdapter } from "@auth/supabase-adapter"
import jwt from "jsonwebtoken"
import Google from "next-auth/providers/google"
import { supabase } from "@/lib/supabase"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  })
  ],
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  events: {
    signIn: async ({ user, account, profile }) => {
      if (user.id && user.email) {
        // Create or update user profile in public.users table
        const { error } = await supabase
          .from('users')
          .upsert({
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          }, {
            onConflict: 'id'
          })

        if (error) {
          console.error('Error creating user profile:', error)
        } else {
          console.log('User profile created/updated successfully')
        }
      }
    }
  },
  callbacks: {
    session: async ({ session, user }) => {
      const signingSecret = process.env.SUPABASE_JWT_SECRET
      if (signingSecret) {
        const payload = {
          aud: "authenticated",
          exp: Math.floor(new Date(session.expires).getTime() / 1000),
          sub: user.id,
          email: user.email,
          app_metadata: {
            provider: "email",
            providers: ["email"]
          },
          user_metadata: {
            email: user.email,
            email_verified: true,
            phone_verified: false,
          },
          role: "authenticated",
          session_id: session.sessionToken,
        }
        session.supabaseAccessToken = jwt.sign(payload, signingSecret)
      }
      return session
    }
  }
})

export const { GET, POST } = handlers