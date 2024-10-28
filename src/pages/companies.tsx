import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { CompaniesView } from 'src/sections/company/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Empresas - ${CONFIG.appName}`}</title>
      </Helmet>
      <CompaniesView />
    </>
  );
}
