import { ThemeProvider } from './ThemeProvider';
import AppShellDemo from './Welcome/Welcome';

export default function App() {
  return (
    <ThemeProvider>
      <AppShellDemo />
    </ThemeProvider>
  );
}
