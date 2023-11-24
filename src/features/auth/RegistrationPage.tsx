import { Box, Link, Paper, TextField, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegisterUserMutation } from '../../redux/api/userApi';
import { LoadingButton } from '@mui/lab';

const RegisterFormSchema = z
  .object({
    email: z.string().email('Wrong email format'),
    password: z.string().min(6, 'Password mustt have at least 6 characters'),
    password2: z.string().min(6, 'Password mustt have at least 6 characters'),
  })
  .refine((data) => data.password === data.password2, {
    path: ['password2'],
    message: "Password don't match",
  });

type RegistrationFormData = z.infer<typeof RegisterFormSchema>;

export default function RegistrationPage() {
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(RegisterFormSchema),
  });

  const submitRegister = async (data: RegistrationFormData) => {
    try {
      await registerUser({
        email: data.email,
        password: data.password,
      }).unwrap();
      navigate('/login');
    } catch (err) {
      console.error(err);
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
        <Typography sx={{ pb: 4 }} variant="h4" component="h4">
          Register
        </Typography>
        <Box
          onSubmit={handleSubmit(submitRegister)}
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
          <TextField
            {...register('password2')}
            label="Confirm password"
            variant="filled"
            type="password"
            error={!!errors.password2}
            helperText={errors.password2 ? errors.password2.message : ' '}
            sx={{ pb: 4, width: '100%' }}
          />
          <LoadingButton
            sx={{ width: '100%', mt: 2, height: 42 }}
            variant="contained"
            type="submit"
            loading={isLoading}
          >
            Register
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
            Are you already an user? Click{' '}
            <Link component={RouterLink} to="/login">
              here to log in.
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
