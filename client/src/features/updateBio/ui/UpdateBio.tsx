import { useForm } from 'react-hook-form';
import type { User } from '../../../shared/types/User';
import {
  updateBioSchema,
  type UpdateBioSchema,
} from '../model/updateBio.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateBio } from '../hooks/useUpdateBio';
import toast from 'react-hot-toast';
import type { FocusEvent } from 'react';
import { Form } from '../../../shared/ui/Form';

interface UpdateBioProps {
  user: User;
}

export function UpdateBio({ user }: UpdateBioProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateBioSchema>({
    defaultValues: { bio: user.bio },
    mode: 'all',
    resolver: zodResolver(updateBioSchema),
  });
  const mutation = useUpdateBio();
  const { onBlur } = register('bio');

  const submit = (data: UpdateBioSchema) => {
    if (data.bio !== user.bio) {
      mutation.mutate(
        { bio: data.bio },
        { onError: (error) => toast.error(error.message) }
      );
    }
  };

  function handleBlur(event: FocusEvent<HTMLTextAreaElement>) {
    onBlur(event);
    handleSubmit(submit)();
  }

  return (
    <Form
      onSubmit={handleSubmit(submit)}
      className="w-full h-max p-0 block border-none rounded-none leading-normal"
    >
      <Form.Field hasError={!!errors.bio}>
        <Form.TextArea
          id="update-user-bio"
          className={
            'w-full h-auto field-sizing-content px-2 py-1 border border-gray-primary-light rounded-md'
          }
          placeholder={
            user.bio
              ? ''
              : `${user.name} ${user.surname} doesn't have a bio yet. Click here to type`
          }
          autoComplete="off"
          {...register('bio')}
          onBlur={handleBlur}
        />
        {errors.bio && (
          <Form.InputError className="top-0 right-3 left-3 rounded-md leading-none">
            {errors.bio.message}
          </Form.InputError>
        )}
      </Form.Field>
    </Form>
  );
}
