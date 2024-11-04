import type { CompanyProps, RoleProps, UserProps } from 'src/models/user.model';

import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useForm, Controller } from 'react-hook-form';

import Box from '@mui/material/Box';
import { MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';

export function CreateUserView() {
  const { control, handleSubmit } = useForm<UserProps>();
  const [loading, setLoading] = useState(true);

  const [companies, setCompanies] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const axiosInstance = axios.create({
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const response = await axiosInstance.get('http://localhost:3000/company');

        setCompanies(response.data);

        const responseRoles = await axiosInstance.get('http://localhost:3000/role');
        setRoles(responseRoles.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data: UserProps) => {
    console.log(data);

    const payload: any = {
      ...data,
      companyDocument: data.company,
      roleName: data.role,
    };
    delete payload.company;
    delete payload.role;

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/auth/signup', payload);

      alert('User created successfully');
    } catch (error: AxiosError | any) {
      console.log(error);

      alert(error.response?.data.message || 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };
  return (
    <DashboardContent>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Typography variant="h4" mb={3}>
          Criar usuário
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
        <Controller
          name="company"
          control={control}
          render={({ field }: { field: any }) => (
            <TextField
              {...field}
              select
              label={loading ? 'Loading' : 'Empresa'}
              fullWidth
              margin="normal"
              helperText="Selecione a empresa que o usuário pertence"
            >
              {companies.map((company: CompanyProps) => (
                <MenuItem key={company.name} value={company.document}>
                  {company.name}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        <br />
        <Controller
          name="role"
          control={control}
          render={({ field }: { field: any }) => (
            <TextField
              {...field}
              select
              label="Perfil"
              fullWidth
              margin="normal"
              helperText="Selecione o perfil do usuário"
            >
              {roles.map((role: RoleProps) => (
                <MenuItem key={role.name} value={role.name}>
                  {role.description}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <br />
        {/* Add more fields as necessary */}
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? 'Creating...' : 'Criar usuário'}
        </Button>
      </Box>
    </DashboardContent>
  );
}
