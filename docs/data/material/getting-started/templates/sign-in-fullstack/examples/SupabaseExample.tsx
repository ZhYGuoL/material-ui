import * as React from 'react';
import { createClient } from '@supabase/supabase-js';
import SignInFullStack from '../SignInFullStack';
import { GoogleIcon } from '../../sign-in/components/CustomIcons';

// Initialize Supabase client
// Replace with your Supabase URL and anon key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
);

/**
 * Example usage with Supabase
 * @see https://supabase.com/docs/guides/auth
 */
export default function SupabaseExample() {
  const handleSubmit = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw error;
    }
    return data;
  };

  const oauthProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: <GoogleIcon />,
      onClick: async () => {
        await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: `${window.location.origin}/auth/callback`,
          },
        });
      },
    },
    {
      id: 'github',
      name: 'GitHub',
      onClick: async () => {
        await supabase.auth.signInWithOAuth({
          provider: 'github',
          options: {
            redirectTo: `${window.location.origin}/auth/callback`,
          },
        });
      },
    },
  ];

  return (
    <SignInFullStack
      onSubmit={handleSubmit}
      oauthProviders={oauthProviders}
      authProvider="supabase"
      onSignUpClick={() => {
        // Navigate to sign up page
        window.location.href = '/sign-up';
      }}
    />
  );
}
