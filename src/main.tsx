import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ThemeProvider, useTheme } from './components/providers';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/query/queryClient';
import { applyChartJSTheme } from './lib/charting/chartjs-theme';

export function ChartThemeSync() {
  const { theme } = useTheme();

  useEffect(() => {
    applyChartJSTheme(theme);
  }, [theme]);

  return null;
}

export function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <ChartThemeSync />
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

async function enableMocking(): Promise<void> {
  if (import.meta.env.PROD || import.meta.env.VITE_ENABLE_MOCKS !== 'true') {
    return;
  }

  const { worker } = await import('./mocks/browser');

  await worker.start({
    onUnhandledRequest: 'bypass',
  });
}

void enableMocking().then(() => {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('Root element not found');
  }
  createRoot(rootElement).render(
    <StrictMode>
      <Root />
    </StrictMode>
  );
});
