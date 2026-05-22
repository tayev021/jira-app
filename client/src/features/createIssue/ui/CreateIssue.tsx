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
import {
  IssuePriorities,
  type IssuePriority,
} from '../../../shared/types/IssuePriority';
import { IssuePriorityIcon } from '../../../shared/ui/IssuePriorityIcon';

interface CreateIssueProps {
  close?: () => void;
}

export function CreateIssue({ close = () => {} }: CreateIssueProps) {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    setError,
    formState: { errors },
  } = useForm<CreateIssueSchema>({
    mode: 'all',
    resolver: zodResolver(createIssueSchema),
    defaultValues: {
      priority: 'none',
    },
  });
  const mutation = useCreateIssue();

  const submit = (data: CreateIssueSchema) => {
    mutation.mutate(data, {
      onSuccess: () => close(),
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
    <div className="w-150 min-h-90 rounded-lg shadow-[0_4px_8px_0_rgba(0,0,0,0.3)] bg-primary-bg overflow-hidden">
      <Heading close={close} />
      <Form
        className="w-140 py-6 mx-auto border-none"
        onSubmit={handleSubmit(submit)}
      >
        <div className="grid grid-cols-[1fr_max-content] gap-6">
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
          <div className="relative w-34">
            <input type="hidden" {...register('priority')} />
            <Form.Select
              handleChange={(value: IssuePriority) =>
                setValue('priority', value, {
                  shouldValidate: true,
                })
              }
            >
              {IssuePriorities.map((priority) => (
                <Form.Option
                  key={priority}
                  value={priority}
                  selected={priority === getValues('priority')}
                >
                  <IssuePriorityIcon priority={priority} className="text-lg" />
                  <span className="ml-2">{priority}</span>
                </Form.Option>
              ))}
            </Form.Select>
          </div>
        </div>

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
