import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/about')({
  component: About,
  loader: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
      });
    }
  },
});

function About() {
  return (
    <>
      <div>
        <h1>About</h1>
      </div>
    </>
  );
}
