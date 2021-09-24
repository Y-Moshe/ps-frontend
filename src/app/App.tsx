import { useEffect } from 'react';

import { Footer, Header } from './components';
import { AppRouting } from './App-Routing';
import { version } from '../../package.json';

export default function App() {
  useEffect(() => {
    console.log(`v${ version }`);
  }, []);

  return (
    <div>
      <Header />

      <AppRouting />

      <Footer />
    </div>
  );
}
