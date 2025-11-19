import * as React from 'react';
import { signIn } from 'better-auth/react';
import SignInFullStack from '../SignInFullStack';
import { GoogleIcon } from '../../sign-in/components/CustomIcons';

/**
 * Example usage with Better Auth
 * @see https://www.better-auth.com/docs
 */
export default function BetterAuthExample() {
  const handleSubmit = async (email: string, password: string) => {
    await signIn.email({
      email,
      password,
    });
  };

  const oauthProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: <GoogleIcon />,
      onClick: () => signIn.social({ provider: 'google' }),
    },
    {
      id: 'github',
      name: 'GitHub',
      onClick: () => signIn.social({ provider: 'github' }),
    },
  ];

  return (
    <SignInFullStack
      onSubmit={handleSubmit}
      oauthProviders={oauthProviders}
      authProvider="better-auth"
      onSignUpClick={() => {
        // Navigate to sign up page
        window.location.href = '/sign-up';
      }}
    />
  );
}
