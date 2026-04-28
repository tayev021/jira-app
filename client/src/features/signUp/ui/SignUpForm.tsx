import { signUpSchema, type SignUpSchema } from '../model/signUp.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignUp } from '../hooks/useSignUp';
import { useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router';
import { ApiError } from '../../../shared/utils/ApiError';
import toast from 'react-hot-toast';
import { Form } from '../../../shared/ui/Form';

interface SignUpFormProps {
  className?: string;
}

export function SignUpForm({ className = '' }: SignUpFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpSchema>({
    mode: 'all',
    resolver: zodResolver(signUpSchema),
  });
  const mutation = useSignUp();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const submit = (data: SignUpSchema) => {
    const { ...signUpData } = data;

    mutation.mutate(signUpData, {
      onSuccess: (user) => {
        queryClient.setQueryData(['me'], user);
        navigate('/');
      },
      onError: (error) => {
        if (!(error instanceof ApiError)) {
          toast.error('Something went wrong');
        } else if (
          error.code === 'VALIDATION_ERROR' &&
          Array.isArray(error.details?.fields)
        ) {
          error.details.fields.forEach((err) =>
            setError(err.field as keyof SignUpSchema, {
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
    <Form className={className} onSubmit={handleSubmit(submit)}>
      <Form.Heading>Sign Up</Form.Heading>
      <Form.Field hasError={!!errors.name}>
        <Form.Label htmlFor="signup-name">Name</Form.Label>
        <Form.Input id="signup-name" type="text" {...register('name')} />
        {errors.name && (
          <Form.InputError>{errors.name.message}</Form.InputError>
        )}
      </Form.Field>
      <Form.Field hasError={!!errors.surname}>
        <Form.Label htmlFor="signup-surname">Surname</Form.Label>
        <Form.Input id="signup-surname" type="text" {...register('surname')} />
        {errors.surname && (
          <Form.InputError>{errors.surname.message}</Form.InputError>
        )}
      </Form.Field>
      <Form.Field hasError={!!errors.email}>
        <Form.Label htmlFor="signup-email">Email</Form.Label>
        <Form.Input id="signup-email" type="text" {...register('email')} />
        {errors.email && (
          <Form.InputError>{errors.email.message}</Form.InputError>
        )}
      </Form.Field>
      <Form.Field hasError={!!errors.password}>
        <Form.Label htmlFor="signup-password">Password</Form.Label>
        <Form.Input
          id="signup-password"
          type="password"
          {...register('password')}
        />
        {errors.password && (
          <Form.InputError>{errors.password.message}</Form.InputError>
        )}
      </Form.Field>
      <Form.Field hasError={!!errors.confirmPassword}>
        <Form.Label htmlFor="signup-confirm-password">
          Confirm Password
        </Form.Label>
        <Form.Input
          id="signup-confirm-password"
          type="password"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <Form.InputError>{errors.confirmPassword.message}</Form.InputError>
        )}
      </Form.Field>
      <Form.Submit disabled={mutation.isPending}>Sign in</Form.Submit>
      <p className="text-center">
        Do you have an account?{' '}
        <Link
          to="/auth/signin"
          className="font-semibold text-primary hover:text-primary-dark"
        >
          Sign in!
        </Link>
      </p>
    </Form>
  );
}
