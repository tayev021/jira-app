import type { ChangeEvent } from 'react';
import { useUpdateAvatar } from '../hooks/useUpdateAvatar';
import toast from 'react-hot-toast';

export function UpdateAvatar() {
  const mutation = useUpdateAvatar();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files?.[0]) return;

    const formData = new FormData();
    formData.append('avatar', event.target.files[0]);

    mutation.mutate(formData, {
      onError: (error) => toast.error(error.message),
    });

    event.target.value = '';
  }

  return (
    <>
      <label
        htmlFor="avatar"
        className="px-3 py-1 rounded-full font-medium text-secondary-text bg-primary leading-none cursor-pointer hover:bg-primary-dark"
      >
        Update Avatar
      </label>
      <input
        className="hidden"
        type="file"
        name="avatar"
        id="avatar"
        accept="image/png, image/jpeg"
        onChange={handleChange}
      />
    </>
  );
}
