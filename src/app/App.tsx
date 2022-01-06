import { useEffect } from 'react';
import { Box, SxProps, Theme } from '@mui/material';

import { Footer, Header } from './components';
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

      <AppRouting />

      <Footer />
    </Box>
  );
}
