import * as React from 'react';
import { useSignIn } from '@clerk/nextjs';
import SignInFullStack from '../SignInFullStack';
import { GoogleIcon } from '../../sign-in/components/CustomIcons';

/**
 * Example usage with Clerk
 * @see https://clerk.com/docs
 */
export default function ClerkExample() {
  const { signIn, setActive } = useSignIn();

  const handleSubmit = async (email: string, password: string) => {
    if (!signIn) {
      throw new Error('Sign in not available');
    }

    const result = await signIn.create({
      identifier: email,
      password,
    });

    if (result.status === 'complete') {
      if (setActive) {
        await setActive({ session: result.createdSessionId });
      }
    } else {
      // Handle additional verification steps if needed
      console.log('Additional verification required:', result.status);
    }
  };

  const oauthProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: <GoogleIcon />,
      onClick: () => {
        if (signIn) {
          signIn.authenticateWithRedirect({
            strategy: 'oauth_google',
            redirectUrl: '/',
            redirectUrlComplete: '/',
          });
        }
      },
    },
    {
      id: 'github',
      name: 'GitHub',
      onClick: () => {
        if (signIn) {
          signIn.authenticateWithRedirect({
            strategy: 'oauth_github',
            redirectUrl: '/',
            redirectUrlComplete: '/',
          });
        }
      },
    },
  ];

  return (
    <SignInFullStack
      onSubmit={handleSubmit}
      oauthProviders={oauthProviders}
      authProvider="clerk"
      onSignUpClick={() => {
        // Navigate to sign up page
        window.location.href = '/sign-up';
      }}
    />
  );
}
