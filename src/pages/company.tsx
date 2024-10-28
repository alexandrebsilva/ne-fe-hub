import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { ProductsView } from 'src/sections/product/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Empresa - ${CONFIG.appName}`}</title>
      </Helmet>

      <h1>Empresa</h1>
      <ProductsView />
    </>
  );
}
