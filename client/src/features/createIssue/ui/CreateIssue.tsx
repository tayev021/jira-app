import { useForm } from 'react-hook-form';
import { Form } from '../../../shared/ui/Form';
import { Heading } from './Heading';
import {
  createIssueSchema,
  type CreateIssueSchema,
} from '../model/createIssue.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateIssue } from '../hooks/useCreateIssue';
import { ApiError } from '../../../shared/utils/ApiError';
import toast from 'react-hot-toast';

interface CreateIssueProps {
  close?: () => void;
}

export function CreateIssue({ close = () => {} }: CreateIssueProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CreateIssueSchema>({
    mode: 'all',
    resolver: zodResolver(createIssueSchema),
  });
  const mutation = useCreateIssue();

  const submit = (data: CreateIssueSchema) => {
    mutation.mutate(data, {
      onError: (error) => {
        if (!(error instanceof ApiError)) {
          toast.error('Something went wrong');
        } else if (
          error.code === 'VALIDATION_ERROR' &&
          Array.isArray(error.details?.fields)
        ) {
          error.details.fields.forEach((err) =>
            setError(err.field as keyof CreateIssueSchema, {
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
    <div className="w-150 h-90 rounded-lg shadow-[0_4px_8px_0_rgba(0,0,0,0.3)] bg-primary-bg overflow-hidden">
      <Heading close={close} />
      <Form
        className="w-140 py-6 mx-auto border-none"
        onSubmit={handleSubmit(submit)}
      >
        <Form.Field hasError={!!errors.title}>
          <Form.Label htmlFor="create-issue-title">Title</Form.Label>
          <Form.Input
            id="create-issue-title"
            className="rounded-sm"
            type="text"
            autoComplete="off"
            {...register('title')}
          />
          {errors.title && (
            <Form.InputError>{errors.title.message}</Form.InputError>
          )}
        </Form.Field>
        <Form.Field hasError={!!errors.description}>
          <Form.Label htmlFor="create-issue-description">
            Description
          </Form.Label>
          <Form.TextArea
            id="create-issue-description"
            className="rounded-sm"
            autoComplete="off"
            {...register('description')}
          />
          {errors.description && (
            <Form.InputError>{errors.description.message}</Form.InputError>
          )}
        </Form.Field>

        <Form.Submit className="w-50 p-3 mx-auto" disabled={mutation.isPending}>
          Create issue
        </Form.Submit>
      </Form>
    </div>
  );
}
