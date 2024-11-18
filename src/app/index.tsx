import { AppRouter } from './router';
import { AppProvider } from './provider';

import '@/styles/main.css';

const App = () => {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
};

export default App;
