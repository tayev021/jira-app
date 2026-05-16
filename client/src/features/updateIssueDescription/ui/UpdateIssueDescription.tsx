import type { Issue } from '../../../shared/types/Issue';
import { Form } from '../../../shared/ui/Form';
import { useForm } from 'react-hook-form';
import {
  updateDescriptionSchema,
  type UpdateDescriptionSchema,
} from '../model/updateDescription.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import type { FocusEvent } from 'react';
import { useUpdateIssueDescription } from '../hooks/useUpdateIssueDescription';
import toast from 'react-hot-toast';

interface UpdateIssueDescriptionProps {
  issue: Issue;
}

export function UpdateIssueDescription({ issue }: UpdateIssueDescriptionProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateDescriptionSchema>({
    defaultValues: {
      description: issue.description,
    },
    mode: 'all',
    resolver: zodResolver(updateDescriptionSchema),
  });
  const mutation = useUpdateIssueDescription();
  const { onBlur } = register('description');

  const submit = (data: UpdateDescriptionSchema) => {
    if (data.description !== issue.description) {
      mutation.mutate(
        { issueId: issue.id, description: data.description },
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
      <Form.Field hasError={!!errors.description}>
        <Form.TextArea
          id="update-issue-description"
          className={
            'w-full h-auto field-sizing-content px-2 py-1 border border-gray-primary-light rounded-md'
          }
          autoComplete="off"
          {...register('description')}
          onBlur={handleBlur}
        />
        {errors.description && (
          <Form.InputError className="top-0 right-3 left-3 rounded-md leading-none">
            {errors.description.message}
          </Form.InputError>
        )}
      </Form.Field>
    </Form>
  );
}
