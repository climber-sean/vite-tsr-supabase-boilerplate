import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen.ts';
import { Theme } from '@radix-ui/themes';
import { AuthProvider, useAuth } from './AuthProvider.tsx';
import { ToastContainer } from 'react-toastify';
import './index.css';

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
  context: {
    auth: undefined!,
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
}

function App() {
  return (
    <StrictMode>
      <Theme
        accentColor="purple"
        grayColor="sand"
        radius="large"
        scaling="100%"
        appearance="dark">
        <AuthProvider>
          <InnerApp />
          <ToastContainer theme="dark" position="top-center" />
        </AuthProvider>
      </Theme>
    </StrictMode>
  );
}

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
