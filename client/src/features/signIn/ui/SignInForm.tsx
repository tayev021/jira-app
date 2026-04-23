import { useForm } from 'react-hook-form';
import { signInSchema, type SignInSchema } from '../model/signIn.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignIn } from '../hooks/useSignIn';
import toast from 'react-hot-toast';
import { ApiError } from '../../../shared/utils/ApiError';
import { useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router';
import { Form } from '../../../shared/ui/Form';

interface SignInFormProps {
  className?: string;
}

export function SignInForm({ className = '' }: SignInFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInSchema>({
    mode: 'all',
    resolver: zodResolver(signInSchema),
  });
  const mutation = useSignIn();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const onSubmit = (data: SignInSchema) => {
    mutation.mutate(data, {
      onSuccess: (user) => {
        queryClient.setQueryData(['me'], user);
        navigate('/');
      },
      onError: (error) => {
        if (!(error instanceof ApiError)) {
          toast.error('Something went wrong');
        } else if (
          error.code === 'VALIDATION_ERROR' &&
          Array.isArray(error.details)
        ) {
          error.details.forEach((err) =>
            setError(err.field as keyof SignInSchema, {
              message: err.message,
            })
          );
        } else {
          toast.error(error.message);
        }
      },
    });
  };

  return (
    <Form className={className} onSubmit={handleSubmit(onSubmit)}>
      <Form.Heading>Sign In</Form.Heading>
      <Form.Field hasError={!!errors.email}>
        <Form.Label htmlFor="signin-email">Email</Form.Label>
        <Form.Input
          id="signin-email"
          type="text"
          autoComplete="on"
          {...register('email')}
        />
        {errors.email && (
          <Form.InputError>{errors.email.message}</Form.InputError>
        )}
      </Form.Field>
      <Form.Field hasError={!!errors.password}>
        <Form.Label htmlFor="signin-password">Password</Form.Label>
        <Form.Input
          id="signin-password"
          type="password"
          autoComplete="on"
          {...register('password')}
        />
        {errors.password && (
          <Form.InputError>{errors.password.message}</Form.InputError>
        )}
      </Form.Field>
      <Form.Submit disabled={mutation.isPending}>Sign in</Form.Submit>
      <p className="text-center">
        Don't have an account?{' '}
        <Link
          to="/auth/signup"
          className="font-semibold text-primary hover:text-primary-dark"
        >
          Sign up!
        </Link>
      </p>
    </Form>
  );
}
