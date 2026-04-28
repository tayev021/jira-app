import { useOutsideClick } from '../../../shared/hooks/useOutsideClick';
import { useCreateWorkspace } from '../hooks/useCreateWorkspace';
import { useForm, type FieldErrors } from 'react-hook-form';
import {
  createWorkspaceSchema,
  type CreateWorkspaceSchema,
} from '../model/createWorkspace.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { ApiError } from '../../../shared/utils/ApiError';
import { InlineInput } from '../../../shared/ui/InlineInput';
import { cn } from '../../../shared/utils/cn';

interface CreateWorkspaceProps {
  close: () => void;
}

export function CreateWorkspace({ close }: CreateWorkspaceProps) {
  const ref = useOutsideClick<HTMLLIElement>(close);
  const mutation = useCreateWorkspace();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CreateWorkspaceSchema>({
    mode: 'all',
    resolver: zodResolver(createWorkspaceSchema),
  });

  function submit(workspaceData: CreateWorkspaceSchema) {
    mutation.mutate(workspaceData, {
      onSuccess: () => close(),
      onError: (error) => {
        if (!(error instanceof ApiError)) {
          toast.error('Something went wrong');
        } else if (
          error.code === 'VALIDATION_ERROR' &&
          Array.isArray(error.details?.fields)
        ) {
          error.details.fields.forEach((err) => {
            setError(err.field as keyof CreateWorkspaceSchema, {
              message: err.message,
            });
            toast.error(err.message);
          });
        } else {
          toast.error(error.message);
        }
      },
    });
  }

  function handleError(errors: FieldErrors<{ name: string }>) {
    if (errors.name?.message) {
      toast.error(errors.name.message);
      return;
    }
  }

  return (
    <li
      ref={ref}
      className="flex items-center gap-3 px-3 py-2 border rounded-xl border-gray-primary-light"
    >
      <InlineInput
        className={cn(
          'px-2 py-0.5 border-b-2 border-gray-primary focus:outline-none focus:border-primary',
          errors.name?.message ? 'border-red-primary' : ''
        )}
        id="workspace-name"
        placeholder="Enter Workspace Name"
        autoFocus={true}
        autoComplete="off"
        {...register('name')}
        onSubmit={handleSubmit(submit, handleError)}
      />
    </li>
  );
}
