// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { Alert } from '@mui/material';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';

import { signIn } from './helpers/signin';

// ----------------------------------------------------------------------

export function SignInView() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = useCallback(async () => {
    setLoading(true);

    try {
      await signIn({ identifier, password });
    } catch (errorSignIn) {
      setError(errorSignIn.response.data.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    router.push('/');
  }, [password, identifier, router]);

  const renderForm = (
    <Box display="flex" flexDirection="column" alignItems="flex-end">
      <TextField
        fullWidth
        name="username"
        label="usuário / e-mail / celular"
        onChange={(e) => {
          setIdentifier(e.target.value);
        }}
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 3 }}
      />
      {/* <Link variant="body2" color="inherit" sx={{ mb: 1.5 }}>
        Forgot password?
      </Link> */}
      <TextField
        fullWidth
        name="password"
        label="Senha"
        // defaultValue="@demo1234"
        InputLabelProps={{ shrink: true }}
        type={showPassword ? 'text' : 'password'}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
      />
      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        disabled={!identifier || !password}
        loading={loading}
        onClick={(e) => {
          e.preventDefault();
          handleSignIn();
        }}
      >
        Login
      </LoadingButton>
      {error ?? (
        <Alert severity="error" sx={{ display: 'none', borderRadius: 0 }}>
          {error}
        </Alert>
      )}
    </Box>
  );

  return (
    <>
      {/* <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">Sign in</Typography>
        <Typography variant="body2" color="text.secondary">
          Don’t have an account?
          <Link variant="subtitle2" sx={{ ml: 0.5 }}>
            Get started
          </Link>
        </Typography>
      </Box> */}

      {renderForm}

      {/* <Divider sx={{ my: 3, '&::before, &::after': { borderTopStyle: 'dashed' } }}>
        <Typography
          variant="overline"
          sx={{ color: 'text.secondary', fontWeight: 'fontWeightMedium' }}
        >
          OR
        </Typography>
      </Divider> */}
      {/* 
      <Box gap={1} display="flex" justifyContent="center">
        <IconButton color="inherit">
          <Iconify icon="logos:google-icon" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify icon="eva:github-fill" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify icon="ri:twitter-x-fill" />
        </IconButton>
      </Box> */}
    </>
  );
}
