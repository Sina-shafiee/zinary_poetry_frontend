import { AppRouter } from './router';
import { AppProvider } from './provider';
import { env } from '@/config/env';

const App = () => {
  console.log({ env: env });
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
};

export default App;
