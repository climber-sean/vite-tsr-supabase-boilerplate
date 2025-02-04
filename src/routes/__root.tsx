import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import '@radix-ui/themes/styles.css';
import { AuthContext } from '../AuthProvider';
import { Box } from '@radix-ui/themes';

interface RouterContext {
  auth: AuthContext;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Box maxWidth="800px" minHeight="100vh" className="mx-auto">
        <Outlet />
      </Box>
    </>
  ),
});
