import type { UserProps } from 'src/models/user.model';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm, Controller } from 'react-hook-form';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';

export function CreateUserView() {
  const { control, handleSubmit } = useForm<UserProps>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: UserProps) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // navigate('/users');
        alert('User created successfully');
      } else {
        console.error('Failed to create user');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardContent>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Typography variant="h4" mb={3}>
          Create User
        </Typography>
        <Controller
          name="person.firstName"
          control={control}
          render={({ field }: { field: any }) => (
            <TextField {...field} label="Nome" fullWidth margin="normal" />
          )}
        />
        <Controller
          name="person.lastName"
          control={control}
          render={({ field }: { field: any }) => (
            <TextField {...field} label="Sobrenome" fullWidth margin="normal" />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }: { field: any }) => (
            <TextField {...field} label="Email" fullWidth margin="normal" />
          )}
        />
        <Controller
          name="phone"
          control={control}
          render={({ field }: { field: any }) => (
            <TextField {...field} label="Telefone" fullWidth margin="normal" />
          )}
        />
        <Controller
          name="username"
          control={control}
          render={({ field }: { field: any }) => (
            <TextField {...field} label="Nome de usuário" fullWidth margin="normal" />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }: { field: any }) => (
            <TextField {...field} label="Senha" type="password" fullWidth margin="normal" />
          )}
        />
        {/* Add more fields as necessary */}
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? 'Creating...' : 'Create User'}
        </Button>
      </Box>
    </DashboardContent>
  );
}
