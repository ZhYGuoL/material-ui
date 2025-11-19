import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import ForgotPassword from '../sign-in/components/ForgotPassword';
import AppTheme from '../shared-theme/AppTheme';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import {
  GoogleIcon,
  FacebookIcon,
  SitemarkIcon,
} from '../sign-in/components/CustomIcons';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export type OAuthProvider = {
  id: string;
  name: string;
  icon?: React.ReactNode;
  onClick: () => void | Promise<void>;
};

export type AuthProviderType =
  | 'better-auth'
  | 'supabase'
  | 'clerk'
  | 'firebase'
  | 'authjs'
  | 'custom';

export interface SignInFullStackProps {
  disableCustomTheme?: boolean;
  /**
   * Type of authentication provider being used
   */
  authProvider?: AuthProviderType;
  /**
   * List of OAuth providers to display
   */
  oauthProviders?: OAuthProvider[];
  /**
   * Callback when email/password form is submitted
   */
  onSubmit?: (email: string, password: string) => void | Promise<void>;
  /**
   * Callback when "Sign up" link is clicked
   */
  onSignUpClick?: () => void;
  /**
   * Whether to show the "Remember me" checkbox
   */
  showRememberMe?: boolean;
  /**
   * Whether to show the "Forgot password" link
   */
  showForgotPassword?: boolean;
}

export default function SignInFullStack(props: SignInFullStackProps) {
  const {
    disableCustomTheme,
    authProvider = 'custom',
    oauthProviders = [],
    onSubmit,
    onSignUpClick,
    showRememberMe = true,
    showForgotPassword = true,
  } = props;

  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (emailError || passwordError) {
      return;
    }

    const data = new FormData(event.currentTarget);
    const email = data.get('email') as string;
    const password = data.get('password') as string;

    if (onSubmit) {
      setIsSubmitting(true);
      try {
        await onSubmit(email, password);
      } catch (error) {
        console.error('Sign in error:', error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      console.log({
        email,
        password,
        authProvider,
      });
    }
  };

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  const getProviderIcon = (providerId: string) => {
    switch (providerId.toLowerCase()) {
      case 'google':
        return <GoogleIcon />;
      case 'facebook':
        return <FacebookIcon />;
      default:
        return null;
    }
  };

  const renderOAuthProvider = (provider: OAuthProvider) => {
    const icon = provider.icon || getProviderIcon(provider.id);
    return (
      <Button
        key={provider.id}
        fullWidth
        variant="outlined"
        onClick={provider.onClick}
        startIcon={icon}
        disabled={isSubmitting}
      >
        Sign in with {provider.name}
      </Button>
    );
  };

  return (
    <AppTheme disableCustomTheme={disableCustomTheme}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
        <Card variant="outlined">
          <SitemarkIcon />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? 'error' : 'primary'}
                disabled={isSubmitting}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                color={passwordError ? 'error' : 'primary'}
                disabled={isSubmitting}
              />
            </FormControl>
            {showRememberMe && (
              <FormControlLabel
                control={
                  <Checkbox
                    value="remember"
                    color="primary"
                    disabled={isSubmitting}
                  />
                }
                label="Remember me"
              />
            )}
            {showForgotPassword && (
              <ForgotPassword open={open} handleClose={handleClose} />
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </Button>
            {showForgotPassword && (
              <Link
                component="button"
                type="button"
                onClick={handleClickOpen}
                variant="body2"
                sx={{ alignSelf: 'center' }}
                disabled={isSubmitting}
              >
                Forgot your password?
              </Link>
            )}
          </Box>
          {oauthProviders.length > 0 && (
            <React.Fragment>
              <Divider>or</Divider>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {oauthProviders.map(renderOAuthProvider)}
              </Box>
            </React.Fragment>
          )}
          <Typography sx={{ textAlign: 'center', mt: 2 }}>
            Don&apos;t have an account?{' '}
            <Link
              component="button"
              type="button"
              onClick={onSignUpClick}
              variant="body2"
              sx={{ alignSelf: 'center' }}
              disabled={isSubmitting}
            >
              Sign up
            </Link>
          </Typography>
        </Card>
      </SignInContainer>
    </AppTheme>
  );
}
