import { HiArrowLeft } from 'react-icons/hi2';

interface HeadingProps {
  close: () => void;
}

export function Heading({ close }: HeadingProps) {
  return (
    <div className="grid grid-cols-[20px_1fr_20px] gap-2 px-3 py-1.5 shadow-b-lg bg-primary">
      <button onClick={close} className="cursor-pointer">
        <HiArrowLeft className="text-xl text-secondary-text" />
      </button>
      <h5 className="font-medium text-secondary-text text-base text-center">
        Create Issue
      </h5>
    </div>
  );
}
