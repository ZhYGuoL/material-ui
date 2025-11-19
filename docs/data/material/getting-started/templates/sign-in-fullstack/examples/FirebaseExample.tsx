import * as React from 'react';
// Uncomment and configure these imports for your Firebase setup:
// import {
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   GoogleAuthProvider,
//   GithubAuthProvider,
// } from 'firebase/auth';
// import { auth } from './firebase-config.ts';
import SignInFullStack from '../SignInFullStack';
import { GoogleIcon } from '../../sign-in/components/CustomIcons';

/**
 * Example usage with Firebase
 * @see https://firebase.google.com/docs/auth
 */
export default function FirebaseExample() {
  // Initialize auth from your Firebase config
  // const auth = getAuth(); // or import from your firebase-config

  const handleSubmit = async (email: string, password: string) => {
    // Replace with your auth instance
    // const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // return userCredential.user;
    console.log('Firebase sign in:', email, password);
  };

  const oauthProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: <GoogleIcon />,
      onClick: async () => {
        // Replace with your auth instance
        // const provider = new GoogleAuthProvider();
        // await signInWithPopup(auth, provider);
        console.log('Sign in with Google');
      },
    },
    {
      id: 'github',
      name: 'GitHub',
      onClick: async () => {
        // Replace with your auth instance
        // const provider = new GithubAuthProvider();
        // await signInWithPopup(auth, provider);
        console.log('Sign in with GitHub');
      },
    },
  ];

  return (
    <SignInFullStack
      onSubmit={handleSubmit}
      oauthProviders={oauthProviders}
      authProvider="firebase"
      onSignUpClick={() => {
        // Navigate to sign up page
        window.location.href = '/sign-up';
      }}
    />
  );
}
