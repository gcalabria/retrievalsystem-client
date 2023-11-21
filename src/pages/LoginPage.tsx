import { Box, Link, Paper, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFetchTokensMutation, useFetchUserMutation } from '../api/authApi';
import { setTokens, setUser } from '../store/slices/authSlice';

const LoginFormSchema = z.object({
  email: z.string().email('Wrong email format'),
  password: z.string().min(6, 'Password mustt have at least 6 characters'),
});

type LoginFormData = z.infer<typeof LoginFormSchema>;

function LoginPage() {
  const navigate = useNavigate();
  // const toast = useToast();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormSchema),
  });

  const [fetchTokens, { isLoading: loadingTokens }] = useFetchTokensMutation();
  const [fetchUser, { isLoading: loadingUser }] = useFetchUserMutation();

  const onSubmit = async ({ email, password }: LoginFormData) => {
    try {
      const tokens = await fetchTokens({ email, password }).unwrap();
      dispatch(setTokens(tokens));

      const user = await fetchUser().unwrap();
      dispatch(setUser(user));

      localStorage.setItem('accessToken', tokens.access_token);
      navigate('/');
    } catch (err) {
      console.error('TODO: implement error handler');
      console.error(err);
      // toast({
      //   status: 'error',
      //   title: 'Error',
      //   description: 'Oh no, there was an error!',
      //   isClosable: true,
      // });
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        bgcolor: 'background.default',
      }}
    >
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          p: 4,
          textAlign: 'center',
          width: 400, // TODO: check if there a better way of defining the width
        }}
        elevation={3}
      >
        <Typography variant="h4" component="h4">
          Login
        </Typography>
        <Box
          onSubmit={handleSubmit(onSubmit)}
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          <TextField
            {...register('email')}
            label="Email"
            variant="filled"
            type="text"
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ' '}
            sx={{ width: '100%' }}
          />
          <TextField
            {...register('password')}
            label="Password"
            variant="filled"
            type="password"
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ' '}
            sx={{ width: '100%' }}
          />
          <LoadingButton
            sx={{ width: '100%', mt: 2, height: 42 }}
            variant="contained"
            type="submit"
            loading={loadingTokens || loadingUser}
          >
            Login
          </LoadingButton>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            textAlign: 'center',
          }}
        >
          <Typography>
            You do not have an account? Click{' '}
            <Link component={RouterLink} to="/register">
              here to register.
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}

export default LoginPage;
