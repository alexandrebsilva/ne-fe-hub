import { Helmet } from 'react-helmet-async';

import { CreateUserView } from 'src/sections/user/view/create-user.view';

export default function CreateUserPage() {
  return (
    <>
      <Helmet>
        <title>Cadastro de usuário</title>
      </Helmet>
      <CreateUserView />
    </>
  );
}
