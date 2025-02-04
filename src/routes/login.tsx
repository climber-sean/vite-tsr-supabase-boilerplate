import { createFileRoute, Navigate, useNavigate } from '@tanstack/react-router';
import { LoginForm, LoginFormSchema } from '../components/LoginForm';
import useAuthMethods from '../hooks/useAuthMethods';
import { toast } from 'react-toastify';

export const Route = createFileRoute('/login')({
  component: Login,
  loader: ({ context }) => context.auth,
});

function Login() {
  const auth = Route.useLoaderData();
  const { login } = useAuthMethods();
  const navigate = useNavigate({ from: '/login' });

  async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handleLogin = async (data: LoginFormSchema) => {
    await login(data.username, data.password).then(async (res) => {
      if (res.success) {
        await sleep(1).then(() => {
          navigate({ to: '/' });
        });
      } else {
        toast.error(res.message as string);
      }
    });
  };

  console.log(auth);

  return (
    <>
      {auth.isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <LoginForm handleLogin={handleLogin} />
      )}
    </>
  );
}
