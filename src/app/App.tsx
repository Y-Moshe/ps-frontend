import { Suspense, useEffect } from 'react';
import { Box, SxProps, Theme } from '@mui/material';

import { ErrorBoundary, Footer, Header, SuspenseFallBack } from './Components';
import { AppRouting } from './App-Routing';

import { version } from '../../package.json';

const appStyle: SxProps<Theme> = {
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column'
};

export default function App() {
  useEffect(() => {
    console.log(`Running: v${ version }`);
  }, []);

  return (
    <Box sx = { appStyle }>
      <Header />

      <ErrorBoundary>
        <Suspense fallback = { <SuspenseFallBack /> }>
          <AppRouting />
        </Suspense>
      </ErrorBoundary>

      <Footer />
    </Box>
  );
}
