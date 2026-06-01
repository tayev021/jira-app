import { useEffect, useState, type ChangeEvent } from 'react';
import { useDebounce } from '../../../shared/hooks/useDebounce';
import { useSearchUsers } from '../hooks/useSearchUsers';
import { UserItem } from './UserItem';
import { Loader } from '../../../shared/ui/Loader';
import toast from 'react-hot-toast';

interface SearchUsersProps {
  handleClickUser: (userId: string) => void;
}

export function SearchUsers({ handleClickUser }: SearchUsersProps) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 400);
  const { users, isLoading, isError, error } = useSearchUsers(debouncedQuery);

  useEffect(() => {
    if (isError) {
      toast.error(error!.message);
    }
  }, [isError, error]);

  function handleClick(userId: string) {
    handleClickUser(userId);
  }

  return (
    <div className="w-100 min-h-120 max-h-screen flex flex-col gap-5 p-5 border border-gray-primary-light rounded-sm bg-primary-bg shadow-md">
      <input
        className="w-full py-2.5 pl-3 pr-2 border-2 rounded-sm border-gray-primary bg-primary-bg focus:border-primary focus:outline-none"
        type="text"
        value={query}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setQuery(event.target.value)
        }
      />
      <>
        {query.length <= 0 && (
          <p className="italic text-gray-primary text-center">Type to search</p>
        )}
        {query.length > 0 && isLoading && <Loader className="my-8" />}
        {query.length > 0 &&
          !isLoading &&
          (!users || users.length <= 0 ? (
            <p className="italic text-center">
              No users were found matching this query
            </p>
          ) : (
            <ul className="">
              {users.map((user) => (
                <UserItem
                  key={user.id}
                  user={user}
                  onClick={() => handleClick(user.id)}
                />
              ))}
            </ul>
          ))}
      </>
    </div>
  );
}
