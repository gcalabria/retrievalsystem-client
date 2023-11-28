import {
  Box,
  Checkbox,
  FormControlLabel,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSignInMutation } from '../../redux/api/authApi';
import usePersist from '../../hooks/usePersist';

const LoginFormSchema = z.object({
  email: z.string().email('Wrong email format'),
  password: z.string().min(6, 'Password mustt have at least 6 characters'),
});

type LoginFormData = z.infer<typeof LoginFormSchema>;

function LoginPage() {
  const navigate = useNavigate();
  // const toast = useToast();
  const [persist, setPersist] = usePersist();
  const [signIn, { isLoading }] = useSignInMutation();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormSchema),
  });

  const onSubmit = async ({ email, password }: LoginFormData) => {
    try {
      await signIn({ email, password });
      reset();
      navigate('/home');
    } catch (err) {
      console.error('TODO: handle error');
      console.error(err);
    }
  };

  const handleToggle = () => {
    setPersist((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
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
            loading={isLoading}
          >
            Login
          </LoadingButton>

          <FormControlLabel
            control={<Checkbox checked={persist} onChange={handleToggle} />}
            label="Remember me?"
          />
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
