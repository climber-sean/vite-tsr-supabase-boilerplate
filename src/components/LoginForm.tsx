import { useEffect, useState } from 'react';
import {
  Flex,
  Card,
  Button,
  TextField,
  IconButton,
  Heading,
  Box,
} from '@radix-ui/themes';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const loginFormSchema = z.object({
  username: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;

type LoginFormProps = {
  handleLogin: (data: LoginFormSchema) => void;
};

export const LoginForm = ({ handleLogin }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    setFocus,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  });

  useEffect(() => {
    setFocus('password');
  }, [showPassword]);

  const onSubmit: SubmitHandler<LoginFormSchema> = async (data) => {
    handleLogin(data);
  };

  return (
    <Flex align="center" justify="center" height="100vh">
      <Card className="w-80">
        <Box className="mb-8">
          <Heading align="center">Sign In</Heading>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className="mb-5">
            <TextField.Root
              placeholder="email"
              {...register('username')}
              aria-label="email"
            />
            {errors.username && (
              <p className="text-xs mt-2 ml-1 text-red-500">
                {errors.username.message}
              </p>
            )}
          </Box>

          <Box className="mb-3">
            <TextField.Root
              placeholder="password"
              type={showPassword ? 'text' : 'password'}
              aria-label="password"
              {...register('password')}>
              <TextField.Slot side="right">
                <IconButton
                  size="1"
                  variant="outline"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword && <EyeOpenIcon />}
                  {!showPassword && <EyeClosedIcon />}
                </IconButton>
              </TextField.Slot>
            </TextField.Root>
            {errors.password && (
              <p className="text-xs mt-2 ml-1 text-red-500">
                {errors.password.message}
              </p>
            )}
          </Box>

          <Button className="mx-auto" type="submit">
            Login
          </Button>
        </form>
      </Card>
    </Flex>
  );
};
