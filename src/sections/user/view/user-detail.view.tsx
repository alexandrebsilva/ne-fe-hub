import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';
import { UserProps } from 'src/models/user.model';
// ----------------------------------------------------------------------

export function UserDetailView() {
  const router = useRouter();
  const { uuid } = useParams();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({} as UserProps);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/${uuid}`);
        const data: UserProps = await response.json();

        if (data === null) {
          router.push('/404');
        } else {
          setUser(data);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [uuid, router]);

  if (loading) {
    return (
      <DashboardContent>
        <CircularProgress />
      </DashboardContent>
    );
  }
  console.log('user', user);
  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          {user.person.firstName} {user.person.lastName}
        </Typography>
        <Button variant="contained" color="inherit">
          Editar
        </Button>
      </Box>
      <Card>
        <Box p={3}>
          <Typography variant="h6" gutterBottom>
            Detalhes do Usuário
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {user.email}
          </Typography>
          <Typography variant="body1">
            <strong>Telefone:</strong> {user.phone}
          </Typography>
          <Typography variant="body1">
            <strong>Nome de Usuário:</strong> {user.username}
          </Typography>
          <Typography variant="body1">
            <strong>Função:</strong> {user.role.name}
          </Typography>
          <Typography variant="body1">
            <strong>Empresa:</strong> {user.company.name}
          </Typography>
          <Typography variant="body1">
            <strong>Localização da Empresa:</strong> {user.company.locationDetails.shoppingMallName}
            , {user.company.locationDetails.floor}, {user.company.locationDetails.room}
          </Typography>
          <Typography variant="body1">
            <strong>Primeiro Nome:</strong> {user.person.firstName}
          </Typography>
          <Typography variant="body1">
            <strong>Sobrenome:</strong> {user.person.lastName}
          </Typography>
          <Typography variant="body1">
            <strong>Data de Nascimento:</strong> {user.person.dateOfBirth?.toLocaleDateString()}
          </Typography>
          <Typography variant="body1">
            <strong>Gênero:</strong> {user.person.gender}
          </Typography>
          <Typography variant="body1">
            <strong>CPF:</strong> {user.person.cpf}
          </Typography>
          <Typography variant="body1">
            <strong>RG:</strong> {user.person.rg}
          </Typography>
          <Typography variant="body1">
            <strong>Nacionalidade:</strong> {user.person.nationality}
          </Typography>
          <Typography variant="body1">
            <strong>Endereço:</strong> {user.person.address?.streetAddress ?? ''}
            {user.person.address?.city ?? ''}, {user.person.address?.postalCode ?? ''}
            {user.person.address?.city ?? ''}, {user.person.address?.postalCode ?? ''}
          </Typography>
        </Box>
      </Card>
    </DashboardContent>
  );
}

// ----------------------------------------------------------------------
